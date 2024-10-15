const express = require('express');
const router = express.Router();
const {createUser, loginUser} = require('../controllers/authController');
const isLoggedIn = require('../middlewares/isLoggedIn')

router.post('/createAccount', createUser)

router.post('/login', loginUser)

router.get('/loginPage', (req, res)=>{
    res.render('loginPage', {error: req.flash("error")})
})

router.get('/createAccountPage', (req, res)=>{
    res.render('createAccountPage', {error: req.flash("error")})
})

router.get('/profile', (req, res)=>{
    res.send("user profile")
})

router.get('/cart', (req, res)=>{
    res.send("cart")
})

router.get('/orders', (req, res)=>{
    res.send("orders")
})

module.exports = router;