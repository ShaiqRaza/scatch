const express = require('express');
const {createOwner} = require('../controllers/authController');
const isLoggedIn = require('../middlewares/isLoggedIn');
const isLoggedInOwner = require('../middlewares/isLoggedInOwner');
const router = express.Router();

if(process.env.NODE_ENV === "development"){
    router.post('/createAccount', createOwner)
}

if(process.env.NODE_ENV === "development"){
    router.get('/createAccountPage', (req, res)=>{
        res.render('createOwnerPage', {error: req.flash("error")});
    })
}

router.get('/panel', isLoggedInOwner, (req, res)=>{
    res.render("panelPage")
})

router.get('/panel/edit-product', (req, res)=>{
    res.send("edit product")
})

router.get('/panel/create-product', (req, res)=>{
    res.send("create product")
})

router.get('/account', (req, res)=>{
    res.send("owner profile")
})

router.get('/panel/stats', (req, res)=>{
    res.send("shop stats")
})

module.exports = router; 