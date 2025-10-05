const cloudinary = require('../lib/cloudinary');
const User = require('../models/user.model');

const updateProfileController = async (req,res) =>{
    try{
        const {profilePic} = req.body;
        if(!profilePic){
            return res.status(400).json({message:"profile image not provided"});
        };
        
        const uploadResponse = await cloudinary.uploader(profilePic);

        const user = await User.findByIdAndUpdate(req.user._id, {profilePicture:uploadResponse.secure_url}, {new:true});
        
        res.status(200).json({message:"Successfully updated user", user});

    }catch(error){
        console.log("profile controller error "+error);
        res.status(500).json({message:"Internal Server Error"});
    }
}



const checkProfileController = async (req,res)=>{
    try{
        res.status(200).json(req.user);
    }catch(error){
        console.log("Error on checkProfileController"+error);
        res.status(500).json({message:"Internal Error",error})
    }
}




module.exports = {checkProfileController, updateProfileController};