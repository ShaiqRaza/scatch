const express = require('express');

const router = express.Router();

router.get("/", (req,res)=>{
    res.send("user mai aa gye ho!");
})

router.get("/profile", (req,res)=>{
    res.send("user ki profile mai aa gye ho!");
})

module.exports = router;