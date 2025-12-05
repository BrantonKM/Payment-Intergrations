const axios = require('axios');
const qs = require('qs');
const config = require('../config');


const PAYPAL_BASE = config.paypal.mode === 'live'
? 'https://api-m.paypal.com'
: 'https://api-m.sandbox.paypal.com';


async function getAccessToken() {
const token = Buffer.from(`${config.paypal.clientId}:${config.paypal.secret}`).toString('base64');
const res = await axios.post(`${PAYPAL_BASE}/v1/oauth2/token`, qs.stringify({ grant_type: 'client_credentials' }), {
headers: { Authorization: `Basic ${token}`, 'Content-Type': 'application/x-www-form-urlencoded' }
});
return res.data.access_token;
}


async function createOrder(amount, currency='USD') {
const accessToken = await getAccessToken();
const res = await axios.post(`${PAYPAL_BASE}/v2/checkout/orders`, {
intent: 'CAPTURE',
purchase_units:[{ amount: { currency_code: currency, value: Number(amount).toFixed(2) } }]
}, { headers: { Authorization: `Bearer ${accessToken}` } });
return res.data;
}


async function captureOrder(orderID) {
const accessToken = await getAccessToken();
const res = await axios.post(`${PAYPAL_BASE}/v2/checkout/orders/${orderID}/capture`, {}, { headers: { Authorization: `Bearer ${accessToken}` } });
return res.data;
}


module.exports = { createOrder, captureOrder };