const jwt = require('jwt');
const userModel = require('../models/userModel');

const isLoggedIn = async (req, res, next) => {
    if(!req.cookies.token){
        req.flash("error", "Please login first");
        return res.redirect('/');
    }
    try 
    {
        let decodedData = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        req.user = await userModel.findOne({email: decodedData.email}).select("-password");
        next();
    }
    catch(err)
    {
        req.flash("error", "Something went wrong");
        return res.redirect('/');
    }
}

module.exports.isLoggedIn = isLoggedIn;