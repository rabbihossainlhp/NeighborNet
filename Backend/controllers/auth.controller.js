const User = require('../models/user.model');

const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const signup = async (req,res) =>{
    const {fullname,email,password} = req.body;
    try{
        if(password.length < 6){
            return res.status(400).json({message:"password should at least 6 charecters"});
        };

        const existingUser = await User.findOne({email});
        if(existingUser){
            return  res.status(400).json({message:"User already exists.."});
        };

        //now we should protect the user pass
        let salt = bycrypt.salt(10);
        let hassPass = bycrypt.hash(password,salt);


        const newUser = new User({
            fullname,
            email,
            password:hassPass
        });

        await newUser.save();

        res.status(201).json({
            message:"user created successfully",
            user:newUser
        });


    }catch(error){
        return res.status(500).json({
            message:"Server error",
            error:error
        })
    }
};



const login = async (req,res) =>{


}



const logout = async (req,res) =>{


}



module.exports = {login,signup,logout}