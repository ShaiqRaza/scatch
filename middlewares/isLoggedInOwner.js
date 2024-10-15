const jwt = require('jsonwebtoken');
const ownerModel = require('../models/ownerModel');

const isLoggedInOwner = async (req, res, next) => {
    try 
    {
        let decodedData = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        req.owner = await ownerModel.findOne({email: decodedData.email}).select("-password");
        next();
    }
    catch(err)
    {
        req.flash("error", "Something went wrong");
        return res.redirect('/');
    }
}

module.exports = isLoggedInOwner;