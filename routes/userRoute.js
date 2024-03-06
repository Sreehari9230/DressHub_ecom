const express = require('express')
const userRoute = express.Router()
const userController = require('../controller/userController');
const userAuth = require('../middlewares/userAuth')
const productController = require('../controller/productController')
// const app = express()
// const path = require('path')

userRoute.use(express.json());
userRoute.use(express.urlencoded({ extended: true }));


// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname,'view/user'));



userRoute.get('/', userController.loadHome)

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



module.exports = userRoute;


