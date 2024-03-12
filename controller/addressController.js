const Cart = require('../model/cartModel')
const Category = require('../model/categoryModel')
const User = require('../model/userModel')
const Product = require('../model/productModel')
const Address = require('../model/addressModel')

const loadAddress = async(req,res)=>{
    try {
        res.render('user/address')
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    loadAddress
}