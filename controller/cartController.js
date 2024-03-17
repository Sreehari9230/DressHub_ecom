const Cart = require("../model/cartModel");
const Category = require("../model/categoryModel");
const User = require("../model/userModel");
const Product = require("../model/productModel");
const Address = require("../model/addressModel");

const loadCart = async (req, res) => {
  try {
    console.log("hahaha");
    const userId = req.session.userId;
    const userIn = req.session.userId;


    if (userId) {
      const cartdata = await Cart.findOne({ user: userId }).populate({
        path: "product.productId",
        model: "Product",
      });

      const subtotal = cartdata?.product.reduce(
        (acc, val) => acc + val.total,
        0
      );
      console.log("this is subtotal", subtotal);

      console.log("cart dadadadadad", cartdata);
      res.render("user/cart", {
        cartdata,
        subtotal,
        user: req.session.userId,
        userIn,
      });
      console.log("is it rendering");
    } else {
      console.log("hehehe");
      res.redirect("/userlogin");
    }
  } catch (error) {
    console.log(error, "asdfgh");
  }
};

const AddtoCart = async (req, res) => {
  try {
    console.log("keeeeeeeeeeeeeeeeeeeeee");
    const { userId } = req.session;
    console.log(userId, "aSDFGHJK");
    if (!userId) {
      // res.redirect('/userlogin')
      return res.json({ session: false, error: "Please login" });
    }
    const userData = await User.findById(userId);
    if (!userData) {
      return res.json({ session: false, error: "User not found" });
    }

    const productId = req.body.productId;
    const productData = await Product.findById(productId);

    if (!productData || productData.quantity === 0) {
      return res.json({
        success: false,
        error: "Product is not found or out of stock",
      });
    }

    // Find if the product already exists in the user's cart
    const existProduct = await Cart.findOne({
      user: userId,
      "product.productId": productId, // Ensure correct property name
    });

    if (existProduct) {
      // If the product exists, increment its quantity
      const updatedCart = await Cart.findOneAndUpdate(
        {
          user: userId,
          "product.productId": productId,
        },
        {
          $inc: { "product.$.quantity": 1 },
        },
        { new: true }
      );
      return res.json({ success: true, stock: true, updatedCart });
    } else {
      //if the product dosnt exist add to cart
      const cartData = await Cart.findOneAndUpdate(
        { user: userId },
        {
          $set: { user: userId },
          $push: {
            product: {
              productId: productId, // Ensure correct property name
              price: productData.price,
              quantity: 1,
              total: productData.price,
            },
          },
        },
        { upsert: true, new: true } // Upsert ensures insertion if document doesn't exist
      );
      return res.json({ success: true, stock: true, cartData });
    }
  } catch (error) {
    consoole.log(error);
  }
};

// const sampleaddcart = async(req,res)=>{
//     const userId = req.session.userId
//     const userdata = await User.find({_id:userId})
// }

const UpdateCart = async (req, res) => {
  try {
    const productid = req.body.productId;
    const userid = req.session.userId;
    const count = req.body.count;

    //fetch product and user data
    const product = await Product.findOne({ _id: productid });
    const cartData = await Cart.findOne({ user: userid });

    //decrease quntity
    if (count == -1) {
        console.log('count is decreasing');
      const currentQuantity = cartData.product.find(
        (p) => p.productId == productid
      ).quantity;
      if (currentQuantity <= 1) {
        return res.json({
          success: false,
          error: "Quantity cannot be decreased below 1",
        });
      }
    }

    //increase quantity
    if (count == 1) {
        console.log('count is increasing');
      const currentQuantity = cartData.product.find(
        (p) => p.productId == productid
      ).quantity;
      if (currentQuantity + count > product.quantity) {
        return res.json({
          success: false,
          error: "Cannot add more quantity",
        });
      }
    }
    // Update the cart in the database
    const cartDetails = await Cart.findOneAndUpdate(
      {
        user: userid,
        "product.productId": productid,
      },
      {
        $inc: {
          "product.$.quantity": count, // Use $ to identify the correct element to update in the array
          "product.$.total": count * product.price, // Calculate the total based on the product's price
        },
      },
      { new: true } //return the updated document
    );
    res.json({ success:true })
    // res.json({ success:true, quantity: updatedQuantity, subtotal: updatedSubtotal });
  } catch (error) {
    console.log(error);
  }
};

const removeCart = async(req,res)=>{
    try {
        const product_id = req.body.productId
        const user_id = req.session.userId
        const result = await Cart.findOneAndUpdate(
            { user: user_id },
            { $pull: { product: { productId: product_id } } },
            { new: true}
        )

        if(result){
            res.json({ success: true})
        } else{
            res
            .status(404)
            .json({ success: false, message:"Product not found in cart"})
        }
    } catch (error) {
        console.log(error);
    }
}

const loadCheckout = async(req,res)=>{
  try {
    res.render('user/checkout')
  } catch (error) {
    
  }
}

module.exports = {
  loadCart,
  AddtoCart,
  UpdateCart,
  removeCart,
  loadCheckout
};
