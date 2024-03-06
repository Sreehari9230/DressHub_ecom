


const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    is_Admin:{
        type:Number,
        required:true
    },
    is_Verified:{
        type:Number,
       default:0
    },
    token:{
        type:String,
        default:''
    },
    is_Blocked:{
        type:Number,
        default:0,
    }

});

module.exports = mongoose.model('User', userSchema)