//ADD PRODUCT
const AddProduct = async (req, res) => {
    try {
        const filenames = [];

  for (let item of req.files) {
    const pathdata = Date.now() + '-' + item.originalname;
    const imagePath = path.join(
      __dirname,
      '../public/productImages',
      `${pathdata}`
    );

    const fileBuffer = await fs.readFile(item.path);

    await sharp(fileBuffer)
      .resize(1200, 1000, { fit: 'fill' })
      .toFile(imagePath);

    filenames.push(pathdata);
  }
  console.log('asdfghjklzxcvbnmqwertyuiop');
  console.log("Product Category:", req.body.productcategory);

  const newProduct = new products({
    name: req.body.productname,
    description: req.body.productdescription,
    quantity: req.body.productquantity,
    price: req.body.productprice,
    Image: filenames,
    category: req.body.productcategory,
    date: new Date()
  });
   // Save the new product to the database
        await newProduct.save();
  console.log('this is the product',newProduct);
  // // Redirect to product list page
        res.redirect("/admin/productlist");
    } 

    catch (error) {
        console.error("Error adding product:", error);
        res.status(500).send("Internal server error");
    }
};




const editproduct = async (req, res) => {
    try {
      const id = req.body.id;
      const { productName, description, quantity, categories, price } = req.body;
  
      const Datas = await products.findOne({ _id: id });
      const productData = await category.find({ is_Listed: 1 });
      const imageData = [];
      if (req.files) {
        const existedimagecount = (await products.findById(id)).Image.length;
        if (existedimagecount + req.files.length !== 4) {
          return res.render("admin/editproduct", {
            message: "4 Images Only Needed",
            productData,
            Datas,
            
          });
        } else {
          for (let i = 0; i < req.files.length; i++) {
            const resizedpath = path.join(
              __dirname,
              "../public/proImage",
              req.files[i].filename
            );
            await sharp(req.files[i].path)
              .resize(800, 1200, { fit: "fill" })
              .toFile(resizedpath);
  
            imageData.push(req.files[i].filename);
          }
        }
      }
  
      const selectcategory = await category.findOne({
        name: categories,
        is_Listed: 1,
      });
  
      const updateproduct = await products.findOneAndUpdate(
        { _id: id },
        {
          name: productName,
          description,
          quantity: quantity,
          price,
          categories: selectcategory._id,
          $push: { Image: { $each: imageData } },
        },
        {
          new: true,
        }
      );
      res.redirect("/admin/productlist");
    } catch (error) {
      console.log(error.message);
    }
  };




  const productdetail = async(req,res)=>{
    try {
      
    const productId = req.query.id
    console.log("uifvufvnfuvuvuivui",productId);
    const product= await Product.findById({_id:productId}).populate({
      path: 'category',
      populate: { path: 'offers' }
    }).populate("offers"); 
    
    console.log("the productdetail may here",product);
    res.render("user/productdetail",{data:product,user: req.session.userId})
    } catch (error) {
      console.log(error.message);
    }
    
  }
  