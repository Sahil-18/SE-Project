const mongoose = require("mongoose");

// Creating a user model
const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            required:true
        },
        register_date:{
            type:Date,
            default:Date.now
        }
    }
);

const User = mongoose.model("User",userSchema);

module.exports={User: User};