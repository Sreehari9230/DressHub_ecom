const adminController = require('../controller/adminController')
const express = require('express')
// const app = express()
// const path = require('path')
const adminRoute = express.Router();
const adminAuth = require('../middlewares/adminAuth')
const productController = require('../controller/productController')
const categoryController = require('../controller/categoryController')
// const upload = require('../middlewares/multer')
const path = require('path')
const multer = require('multer')

const storage=multer.diskStorage({

    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../public/productImages"))
    },
    filename:function(req,file,cb){
        const name=Date.now()+"-"+file.originalname;
        cb(null,name)    
    }
  });
  
  const upload = multer({ storage: storage})



adminRoute.use(express.json());
adminRoute.use(express.urlencoded({ extended:true}));

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname,'view/admin'));


adminRoute.get('/',adminAuth.isLogout, adminController.adminLogin)
adminRoute.post('/',adminAuth.isLogout, adminController.verifyadminlogin)
//dashboard
adminRoute.get('/dashboard',adminAuth.isLogin, adminController.loadDashboard)
//usermangement
adminRoute.get('/usermanagement', adminController.LoadUserManagement)
adminRoute.get('/block', adminAuth.isLogin, adminController.blockUser)
//productlist
adminRoute.get('/productlist',adminAuth.isLogin, productController.loadProductlist)
//addproduct
adminRoute.get('/addproduct', adminAuth.isLogin, productController.loadAddproduct)
// adminRoute.post('/addproduct', adminAuth.isLogin,upload.upload.array('images',4), productController.AddProduct)
adminRoute.post("/addproduct",adminAuth.isLogin,upload.array("productimages", 4),productController.AddProduct);


//categorymanagement
adminRoute.get('/category',adminAuth.isLogin, categoryController.loadcategory)
//addcategory
adminRoute.get('/addcategory',adminAuth.isLogin, categoryController.loadAddCAtegory)
adminRoute.post('/addcategory',adminAuth.isLogin, categoryController.AddCategory)
//deletecategory
adminRoute.get('/deletecategory', adminAuth.isLogin, categoryController.deleteCategory)
//editcategory
adminRoute.get('/editcategory', adminAuth.isLogin, categoryController.editCategory)
adminRoute.post('/editcategory', adminAuth.isLogin, categoryController.editingcategory)
//list and unlist category
adminRoute.get("/categoryList", adminAuth.isLogin, categoryController.listCategory);
adminRoute.get("/categoryUnList", adminAuth.isLogin, categoryController.unlistCategory);

//adminlogout
adminRoute.get('/logout',adminAuth.isLogin, adminController.adminlogout)

adminRoute.get("/editproduct", adminAuth.isLogin, productController.LoadEditProduct);
adminRoute.post("/editproduct", adminAuth.isLogin, upload.array("image", 4), productController.editProduct);
adminRoute.delete("/deleteimage", adminAuth.isLogin, productController.deleteimage);

adminRoute.post("/Listproduct", adminAuth.isLogin, productController.listproduct);
adminRoute.post("/Unlistproduct", adminAuth.isLogin, productController.unlistedproduct);
adminRoute.get("/deleteproduct", adminAuth.isLogin, productController.deleteProduct);


module.exports = adminRoute