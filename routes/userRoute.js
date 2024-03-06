const express = require('express')
const userRoute = express.Router()
const userController = require('../controller/userController');
const userAuth = require('../middlewares/userAuth')

userRoute.use(express.json());
userRoute.use(express.urlencoded({ extended: true }));



userRoute.get('/', userController.loadHome)

userRoute.get('/userRegister',userAuth.isLogout, userController.loadRegister)
userRoute.post('/userRegister',userController.verifyRegister)


userRoute.get('/verifyotp', userController.loadOtp)
userRoute.get('/sentOtp',userController.getSentOtp)
userRoute.post("/verifyotp", userController.verifyOtp);
userRoute.post("/resend-otp",userController.resentOtp);

userRoute.get('/userlogin', userController.loadLogin)
// userRoute.post('/userlogin',userController.verifyLogin)

// userRoute.get('/forgotPassword', userController.forgotPassword)



module.exports = userRoute;


