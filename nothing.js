// // // const Categories = require("../model/catagoryModel");

// // // const loadCategory = async (req, res) => {
// // //   try {
// // //     const Data = await Categories.find();

// // //     res.render("admin/category", { Data: Data });
// // //   } catch (error) {
// // //     console.log(error.message);
// // //   }
// // // };

// // // const addCategory = async (req, res) => {
// // //   try {
// // //     res.render("admin/addcatagory");
// // //   } catch (error) {
// // //     console.log(error.message);
// // //   }
// // // };

// // // const newCategory = async (req, res) => {
// // //   try {
// // //     const name = req.body.categoryName.toUpperCase();
// // //     const description = req.body.categoryDescription.toUpperCase();

// // //     const category = await Categories.findOne({ name: name });

// // //     if (category) {
// // //       res.render("admin/addcatagory", {
// // //         messages: { message: "this category allready exist" },
// // //       });
// // //     } else {
// // //       const newData = new Categories({
// // //         name: name,
// // //         description: description,
// // //       });

// // //       const categoryData = await newData.save();
// // //       res.redirect("/admin/category");
// // //     }
// // //   } catch (error) {
// // //     console.log(error.message);
// // //     res.status(500).send("Internal Server Error");
// // //   }
// // // };

// // // const editCategory = async (req, res) => {
// // //   try {
// // //     const categoryId = req.query.id;
// // //     console.log("tghe id iud ", categoryId);
// // //     const category = await Categories.findOne({ _id: categoryId });

// // //     console.log("data is here", category);

// // //     res.render("admin/editcategory", { category });
// // //   } catch (error) {
// // //     console.log(error.message);
// // //     res.status(500).send("Internal Server Error");
// // //   }
// // // };

// // // const editedCategory = async (req, res) => {
// // //   try {
// // //     const id = req.body.categoryid;
// // //     const name = req.body.categoryName;
// // //     const description = req.body.categoryDescription;

// // //     const existingCategory = await Categories.findOne({ name: name });

// // //     if (existingCategory && existingCategory._id.toString() !== id) {
// // //       return res.render("admin/editcategory", {
// // //         category: {},
// // //         messages: { message: "This category already exists" },
// // //       });
// // //     }

// // //     const updatedCategory = await Categories.findByIdAndUpdate(
// // //       id,
// // //       {
// // //         name: name,
// // //         description: description,
// // //       },
// // //       { new: true }
// // //     );

// // //     if (!updatedCategory) {
// // //       return res.render("admin/editcategory", {
// // //         category: {},
// // //         messages: { message: "Category not found" },
// // //       });
// // //     }

// // //     res.redirect("/admin/category");
// // //   } catch (error) {
// // //     console.log(error.message);
// // //     res.status(500).send("Internal server error");
// // //   }
// // // };

// // // const deleteCategory = async (req, res) => {
// // //   try {
// // //     const id = req.query.id;
// // //     console.log("suii", id);
// // //     await Categories.findByIdAndDelete({ _id: id });
// // //     res.redirect("/admin/category");
// // //   } catch (error) {
// // //     console.log(error.message);
// // //   }
// // // };

// // // const Listed = async (req, res) => {
// // //   try {
// // //     await Categories.findByIdAndUpdate(
// // //       { _id: req.query.id },
// // //       { $set: { is_Listed: 1 } }
// // //     );
// // //     res.redirect("/admin/category");
// // //   } catch (error) {
// // //     console.log(error.message);
// // //   }
// // // };

// // // const UnListed = async (req, res) => {
// // //   try {
// // //     await Categories.findByIdAndUpdate(
// // //       { _id: req.query.id },
// // //       { $set: { is_Listed: 0 } }
// // //     );
// // //     res.redirect("/admin/category");
// // //   } catch (error) {
// // //     console.log(error.message);
// // //   }
// // // };

// // // module.exports = {
// // //   loadCategory,
// // //   addCategory,
// // //   newCategory,
// // //   editCategory,
// // //   editedCategory,
// // //   deleteCategory,
// // //   Listed,
// // //   UnListed,
// // // };











// // const userlogout = async (req,res)=>{
// //     try{
// //       req.session.destroy()
// //       res.redirect('/userlogin')
// //     } catch(error){
// //       console.log(error.message);
// //     }
// //   }


