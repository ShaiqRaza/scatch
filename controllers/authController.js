const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const ownerModel = require('../models/ownerModel');

//loginuser is same for both owner and user and logout also

let createUser = async (req, res)=>{
    let {fullName, email, password, address, contact} = req.body;
    
    if( ! (fullName && email && password && address && contact)) {
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
        const userData = {
            fullName,
            email,
            address,
            password:hash,
            contact,
        }
        if(req.file)
            userData.image = req.file.buffer;
        let createdUser = await userModel.create(userData);
        let token = jwt.sign({email: createdUser.email, _id: createdUser._id}, process.env.JWT_KEY);
        res.cookie("token", token, {expires: new Date(Date.now() + 7 * 864e5)});
        res.redirect("/");
    } 
    catch(err) 
    {
        res.status(500).send(err.message);
    }
}
module.exports.createUser = createUser;

let loginAccount = async (req, res)=>{
    let {email, password} = req.body;
    if( ! (email && password)) {
        req.flash("error", "Fill all the fields");
        return res.redirect("/loginPage");
    }

    try {
        let existingUser = await userModel.findOne({email});
        if(! existingUser )
            existingUser = await ownerModel.findOne({email});
        
        if(existingUser){
            bcrypt.compare(password, existingUser.password, (err, result)=>{
                if(err)
                    return res.status(500).send(err.message);
                else if(!result) {
                    req.flash("error", "Password or Email is incorrect");
                    return res.redirect("/loginPage");
                }
                let token = jwt.sign({email: existingUser.email, _id: existingUser._id}, process.env.JWT_KEY);
                res.cookie("token", token, {expires: new Date(Date.now() + 7 * 864e5)});
                res.redirect('/')
            })
        }
        else {
            req.flash("error", "Password or Email is incorrect");
            return res.redirect("/loginPage");
        }
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}
module.exports.loginAccount = loginAccount;

let createOwner = async (req, res)=>{

    let alreadyOwner = await ownerModel.find();
    let {fullname, email, password} = req.body;
    
    if( ! (fullname && email && password)) {
        req.flash("error", "Fill all the fields");
        res.redirect('/owner/createAccountPage')
    }

    if(alreadyOwner.length > 0) {
        req.flash("error", "There is already an owner");
        res.redirect('/owner/createAccountPage')
    }

    let alreadyUser = await userModel.findOne({email});
    if(alreadyUser) {
        req.flash("error", "Fields are already taken");
        res.redirect('/owner/createAccountPage')
    }

    try
    {
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password:hash
        })

        let token = jwt.sign({email: createdOwner.email, _id: createdOwner._id}, process.env.JWT_KEY);
        res.cookie("token", token, {expires: new Date(Date.now() + 7 * 864e5)});
        res.redirect("/");
    } 
    catch(err) 
    {
        res.status(500).send(err.message);
    }
}
module.exports.createOwner = createOwner;

let logoutAccount = async (req, res)=>{
    res.cookie('token', '');
    res.redirect('/');
}
module.exports.logoutAccount = logoutAccount;
