const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const db = require('./config/mongooseConfig');
const dotenv = require('dotenv').config();
const flash = require('connect-flash');
const expressSession = require('express-session');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
app.use(cookieParser());
app.use(expressSession({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_KEY,
}));
app.use(flash());
app.set('view engine', 'ejs');

const isLoggedIn = require('./middlewares/isLoggedIn')
const userRoutes = require('./routes/userRoutes');
const ownerRoutes = require('./routes/ownerRoutes');

app.use('/user', userRoutes);
app.use('/owner', ownerRoutes);

app.get('/', (req, res)=>{
    res.render("homePage", {token: req.cookies.token});
})

app.listen(3000);