// //   const adminlogout = async (req, res) => {
// //     try {
// //       req.session.destroy();
// //       res.redirect("/");
// //     } catch (error) {
// //       console.log(error.message);
// //     }
// //   };







// /////ADD PRODUCT CONTROLLER
// const addproduct = async (req, res) => {
//   try {
//     const productDatas = await products.find({ name: req.body.productname });

//     if (productDatas.length > 0) {
//       return res.status(404).send("It's already existed");
//     }

//     const { productName, description, quantity, categories, price } = req.body;
//     const filenames = [];
//     const existcategory = await category.findOne({ name: categories });
//     const Datas = await category.find({ is_listed: 1 });

//     if (!req.files || req.files.length !== 4) {
//       return res.render("admin/addproduct", {
//         message: "you need four photos",
//         productData: Datas,
//       });
//     }
//     for (let i = 0; i < req.files.length; i++) {
//       const imagepath = path.join(
//         __dirname,
//         "../public/proImage",
//         req.files[i].filename
//       );
//       await sharp(req.files[i].path)
//         .resize(800, 1200, { fit: "fill" })
//         .toFile(imagepath);
//       filenames.push(req.files[i].filename);
//     }
//     const newproduct = new products({
//       name: productName,
//       description,
//       quantity,
//       price,
//       Image: filenames,
//       category: existcategory._id,
//       date: new Date(),
//     });

//     await newproduct.save();
//     res.redirect("/admin/product");
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send("Internal Server Error");
//   }
// };


// /////ADD PRODUCT ROUTE


// adminRoute.get("/product", adminauth.isLogin, productController.loadproduct);
// adminRoute.get("/addproduct",adminauth.isLogin,productController.loadaddproducts);
// adminRoute.get("/editproduct",adminauth.isLogin,productController.loadeditproduct);
// adminRoute.get("/");
// adminRoute.get("/deleteproduct", productController.deleteproduct);
// adminRoute.post("/addproduct",adminauth.isLogin,upload.upload.array("image", 4),productController.addproduct);
// // adminRoute.post("/editproduct",adminauth.isLogin,upload.upload.array("image", 4),productController.editproduct);
// // adminRoute.post("/Listproduct", productController.listproduct);
// // adminRoute.post("/Unlistproduct", productController.unlistedproduct);
// // adminRoute.delete("/deleteimage", productController.deleteimage);




// // const storage=multer.diskStorage({

// //   destination:function(req,file,cb){
// //       cb(null,path.join(__dirname,"../public/productImages"))
// //   },
// //   filename:function(req,file,cb){
// //       const name=Date.now()+"-"+file.originalname;
// //       cb(null,name)    
// //   }
// // });

// // const upload = multer({ storage: storage})





// const insertProduct = async (req, res) => {
//   const filenames = [];

//   for (let item of req.files) {
//     const pathdata = Date.now() + '-' + item.originalname;
//     const imagePath = path.join(
//       __dirname,
//       '../public/productImages',
//       `${pathdata}`
//     );

//     const fileBuffer = await fs.readFile(item.path);

//     await sharp(fileBuffer)
//       .resize(1200, 1000, { fit: 'fill' })
//       .toFile(imagePath);

//     filenames.push(pathdata);
//   }

  

  
 
//   // const images =await  req.files.map(file => file.filename)
//   try {
//     const product = new products({
//       productname: req.body.productname,
//       productprice: req.body.productprice,
//       category: req.body.category,
//       productsize: req.body.productsize,
//       productquantity: req.body.productquantity,
//       images: filenames
//     })
//     const productData = await product.save();
//     if (productData) {
//       res.redirect("/admin/productpage")
//       // res.render("productsidepage", { message: "Your product is successfuly added" })
//     } else {
//       res.render("productsidepage", { message: "Your product is not added" })
//     }
//   } catch (error) {
//     if (error.errors) {
//       const message = Object.values(error.errors).map(err => err.message);
//       return res.render('productsidepage', { message }); // Pass errors to the view
//     }
//   }

// }



// const knewProduct = new products({
//   productname: req.body.productname,
//   productprice: req.body.productprice,
//   category: req.body.category,
//   productsize: req.body.productsize,
//   productquantity: req.body.productquantity,
//   images: filenames
// });


