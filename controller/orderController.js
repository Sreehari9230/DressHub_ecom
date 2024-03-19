const Cart = require('../model/cartModel')
const Category = require('../model/categoryModel')
const User = require('../model/userModel')
const Product = require('../model/productModel')
const Address = require('../model/addressModel')
const Order = require('../model/orderModel')


const loadOrderlist = async (req, res) => {
    try {
      const userIn = req.session.userId;
      res.render("user/orders", { userIn });
    } catch (error) {
      console.log(error);
    }
  };


const placeOrder = async (req,res)=>{
  try {
    const userId = req.session.userId

    const { addressId, paymentMethod, subtotal } = req.body;
    console.log('addressid :',addressId)
    console.log('paymentmethod :',paymentMethod)
    console.log('subtotal :',subtotal)

    const cartdata = await Cart.findOne({ user: userId })

    if(!addressId){
      return res.json({
        success:false,
        message:'select the address and peyment method before placing the order'
      })
    }

    const userAddress = await Address.findOne({
      "address._id":addressId,
    })
    console.log('this is address', userAddress);
    //check if useraddress is not empty and has at least one address
    if(!userAddress || userAddress.length === 0){
      return res.json({
        success:false,
        message:"please select a valid address"
      })
    }

    //since userAddress is an array use userAddress[0] if it exists
    const addressObject = userAddress.address.filter((address)=> address._id == addressId)
    console.log('this is the address object :', addressObject);

    const userdata = await User.findOne({ _id: req.session.userId })

    for(const cartProduct of cartdata.product){
      const productData = await Product.findOne({  _id: cartProduct.productId })
      
      if(cartProduct.quantity > productData.quantity){
        return res.json({
          success: false,
          message:`Not enough stock available on : ${productData}`,
        })
      }
    }

    const expireDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

    const products = cartdata.product;
    console.log('this is wgere the error is ', products)
    const orderStatus = paymentMethod === "CASH ON DELIVERY" ? "placed" : "pending"

    const NewOrder = new Order({
      deliveryDetails:addressObject,
      user: userdata._id,
      paymentMethod: paymentMethod,
      product: products.map(product => ({
        productId: product.productId,
        name:product.name,
        price: product.price,
        category:product.category,
        quantity:product.quantity,
      })),
      subtotal:subtotal,
      status:orderStatus,
      Date:Date.now(),
      expiredate: expireDate,
    });

    const saveOrder = await NewOrder.save();
    const orderId = saveOrder._id;
    const totalamount = saveOrder.subtotal
    
    if(paymentMethod === "CASH ON DELIVERY") {
      for(const cartProduct of cartdata.product) {
        await Product.findOneAndUpdate(
          { _id: cartProduct.productId },
          { $inc: { quantity: -cartProduct.quantity } }
        )
      }
    }

    const DeleteCartItem = await Cart.findOneAndDelete({ user:userId })

    return res.redirect(`/ordercomplete?id=${orderId}`);

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Unexpected error occurred. Please try again later."
  });
  }
}

const orderPlaced = async(req,res)=>{
  try {
    const id = req.query.id;

    const userId = req.session.userId;
    const date = new Date();

    const userData = await User.findOne({_id:userId})
    const order = await Order.findOne({_id:id})

    res.render('user/ordercomplete',{order:order,date,orderId:id})
  } catch (error) {
    console.log(error);
  }
}

  module.exports = {
    loadOrderlist,
    placeOrder,
    orderPlaced
  }