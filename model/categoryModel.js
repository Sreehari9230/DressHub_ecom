const mongoose = require('mongoose')

const CategoryModel = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    description: {
        type: String,
    },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number ,required:true},
    is_Listed: {
        type: Number,
        default: 0,
    },
    images: {
        type:[String],
        required: true
    }
})

module.exports = mongoose.model("Category", CategoryModel)