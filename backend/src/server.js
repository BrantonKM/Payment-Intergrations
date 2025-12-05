const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');


mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
app.listen(config.port, () => console.log(`Backend listening on ${config.port}`));
})
.catch(err => {
console.error('Mongo connect error', err);
process.exit(1);
});