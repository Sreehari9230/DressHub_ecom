const mongoose =require("mongoose")

const otpVerificationSchema= new mongoose.Schema({
    email:String,

    otp:String,

    createdAt:Date,

    expiresAt:Date

})

module.exports=mongoose.model("otpVerificationSchema",otpVerificationSchema)