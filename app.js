const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const db = require('./config/mongooseConfig');
const flash = require('connect-flash');
const expressSession = require('express-session');
const userModel = require('./models/userModel');
const MongoStore = require('connect-mongo');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
app.use(cookieParser());

app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI, // MongoDB Atlas connection string
      ttl: 2 * 60 // Optional: session expiration in seconds (14 days here)
    }),
    cookie: { secure: false } // Use true if serving over HTTPS
  })
);
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
    req.user = null;
    if(req.cookies.token){
        let decodedData = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        req.user = await userModel.findOne({email: decodedData.email}).select("-password");
    }
    res.render("homePage", {token: req.cookies.token, user: req.user, products});
})
app.get('/loginPage', (req, res)=>{
    res.render('loginPage', {error: req.flash("error")})
})
app.post('/login', loginAccount);
app.get('/logout', logoutAccount);

app.listen(3000);