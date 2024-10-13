const express = require('express');
const {createOwner} = require('../controllers/authController');
const router = express.Router();

if(process.env.NODE_ENV === "development"){
    router.post('/createAccount', createOwner)
}

router.get('/panel', (req, res)=>{
    res.send("admin panel")
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