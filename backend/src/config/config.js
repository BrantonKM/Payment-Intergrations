module.exports = {
  dbURI: process.env.DB_URI,
  port: process.env.PORT || 5000,
  adminToken: process.env.ADMIN_TOKEN,
  flutterwaveKey: process.env.FLUTTERWAVE_KEY,
  paypalClientId: process.env.PAYPAL_CLIENT_ID,
  paypalSecret: process.env.PAYPAL_SECRET,
};
