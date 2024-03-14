const isLogin = async(req,res,next)=>{
    try {
        if(req.session.admin_id){
            // console.log("next in ad");
            next()
        }else{
            // console.log("redirect in ad");
            res.redirect('/admin')
        }
    } catch (error) {
        console.log(error);
        res.render('admin/adminlogin')
    }
}

const isLogout = async(req,res,next)=>{
    try {
       if(req.session.admin_id){
        // console.log("redidt log ad");
        res.redirect('/admin/dashboard')
       } else {
        // console.log("next logout");
        next();
       }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    isLogin,
    isLogout
}