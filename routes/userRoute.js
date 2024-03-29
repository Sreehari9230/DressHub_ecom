const express = require('express')
const userRoute = express.Router()
const userController = require('../controller/userController');
const userAuth = require('../middlewares/userAuth')
const productController = require('../controller/productController')
const cartController = require('../controller/cartController')
const addressController = require('../controller/addressController')
const orderController = require('../controller/orderController')
// const app = express()
// const path = require('path')

userRoute.use(express.json());
userRoute.use(express.urlencoded({ extended: true }));


// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname,'view/user'));



userRoute.get('/', userController.loadHome)
// userRoute.get('/home',userAuth.isLogin, userController.afterlogin)
userRoute.get('/userRegister',userAuth.isLogout, userController.loadRegister)
userRoute.post('/userRegister',userController.verifyRegister)


userRoute.get('/verifyotp',userAuth.isLogout, userController.loadOtp)
userRoute.get('/sentOtp',userAuth.isLogout, userController.getSentOtp)
userRoute.post("/verifyotp",userAuth.isLogout, userController.verifyOtp);
userRoute.post("/resendotp",userAuth.isLogout, userController.resentOtp);

userRoute.get('/userlogin',userAuth.isLogout, userController.loadLogin)
userRoute.post('/userlogin',userAuth.isLogout, userController.verifyLogin)

userRoute.get('/forgotPassword',userAuth.isLogout, userController.loadforgotpassword)
userRoute.post('/forgetpassword',userController.forgetPasswordverify)
userRoute.get('/resetpassword', userAuth.isLogout,userController.loadResetPassword)
userRoute.post('/resetpassword', userAuth.isLogout,userController.verifyResetPassword)

userRoute.get('/userdashboard',userAuth.isLogin,userController.userDashboard)

//load shop
userRoute.get('/shop', userController.loadShop)


//logout
userRoute.get('/userlogout', userAuth.isLogin, userController.userlogout )


userRoute.get('/productdetails', userController.loadproductdeatils)


userRoute.get('/cart', userAuth.isLogin, cartController.loadCart)
userRoute.post('/cart',userAuth.isLogin, cartController.AddtoCart);
userRoute.post("/updatecart",userAuth.isLogin, cartController.UpdateCart);
userRoute.delete("/removecart", userAuth.isLogin, cartController.removeCart);



userRoute.get('/address', userAuth.isLogin, addressController.loadAddress)
userRoute.get('/addaddress',userAuth.isLogin, addressController.loadAddAddress)
userRoute.post('/addaddress', userAuth.isLogin, addressController.postAddress)
userRoute.patch('/editaddress', userAuth.isLogin, addressController.editAddress)
userRoute.delete('/deleteaddress', userAuth.isLogin, addressController.deleteAddress)


userRoute.get('/userdetails', userAuth.isLogin, userController.loadUserDetails)
userRoute.patch('/userdetails', userAuth.isLogin, userController.loadUserDetails)
userRoute.patch("/editprofile", userAuth.isLogin, userController.editUserdetails);

userRoute.get('/orderlist', userAuth.isLogin, orderController.loadOrderlist)
userRoute.get('/checkout', userAuth.isLogin, cartController.loadCheckout)
userRoute.post("/checkout",userAuth.isLogin, orderController.placeOrder)
userRoute.get('/ordercomplete',userAuth.isLogin, orderController.orderPlaced);

userRoute.get('/orderdetails', userAuth.isLogin, orderController.orderDetails)
userRoute.patch('/cancelorder', userAuth.isLogin, orderController.cancelOrder)
userRoute.post('/return', userAuth.isLogin, orderController.returnOrder)



userRoute.get('/changepassword', userAuth.isLogin, userController.changepassword)



module.exports = userRoute;


// {
//     productId: new ObjectId('65f7f915a1542de5ac0d26fb'),
//     price: 10,
//     quantity: 1,
//     total: 10,
//     _id: new ObjectId('65f7fe81a1c6e4435bb500bf')
//   }