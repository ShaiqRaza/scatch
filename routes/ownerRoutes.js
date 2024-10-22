const express = require('express');
const {createOwner} = require('../controllers/authController');
const isLoggedIn = require('../middlewares/isLoggedIn');
const isLoggedInOwner = require('../middlewares/isLoggedInOwner');
const productModel = require('../models/productModel');
const router = express.Router();

if(process.env.NODE_ENV === "development"){
    router.post('/createAccount', createOwner)
}

if(process.env.NODE_ENV === "development"){
    router.get('/createAccountPage', (req, res)=>{
        res.render('createOwnerPage', {error: req.flash("error")});
    })
}

router.get('/panel', isLoggedInOwner, async (req, res)=>{
    let products = await productModel.find();
    res.render("panelPage", {error: req.flash("error"), message: req.flash("message"), products})
})

router.get('/account', (req, res)=>{
    res.send("owner profile")
})

router.get('/panel/stats', (req, res)=>{
    res.send("shop stats")
})

module.exports = router; 