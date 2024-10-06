const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const db = require('./config/mongooseConfig');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
app.use(cookieParser());
app.set('view engine', 'ejs');

const usersRoute = require('./routes/usersRoute');
const productsRoute = require('./routes/productsRoute');

app.use('/users', usersRoute);
app.use('/products', productsRoute);

app.get('/', (req, res)=>{
    res.send("Hello World!");
})


app.listen(3000);