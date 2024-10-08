const express = require('express');
const router = express.Router();
const {createUser, loginUser} = require('../controllers/authController')

router.post('/createAccount', createUser)

router.post('/login', loginUser)

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