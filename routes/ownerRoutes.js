const express = require('express');
const {createOwner} = require('../controllers/authController');
const router = express.Router();

if(process.env.NODE_ENV === "development"){
    router.post('/createAccount', createOwner)
}

router.get('/admin', (req, res)=>{
    res.send("admin panel")
})

router.get('/admin/edit', (req, res)=>{
    res.send("edit product")
})

router.get('/admin/createProduct', (req, res)=>{
    res.send("create product")
})

router.get('/account', (req, res)=>{
    res.send("owner profile")
})

router.get('/stats', (req, res)=>{
    res.send("shop stats")
})

module.exports = router; 