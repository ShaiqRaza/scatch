const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const db = require('./config/mongooseConfig')

app.use(express.json());
app.use(express.urlencoded({extende: true}));
app.use(express.static('./public'));
app.use(cookieParser());
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.send("Hello World!");
    console.log("Program is running...");
})

app.listen(3000);