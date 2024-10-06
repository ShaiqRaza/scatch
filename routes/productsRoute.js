const express = require('express');

const router = express.Router();

router.get("/", (req,res)=>{
    res.send("Product mai aa gye ho!");
})

router.get("/profile", (req,res)=>{
    res.send("Product ki profile mai aa gye ho!");
})

module.exports = router;