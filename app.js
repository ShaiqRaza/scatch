const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const db = require('./config/mongooseConfig');
const dotenv = require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
app.use(cookieParser());
app.set('view engine', 'ejs');

const userRoutes = require('./routes/userRoutes');
const ownerRoutes = require('./routes/ownerRoutes');

app.use('/user', userRoutes);
app.use('/owner', ownerRoutes);

console.log(process.env.JWT_KEY);

app.get('/', (req, res)=>{
    res.send("Home");
})

app.listen(3000);