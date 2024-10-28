const express = require('express');
const router = express.Router();
const {createUser} = require('../controllers/authController');
const isLoggedIn = require('../middlewares/isLoggedIn')
const {addtocart} = require('../controllers/cartController')
const upload = require('../config/multerConfiguration');

router.post('/createAccount', upload.single('image'), createUser)

router.get('/createAccountPage', (req, res)=>{
    res.render('createAccountPage', {error: req.flash("error")})
})

router.post('/addtocart/:id', isLoggedIn, addtocart)

router.get('/profile', (req, res)=>{
    res.send("user profile")
})

router.get('/cart', isLoggedIn, async (req, res)=>{
    let user = await req.user.populate("cart");
    res.render('cartPage', {products: user.cart});
})

router.get('/orders', (req, res)=>{
    res.send("orders")
})

module.exports = router;