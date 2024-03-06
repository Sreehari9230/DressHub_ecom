const User = require('../model/userModel');

const isLogin = async (req,res,next)=>{
    try {
        const user = await User.findOne({_id: req.session.userId});
        console.log(user);
        if(!user || user.is_Blocked === 1) {
            req.session.destroy();
            res.redirect('/userlogin')
            return;
        }
        next();
    } catch (error) {
        console.log(error.message);
    }
}

const isLogout = async (req,res,next) =>{
    try {
       if(req.session.userId) {
        console.log(req.session.userId);
        res.redirect('/');
       
       }
       next();
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    isLogin,
    isLogout
}