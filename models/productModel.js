const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    quantity: Number,
    discount: {
        type: Number,
        default: 0
    },
    bgColor: String,
    textColor: String,
    panelColor: String,
})

module.exports = mongoose.model("produts", productSchema);