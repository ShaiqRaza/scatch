const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    contact: Number,
    image: String,
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        }
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        }
    ],
})

module.exports = mongoose.model("users", userSchema);