const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Checkout route (process payment)
router.post('/checkout', paymentController.checkout);

// Optional: Webhooks for payment confirmation
router.post('/webhook/flutterwave', paymentController.flutterwaveWebhook);
router.post('/webhook/paypal', paymentController.paypalWebhook);

module.exports = router;
