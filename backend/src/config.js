require('dotenv').config();


module.exports = {
port: process.env.PORT || 5000,
mongoUri: process.env.MONGO_URI,
jwtSecret: process.env.JWT_SECRET,
paypal: {
clientId: process.env.PAYPAL_CLIENT_ID,
secret: process.env.PAYPAL_SECRET,
mode: process.env.PAYPAL_MODE || 'sandbox'
},
flutterwave: {
secretKey: process.env.FLW_SECRET_KEY,
publicKey: process.env.FLW_PUBLIC_KEY,
hashSecret: process.env.FLW_HASH_SECRET
},
email: {
host: process.env.SMTP_HOST,
port: process.env.SMTP_PORT,
user: process.env.SMTP_USER,
pass: process.env.SMTP_PASS,
from: process.env.FROM_EMAIL
}
};