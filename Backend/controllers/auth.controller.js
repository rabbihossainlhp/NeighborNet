const User = require('../models/user.model');
const {generateJwtToken} = require('../lib/utils');

const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const signupController = async (req,res) =>{
    const {fullname,email,password} = req.body;
    try{
        
        if(!fullname || !email || !password){
            return res.status(400).json({message:"provide required fields!"});
        }
        if(password.length < 6){
            return res.status(400).json({message:"password should at least 6 charecters"});
        };

        const existingUser = await User.findOne({email});
        if(existingUser){
            return  res.status(400).json({message:"User already exists.."});
        };

        //now we should protect the user pass
        let salt = await bycrypt.genSalt(10);
        let hassPass = await bycrypt.hash(password,salt);


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



const loginController = async (req,res) =>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"user doesn't exists!!",})
        }
        
        const isPassValid = await bycrypt.compare(password,user.password);
        if(!isPassValid){
            return res.status(400).json({message:"password doesn't match with user pass"});
        }

        generateJwtToken(user._id,res);

        res.status(201).json({
            message:"User loged in successfully!!",
            user
        })

    }catch(error){
        return res.status(500).json({
            message:"Internal Error",
            error:error
        })
    }
};



const logoutController = async (req,res) =>{
    try{
        res.cookie('jwttoken', "", {maxAge:0});
        res.status(200).json({message:"Logout  Successfully!"});
    }catch(error){
        console.log("error in logoutController "+ error);
        return res.status(500).json({
            message:"Internal Server Error",
            error:error
        })
    }

}



module.exports = {loginController,signupController,logoutController}