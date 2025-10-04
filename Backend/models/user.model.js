const {Schema,model} = require("mongoose");

const userSchema = new Schema({
    fullname:{
        type: String,
        required:true,
        trim:true,
        maxlength: 35
    },

    email:{
        type:String,
        required:true,
        trim:true,
        unique:true 
    },

    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6
    },

    profilePicture:{
        type:String,
        default:""
    }

}, {timestamps:true});


const User = model("User",userSchema);

module.exports = User;