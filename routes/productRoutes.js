const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfiguration');
const productModel = require('../models/productModel');

router.post('/edit', upload.single('image'), async (req, res)=>{
    let {name, price, bgColor, panelColor, textColor, _id} = req.body;
    if(name)
        await productModel.updateOne({_id}, {name});
    if(price)
        await productModel.updateOne({_id}, {price});
    if(bgColor)
        await productModel.updateOne({_id}, {bgColor});
    if(panelColor)
        await productModel.updateOne({_id}, {panelColor});
    if(textColor)
        await productModel.updateOne({_id}, {textColor});
    if(req.file)
        await productModel.updateOne({_id}, {image: req.file.buffer});
    req.flash("message", "Product is updated");
    res.redirect('/owner/panel');
})

router.post('/create', upload.single('image'), async (req, res)=>{
    let {name, price, bgColor, panelColor, textColor, quantity} = req.body;
    if(! (name && price && req.file)) {
        req.flash("error", "Fill all the fields");
        return res.redirect('/owner/panel')
    }
    await productModel.create({
        name,
        price,
        image: req.file.buffer,
        bgColor,
        textColor,
        quantity,
        panelColor,
    })
    req.flash("message", "Product is created");
    res.redirect('/owner/panel');
})

module.exports = router