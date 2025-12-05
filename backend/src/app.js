const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');
const paymentRoutes = require('./routes/payments');

const app = express();

// Security & middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ verify: (req, res, buf) => { req.rawBody = buf } }));
app.use(bodyParser.urlencoded({ extended: true }));

// Rate limiter setup
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 120,            // limit each IP to 120 requests per window
  standardHeaders: true, // Return rate limit info in the RateLimit-* headers
  legacyHeaders: false,  // Disable the X-RateLimit-* headers
});
app.use(limiter);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

// Health check
app.get('/', (req, res) => res.send({ ok: true }));

module.exports = app;
