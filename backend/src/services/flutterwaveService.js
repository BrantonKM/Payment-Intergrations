const axios = require('axios');
const config = require('../config');


async function verifyTransaction(id) {
const res = await axios.get(`https://api.flutterwave.com/v3/transactions/${id}/verify`, {
headers: { Authorization: `Bearer ${config.flutterwave.secretKey}` }
});
return res.data;
}


module.exports = { verifyTransaction };