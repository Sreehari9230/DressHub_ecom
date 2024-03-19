const mongoose = require("mongoose");

const cartModel = new mongoose.Schema({ 
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            name: {
                type: String,
                required: true,
            },
            price: {
                type:Number,
                default: 0,
            },
            quantity: {
                type:Number,
                default: 0
            },
            total: {
                type: Number,
                default: 0,
            }
        }
    ]
})

module.exports = mongoose.model("Cart", cartModel)