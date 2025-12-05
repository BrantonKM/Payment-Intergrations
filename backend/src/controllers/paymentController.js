const Order = require('../models/Order');
const Transaction = require('../models/Transaction');
const { processFlutterwavePayment } = require('../services/flutterwaveService');
const { processPaypalPayment } = require('../services/paypalService');

exports.checkout = async (req, res) => {
  try {
    const { customer, items, gateway } = req.body;
    const amount = items.reduce((sum, i) => sum + i.price * i.qty, 0);

    const order = await Order.create({
      ref: 'ORD-' + Date.now(),
      customer,
      items,
      amount,
      currency: 'KES',
      status: 'created',
    });

    let transaction;
    if (gateway === 'flutterwave') {
      transaction = await processFlutterwavePayment(order);
    } else if (gateway === 'paypal') {
      transaction = await processPaypalPayment(order);
    } else {
      return res.status(400).json({ error: 'Invalid payment gateway' });
    }

    await Transaction.create({ ...transaction, order: order._id });

    res.json({ order, transaction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Payment processing failed' });
  }
};

// Example webhook handlers
exports.flutterwaveWebhook = async (req, res) => {
  console.log('Flutterwave webhook received', req.body);
  res.sendStatus(200);
};

exports.paypalWebhook = async (req, res) => {
  console.log('PayPal webhook received', req.body);
  res.sendStatus(200);
};
