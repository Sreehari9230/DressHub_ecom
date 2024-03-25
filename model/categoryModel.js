const mongoose = require('mongoose')

const CategoryModel = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    description: {
        type: String,
    },
     is_Listed: {
        type: Number,
        default: 1,
    },
})

module.exports = mongoose.model("category", CategoryModel);