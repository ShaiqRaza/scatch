const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')

let createUser = async (req, res)=>{
    let {fullname, email, password} = req.body;

    let user = await userModel.findOne({email});
    if(user) 
        return res.status(402).send("You already have an account plaease login.");

    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(password, salt, async (err, hash)=>{
            if(err)
                res.send(err.message);
            let createdUser = await userModel.create({
                fullname,
                email,
                password:hash
            })
            let token = jwt.sign({email: createdUser.email, _id: createdUser._id}, process.env.JWT_KEY);
            res.cookie("token", token);
            res.send("Account created")
        } )
    })
}

module.exports.createUser = createUser;

let loginUser = async (req, res)=>{
    let {email, password} = req.body;
    let user = await userModel.findOne({email});
    if(user){
        bcrypt.compare(password, user.password, (err, result)=>{
            if(err)
                res.send(err.message);
            if(!result)
                return res.status(403).send("password or email is incorrect");
            let token = jwt.sign({email: user.email, _id: user._id}, process.env.JWT_KEY);
            res.cookie("token", token);
            res.send("Account login")
        })
    }
    else
        res.status(402).send("password or email is incorrect");
}

module.exports.loginUser = loginUser;