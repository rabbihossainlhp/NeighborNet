const {Schema,model} = require('mongoose');


const messageSchema = new Schema({
    senderId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    receiverId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    text:{
        type:String,
        trim:true 
    },

    image:{
        type:String 
    }

},{timestamps:true});


const Message = model("Message",messageSchema);

module.exports = Message;