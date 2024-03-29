const mongoose = require('mongoose');

// Model user 
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    name: { type: String },
    phone: { type: String },
    cardid: { type: String },
    roles: { type: Array, default: [2001] },
    password: { type: String },
    accessToken: { type: String },
})

module.exports = mongoose.model('user', userSchema)