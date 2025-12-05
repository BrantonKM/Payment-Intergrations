const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create a new order
router.post('/', orderController.createOrder);

// Get a single order by ID
router.get('/:id', orderController.getOrder);

// Get all orders (optional, could be admin-only)
router.get('/', orderController.getAllOrders);

// Update an order status
router.put('/:id', orderController.updateOrder);

module.exports = router;
