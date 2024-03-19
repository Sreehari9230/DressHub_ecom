const {ObjectId} = require('mongodb');
const mongoose = require('mongoose')

const orderModel = new mongoose.Schema({

    deliveryDetails: {
        type:Object,
        required:true,
      },
      user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
      },
      paymentMethod:{
        type:String,
      },
    product: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],

    subtotal:{
        type:Number,
        required:true,
    },
    Date:{
        type:Date,
        required:true,
    },
    expiredate:{
        type:Date,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    // paymentId:{
    //     type:String,
    //     required:true,
    // },
})


module.exports = mongoose.model("Order",orderModel);