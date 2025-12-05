const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth'); // ensure you have an admin auth middleware

// Protect all admin routes
router.use(adminAuth);

/**
 * GET /api/admin/transactions
 * Query params:
 *  - gateway (paypal|flutterwave)
 *  - status (paid|failed|refunded|created)
 *  - q (search by order ref, customer email, gatewayId)
 *  - page, limit
 *  - export=csv  (optional)
 */
router.get('/transactions', adminController.listTransactions);

/**
 * GET /api/admin/orders
 * Basic order list with optional filters and pagination
 */
router.get('/orders', adminController.listOrders);

/**
 * GET /api/admin/orders/:id
 * Return one order (detailed) along with its transactions
 */
router.get('/orders/:id', adminController.getOrder);

/**
 * GET /api/admin/orders/:id/invoice
 * Download PDF invoice for an order
 */
router.get('/orders/:id/invoice', adminController.downloadInvoice);

module.exports = router;
