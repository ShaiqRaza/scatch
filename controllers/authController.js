const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const ownerModel = require('../models/ownerModel');

let createUser = async (req, res)=>{
    let {fullname, email, password} = req.body;
    
    if( ! (fullname && email && password)) {
        req.flash("error", "Fill all the fields");
        return res.redirect("/user/createAccountPage");
    }
       
    let existingUser = await userModel.findOne({email});
    let checkOwnersMail = await ownerModel.findOne({email});
    if(existingUser || checkOwnersMail) {
        req.flash("error", "This account has been created already");
        return res.redirect("/user/createAccountPage");
    }   

    try
    {
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);
        let createdUser = await userModel.create({
            fullname,
            email,
            password:hash
        })
        let token = jwt.sign({email: createdUser.email, _id: createdUser._id}, process.env.JWT_KEY);
        res.cookie("token", token);
        res.redirect("/");
    } 
    catch(err) 
    {
        res.status(500).send(err.message);
    }
}
module.exports.createUser = createUser;

let loginUser = async (req, res)=>{
    let {email, password} = req.body;
    if( ! (email && password)) {
        req.flash("error", "Fill all the fields");
        return res.redirect("/user/loginPage");
    }

    try {
        let existingUser = await userModel.findOne({email});

        if(existingUser){
            bcrypt.compare(password, existingUser.password, (err, result)=>{
                if(err)
                    return res.status(500).send(err.message);
                else if(!result) {
                    req.flash("error", "Password or Email is incorrect");
                    return res.redirect("/user/loginPage");
                }
                let token = jwt.sign({email: existingUser.email, _id: existingUser._id}, process.env.JWT_KEY);
                res.cookie("token", token);
                res.redirect('/')
            })
        }
        else {
            req.flash("error", "Password or Email is incorrect");
            return res.redirect("/user/loginPage");
        }
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}
module.exports.loginUser = loginUser;

let createOwner = async (req, res)=>{

    let alreadyOwner = await ownerModel.find();
    if(alreadyOwner.length > 0)
        return res.status(400).send("There is already an owner");

    let {fullname, email, password} = req.body;
    
    if( ! (fullname && email && password)) 
        return res.status(400).send("Fill all the fields");

    try
    {
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);
        let createdOwner = await userModel.create({
            fullname,
            email,
            password:hash
        })
        res.send("Owner created");
    } 
    catch(err) 
    {
        res.status(500).send(err.message);
    }
}
module.exports.createOwner = createOwner;