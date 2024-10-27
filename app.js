const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const db = require('./config/mongooseConfig');
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

const userRoutes = require('./routes/userRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const productRoutes = require('./routes/productRoutes');
const productModel = require('./models/productModel');
const {loginAccount, logoutAccount} = require('./controllers/authController');

app.use('/user', userRoutes);
app.use('/owner', ownerRoutes);
app.use('/product', productRoutes);

app.get('/', async (req, res)=>{
    let products = await productModel.find();
    res.render("homePage", {token: req.cookies.token, products});
})
app.get('/loginPage', (req, res)=>{
    res.render('loginPage', {error: req.flash("error")})
})
app.post('/login', loginAccount);
app.get('/logout', logoutAccount);

app.listen(3000);