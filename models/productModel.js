const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    image: Buffer,
    quantity: Number,
    discount: {
        type: Number,
        default: 0
    },
    bgColor: String,
    textColor: String,
    panelColor: String,
    addedCount: {
        type: Boolean,
        default: 0
    },
    price: Number,
})

module.exports = mongoose.model("products", productSchema);