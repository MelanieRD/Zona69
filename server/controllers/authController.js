const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const register= async (req, res)=>{
    try{
        const {username, password, role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({username, password: hashedPassword, role});
        await newUser.save();
        res.status(201).json({message: "user was successfully registered"});
    } catch(err){
        res.status(500).json({message: "Error trying to register"});
    }
};

const login = async (req, res)=>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});

        if(!user){
            return res.status(404).json({message: "Invalid credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.status(200).json({token});

    } catch(err){
        res.status(500).json({message: "Error trying to login"});
    }
};

module.exports = {register, login};