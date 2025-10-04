const User = require('../models/user.model');
const jwt = require('jsonwebtoken');


const authMiddleare = async (req,res, next)=>{
    try{
        const token =  req.cookies.jwttoken;

        if(!token){
            return res.status(401).json({message:"unauthorized user -> no token provided"});
        }

        const decodedUser = jwt.verify(token,process.env.JWT_SECRET); 
        if(!decodedUser){return res.status(401).json({message:"unauthorized user -> invlid token"});}

        const user = await User.findById(decodedUser.userId).select('-password');
        if(!user){return res.status(401).json({message:"user not found"});}

        req.user = user;
        next();

    }catch(error){
        return res.status(500).json({
            message:"Server error",
            error:error
        })
    }
}

module.exports = authMiddleare