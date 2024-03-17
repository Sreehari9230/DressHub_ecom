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
userRoute.get('/sentOtp',userController.getSentOtp)
userRoute.post("/verifyotp", userController.verifyOtp);
userRoute.post("/resendotp",userController.resentOtp);

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

userRoute.get('/orderlist', userAuth.isLogin, orderController.loadOrderlist)


userRoute.get('/address', userAuth.isLogin, addressController.loadAddress)
userRoute.get('/addaddress',userAuth.isLogin, addressController.loadAddAddress)
userRoute.post('/addaddress', userAuth.isLogin, addressController.postAddress)
userRoute.patch('/editaddress', userAuth.isLogin, addressController.editAddress)
userRoute.delete('/deleteaddress', userAuth.isLogin, addressController.deleteAddress)

userRoute.get('/checkout', userAuth.isLogin, cartController.loadCheckout)

userRoute.get('/userdetails', userAuth.isLogin, userController.loadUserDetails)
userRoute.patch('/userdetails', userAuth.isLogin, userController.loadUserDetails)
userRoute.patch("/editprofile", userAuth.isLogin, userController.editUserdetails);



module.exports = userRoute;


