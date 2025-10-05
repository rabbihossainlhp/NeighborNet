const cloudinary = require('../lib/cloudinary.js');
const User = require('../models/user.model.js');
const Message = require('../models/message.model.js');




const getUsersController = async (req,res)=>{
    try{
        const fillterdUser = await User.find({_id: {$ne:req.user._id}}).select('-password');
        res.status(200).json(fillterdUser);
    }catch(error){
        console.log('error into getUserController '+error);
        res.status(500).json({message:"internal server error", error})
    }
}



const getMessagesController = async (req,res)=>{
    try{
        const userToChatId= req.params.id;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {receiverId:myId, senderId:userToChatId},
                {receiverId:userToChatId, senderId:myId}
            ],
        });

        res.status(200).json(messages);


    }catch(error){
        console.log('error in getMessagesController'+error),
        res.status(500).json({message:"Internal server error", error})
    }
}




const sendMessageController = async (req,res)=>{
    try {
        const receiverId = req.params.id;
        const senderId = req.user._id;
        const {text, image} = req.body;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            receiverId,
            senderId,
            text,
            image:imageUrl
        });

        await newMessage.save();

        //TODO_we have to add the realtime functionality here with socke.io
        
        res.status(201).json({
            message:"Message created successfully",
            data:newMessage
        })


    } catch (error) {
        console.log('error into sendMessageController'+error);
        res.status(500).json({message:"Internal server error", error});
    }
}


module.exports = {getUsersController, getMessagesController, sendMessageController};