// const newProduct = new products({
//   name: productname,
//   description: productdescription,
//   quantity: productquantity,
//   price: productprice,
//   Image: filenames,
//   category: productcategory,
//   date: new Date()
// });














// const insertProduct22 = async (req, res) => {
//   const filenames = [];

//   for (let item of req.files) {
//     const pathdata = Date.now() + '-' + item.originalname;
//     const imagePath = path.join(
//       __dirname,
//       '../public/productImages',
//       `${pathdata}`
//     );

//     const fileBuffer = await fs.readFile(item.path);

//     await sharp(fileBuffer)
//       .resize(1200, 1000, { fit: 'fill' })
//       .toFile(imagePath);

//     filenames.push(pathdata);
//   }

//   // const images =await  req.files.map(file => file.filename)
//   try {
//     const product = new products({
//       productname: req.body.productname,
//       productprice: req.body.productprice,
//       category: req.body.category,
//       productsize: req.body.productsize,
//       productquantity: req.body.productquantity,
//       images: filenames
//     })
//     const productData = await product.save();
//     if (productData) {
//       res.redirect("/admin/productpage")
//       // res.render("productsidepage", { message: "Your product is successfuly added" })
//     } else {
//       res.render("productsidepage", { message: "Your product is not added" })
//     }
//   } catch (error) {
//     if (error.errors) {
//       const message = Object.values(error.errors).map(err => err.message);
//       return res.render('productsidepage', { message }); // Pass errors to the view
//     }
//   }

// }




// const AddProduct = async (req, res) => {
//   try {
//       const filenames = [];

// for (let item of req.files) {
//   const pathdata = Date.now() + '-' + item.originalname;
//   const imagePath = path.join(
//     __dirname,
//     '../public/productImages',
//     `${pathdata}`
//   );

//   const fileBuffer = await fs.readFile(item.path);

//   await sharp(fileBuffer)
//     .resize(1200, 1000, { fit: 'fill' })
//     .toFile(imagePath);

//   filenames.push(pathdata);
// }
// console.log('asdfghjklzxcvbnmqwertyuiop');

// const newProduct = new products({
//   name: req.body.productname,
//   description: req.body.productdescription,
//   quantity: req.body.productquantity,
//   price: req.body.productprice,
//   Image: filenames,
//   category: req.body.productcategory,
//   date: new Date()
// });
//  // Save the new product to the database
//       await newProduct.save();
// console.log('this is the product',newProduct);
// // // Redirect to product list page
//       res.redirect("/admin/productlist");

//   } 

//   catch (error) {
//       console.error("Error adding product:", error);
//       res.status(500).send("Internal server error");
//   }
// };




// const editproduct = async (req, res) => {
//   try {
//     const id = req.body.id;
//     const { productName, description, quantity, categories, price } = req.body;

//     const Datas = await products.findOne({ _id: id });
//     const productData = await category.find({ is_Listed: 1 });
//     const imageData = [];
//     if (req.files) {
//       const existedimagecount = (await products.findById(id)).Image.length;
//       if (existedimagecount + req.files.length !== 4) {
//         return res.render("admin/editproduct", {
//           message: "4 Images Only Needed",
//           productData,
//           Datas,
          
//         });
//       } else {
//         for (let i = 0; i < req.files.length; i++) {
//           const resizedpath = path.join(
//             __dirname,
//             "../public/proImage",
//             req.files[i].filename
//           );
//           await sharp(req.files[i].path)
//             .resize(800, 1200, { fit: "fill" })
//             .toFile(resizedpath);

//           imageData.push(req.files[i].filename);
//         }
//       }
//     }

//     const selectcategory = await category.findOne({
//       name: categories,
//       is_Listed: 1,
//     });

//     const updateproduct = await products.findOneAndUpdate(
//       { _id: id },
//       {
//         name: productName,
//         description,
//         quantity: quantity,
//         price,
//         categories: selectcategory._id,
//         $push: { Image: { $each: imageData } },
//       },
//       {
//         new: true,
//       }
//     );
//     res.redirect("/admin/product");
//   } catch (error) {
//     console.log(error.message);
//   }
// };



// let nums = [1,1,2,7,2,5,2,56,3,5,5]
// nums.sort()
// let unique = [...new Set(nums)];
// console.log(unique); // Output: [1, 2]
// return unique;
