const products = require("../model/productModel");
const category = require("../model/categoryModel");
const path = require("path");
const fs = require("fs").promises;
const sharp = require("sharp");
const upload = require("../middlewares/multer");
const mongoose = require("mongoose");

const loadProductlist = async (req, res) => {
  try {
    const Products = await products.find();
    res.render("admin/productlist", { product: Products });
  } catch (error) {
    console.log(error);
  }
};

const loadAddproduct = async (req, res) => {
  try {
    const Categories = await category.find();
    res.render("admin/addproduct", { Category: Categories });
  } catch (error) {
    console.log(error.message);
  }
};

//ADD PRODUCT
const AddProduct = async (req, res) => {
  try {
    const filenames = [];

    for (let item of req.files) {
      const pathdata = Date.now() + "-" + item.originalname;
      const imagePath = path.join(
        __dirname,
        "../public/productImages",
        `${pathdata}`
      );

      const fileBuffer = await fs.readFile(item.path);

      await sharp(fileBuffer)
        .resize(1200, 1000, { fit: "fill" })
        .toFile(imagePath);

      filenames.push(pathdata);
    }
    console.log("asdfghjklzxcvbnmqwertyuiop");
    console.log("Product Category:", req.body.productcategory);

    const newProduct = new products({
      name: req.body.productname,
      description: req.body.productdescription,
      quantity: req.body.productquantity,
      price: req.body.productprice,
      Image: filenames,
      category: req.body.productcategory,
      date: new Date(),
    });
    // Save the new product to the database
    await newProduct.save();
    console.log("this is the product", newProduct);
    // // Redirect to product list page
    res.redirect("/admin/productlist");
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Internal server error");
  }
};

const listproduct = async (req, res) => {
  try {
    const productId = req.body.id;
    console.log(productId);
    await products.updateOne({ _id: productId }, { $set: { is_Listed: true } });
    res.redirect("/admin/productlist");
  } catch (error) {
    console.error("Error in listproduct:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const unlistedproduct = async (req, res) => {
  try {
    const productId = req.body.id;
    console.log(productId, "asdfghj");
    await products.updateOne(
      { _id: productId },
      { $set: { is_Listed: false } }
    );
    res.redirect("/admin/productlist");
  } catch (error) {
    console.error("Error in unlistproduct:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.query.id;
    await products.deleteOne({ _id: id });
    console.log("product has been deleted");
    res.redirect("/admin/productlist");
  } catch (error) {
    console.log(error.message);
  }
};

const LoadEditProduct = async (req, res) => {
  try {
    const id = req.query.productId;
    console.log("this is id", id);
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid product ID");
    }

    // const Categories = await category.find()
    // const productData = await category.find({ is_Listed: 1 });
    // const Datas = await products.findOne({ _id: id });
    const [Categories, productData, Datas] = await Promise.all([
      category.find(),
      category.find({ is_Listed: 1 }),
      products.findOne({ _id: id }),
    ]);

    if (!Datas) {
      return res.status(404).send("Product not found");
    }

    const messages = {};
    res.render("admin/editproduct", {
      productData,
      Datas,
      messages,
      Category: Categories,
    });
    console.log("code is working");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const editProduct = async (req, res) => {
  try {
    const id = req.body.id;
    console.log(id);
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
            "../public/productImages",
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
    console.log(error);
  }
};

const deleteimage = async (req, res) => {
  try {
    const { img, prdtid } = req.body;
    if (!prdtid) {
      return res
        .status(400)
        .send({ success: false, error: "Product id is required." });
    }

    const validProductId = mongoose.Types.ObjectId.isValid(prdtid);
    if (!validProductId) {
      return res
        .status(400)
        .send({ success: false, error: "Invalid product id." });
    }

    if (!img) {
      return res
        .status(400)
        .send({ success: false, error: "Image is required." });
    }

    fs.unlink(path.join(__dirname, "/public/productImages", img), () => {});

    await products.updateOne({ _id: prdtid }, { $pull: { Image: img } });

    res.send({ success: true });
    console.log("The image has been deleted.");
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, error: "Failed to delete image." });
  }
};

module.exports = {
  loadProductlist,
  loadAddproduct,
  AddProduct,
  listproduct,
  unlistedproduct,
  deleteProduct,
  LoadEditProduct,
  editProduct,
  deleteimage,
};
