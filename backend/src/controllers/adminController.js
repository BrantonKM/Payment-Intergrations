// adminController.js
const Order = require('../models/Order');
const Transaction = require('../models/Transaction');
const invoiceSvc = require('../services/invoiceService');
const { toCSV } = require('../utils/csv');

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 25;

/**
 * GET /api/admin/transactions
 * Query params:
 *  - gateway (paypal|flutterwave)
 *  - status (paid|failed|refunded|created)
 *  - q (search by order ref, customer email, gatewayId)
 *  - page, limit
 *  - export=csv  (optional)  returns CSV attachment
 */
exports.listTransactions = async (req, res, next) => {
  try {
    const { gateway, status, q } = req.query;
    const page = Math.max(parseInt(req.query.page || DEFAULT_PAGE, 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || DEFAULT_LIMIT, 10), 1), 200);
    const skip = (page - 1) * limit;

    const filter = {};
    if (gateway) filter.gateway = gateway;
    if (status) filter.status = status;
    if (q) {
      const re = new RegExp(q, 'i');
      filter.$or = [
        { gatewayId: re },
        { 'raw.data.customer.email': re },
        { 'raw.data.customer.name': re },
        { 'raw.data.tx_ref': re }
      ];
    }

    const [items, total] = await Promise.all([
      Transaction.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .populate ? Transaction.find(filter).sort({createdAt:-1}).skip(skip).limit(limit) : Transaction.find(filter).sort({createdAt:-1}).skip(skip).limit(limit), // just ensure compatibility
      Transaction.countDocuments(filter)
    ]);

    // if export=csv -> stream csv
    if (req.query.export === 'csv') {
      const rows = items.map(t => ({
        id: t._id,
        order: t.order?.toString?.() || '',
        gateway: t.gateway,
        gatewayId: t.gatewayId,
        status: t.status,
        amount: t.amount,
        currency: t.currency,
        createdAt: t.createdAt,
        raw: JSON.stringify(t.raw)
      }));
      const csv = toCSV(rows, [
        { key: 'id', label: 'TransactionId' },
        { key: 'order', label: 'OrderId' },
        { key: 'gateway', label: 'Gateway' },
        { key: 'gatewayId', label: 'GatewayId' },
        { key: 'status', label: 'Status' },
        { key: 'amount', label: 'Amount' },
        { key: 'currency', label: 'Currency' },
        { key: 'createdAt', label: 'CreatedAt' },
        { key: 'raw', label: 'Raw' }
      ]);
      res.setHeader('Content-Disposition', 'attachment; filename=transactions.csv');
      res.setHeader('Content-Type', 'text/csv');
      return res.send(csv);
    }

    res.json({
      items,
      meta: { total, page, limit, pages: Math.ceil(total / limit) }
    });
  } catch (err) { next(err); }
};

/**
 * GET /api/admin/orders
 * Basic order list with optional filters and pagination
 */
exports.listOrders = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page || DEFAULT_PAGE, 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || DEFAULT_LIMIT, 10), 1), 200);
    const skip = (page - 1) * limit;
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.q) {
      const re = new RegExp(req.query.q, 'i');
      filter.$or = [{ ref: re }, { 'customer.email': re }, { 'customer.name': re }];
    }

    const [items, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Order.countDocuments(filter)
    ]);

    res.json({ items, meta: { total, page, limit, pages: Math.ceil(total / limit) } });
  } catch (err) { next(err); }
};

/**
 * GET /api/admin/orders/:id
 * Return one order (detailed)
 */
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).lean();
    if (!order) return res.status(404).json({ error: 'Order not found' });
    // also fetch transactions
    const txns = await Transaction.find({ order: order._id }).sort({ createdAt: -1 }).lean();
    res.json({ order, transactions: txns });
  } catch (err) { next(err); }
};

/**
 * GET /api/admin/orders/:id/invoice
 * Returns PDF invoice for order as attachment (generated on the fly)
 */
exports.downloadInvoice = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).lean();
    if (!order) return res.status(404).json({ error: 'Order not found' });
    const pdfBuffer = await invoiceSvc.generateInvoicePdf(order);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice_${order.ref}.pdf`);
    res.send(pdfBuffer);
  } catch (err) { next(err); }
};
