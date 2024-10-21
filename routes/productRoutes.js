const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfiguration');
const productModel = require('../models/productModel');

router.post('/edit', (req, res)=>{
    res.send('edit product')
})

router.post('/create', upload.single('image'), async (req, res)=>{
    let {name, price} = req.body;
    if(! (name && price && req.file)) {
        req.flash("error", "Fill all the fields");
        return res.redirect('/owner/panel')
    }
    console.log(req.file)
    await productModel.create({
        name,
        price,
        image: req.file.buffer
    })
    req.flash("message", "Product is created");
    res.redirect('/owner/panel');
})

module.exports = router