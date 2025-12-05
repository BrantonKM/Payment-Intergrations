const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  ref: { type: String, required: true, unique: true },
  customer: { name: String, email: String },
  items: [{ name: String, qty: Number, price: Number }],
  amount: Number,
  currency: String,
  status: { type: String, default: 'created' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
