const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
email: { type: String, unique: true, required: true },
name: String,
passwordHash: String,
role: { type: String, enum: ['admin','staff','customer'], default: 'admin' }
}, { timestamps: true });


UserSchema.methods.setPassword = async function(password) {
this.passwordHash = await bcrypt.hash(password, 10);
};
UserSchema.methods.validatePassword = function(password) {
return bcrypt.compare(password, this.passwordHash);
};


module.exports = mongoose.model('User', UserSchema);