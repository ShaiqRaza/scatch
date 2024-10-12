const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')

let createUser = async (req, res)=>{
    let {fullname, email, password} = req.body;
    
    if( ! (fullname && email && password))
        return res.status(400).send("Body parameters are not Complete")

    let existingUser = await userModel.findOne({email});
    if(existingUser) 
        return res.status(400).send("You already have an account plaease login.");

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
    if( ! (email && password))
        return res.status(400).send("Body parameters are not Complete")

    try {
        let existingUser = await userModel.findOne({email});

        if(existingUser){
            bcrypt.compare(password, user.password, (err, result)=>{
                if(err)
                    return res.status(500).send(err.message);
                else if(!result)
                    return res.status(400).send("password or email is incorrect");
                let token = jwt.sign({email: existingUser.email, _id: existingUser._id}, process.env.JWT_KEY);
                res.cookie("token", token);
                res.send("Account login")
            })
        }
        else
            res.status(400).send("password or email is incorrect");
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports.loginUser = loginUser;