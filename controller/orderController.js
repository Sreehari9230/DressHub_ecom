const Cart = require('../model/cartModel')
const Category = require('../model/categoryModel')
const User = require('../model/userModel')
const Product = require('../model/productModel')
const Address = require('../model/addressModel')


const loadOrderlist = async (req, res) => {
    try {
      const userIn = req.session.userId;
      res.render("user/orders", { userIn });
    } catch (error) {
      console.log(error);
    }
  };


  module.exports = {
    loadOrderlist,
  }