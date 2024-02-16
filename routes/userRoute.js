const express = require('express')
const userRoute = express.Router()
const userController = require('../controller/userController');

userRoute.get('/', userController.loadHome)

userRoute.get('/userRegister', userController.loadRegister)

userRoute.post('/userRegister',userController.varifyRegister)

userRoute.get('/verifyotp', userController.loadOtp)

userRoute.get('/sentOtp',userController.getSentOtp)

userRoute.post("/verifyotp", userController.verifyOtp);

userRoute.get('/userlogin', userController.loadLogin)



module.exports = userRoute;

 

