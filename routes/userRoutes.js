const express = require('express');

const router = express.Router();

router.get('/createAccount', (req, res)=>{
    res.send("Sign up")
})

router.get('/login', (req, res)=>{
    res.send("login")
})

router.get('/cart', (req, res)=>{
    res.send("cart")
})

router.get('/orders', (req, res)=>{
    res.send("orders")
})

router.get('/account', (req, res)=>{
    res.send("user profile")
})

module.exports = router;