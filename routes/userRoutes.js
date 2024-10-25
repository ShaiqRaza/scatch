const express = require('express');
const router = express.Router();
const {createUser} = require('../controllers/authController');
const isLoggedIn = require('../middlewares/isLoggedIn')
const {addtocart} = require('../controllers/cartController')

router.post('/createAccount', createUser)

router.get('/createAccountPage', (req, res)=>{
    res.render('createAccountPage', {error: req.flash("error")})
})

router.post('/addtocart/:id', isLoggedIn, addtocart)

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