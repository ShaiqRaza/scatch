const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    contact: Number,
    image: String,
})

module.exports = mongoose.model("users", userSchema);