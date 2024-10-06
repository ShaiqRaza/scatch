const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    contact: Number,
    image: String,
    cart: [],
    orders: [],
})

module.exports = mongoose.model("users", userSchema);