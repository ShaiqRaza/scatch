const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    image: String,
})

module.exports = mongoose.model("owner", ownerSchema);