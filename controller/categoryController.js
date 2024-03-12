const products = require('../model/productModel')
const category = require('../model/categoryModel')



const loadcategory = async (req, res) => {
    try {
      const Categories = await category.find()
      res.render("admin/categorymanagement", {Category: Categories});
    } catch (error) {
      console.log(error.message);
    }
  };

  const AddCategory = async (req, res) => {
    try {
      console.log('this is in');
      const name = req.body.categoryname.toUpperCase();
      
      const description = req.body.categorydescription.toUpperCase();
  

      const Category = await category.findOne({ name: name });
  
      if (Category) {
        return res.render("admin/categorymanagement", {
          messages: { message: "This category already exists" },
        });
      } else {
        const newData = new category({
          name: name,
          description: description,
        });
  console.log('abcd')
        const categoryData = await newData.save();
        res.redirect("/admin/category");
      }
    } catch (error) {
      console.log(error);
  
      res.status(500).send("Internal Server Error");
    }
  };

  //edit category
  const editCategory = async(req,res)=>{
    try {
        const categoryId = req.query.id
        console.log('this is category id', categoryId);
        const Category = await category.findById(categoryId)
        console.log('category', Category);
        res.render('admin/editcategory', { category: Category})

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Errror")
    }
  }

  //CATEGORY EDITING
  const editingcategory = async(req,res)=>{
    try {
      const id = req.body.categoryid
      const name = req.body.editCategoryName
      const description = req.body.editCategoryDescription

      const existingCategory = await category.findOne( { name: name } )
      

      if(existingCategory && existingCategory._id.toString() !== id){
        return res.render("admin/editcategory", {
          Category : {},
          messages : { message: "This category already exists"}
        })
      }

      const updatedCategory = await category.findOneAndUpdate(
        id,
        {
          name:name,
          description: description
        },
        { new: true}
      )
      console.log(updatedCategory);

      if(!updatedCategory){
        return res.render('admin/editcategory', {
          category: {},
          messages: { message: 'category not found'}
        })
      }
      res.redirect('/admin/category')
    } catch (error) {
      console.log(error.message);
      res.ststus(500).send("Internal server error")
    }
  }

  //delete category
  const deleteCategory = async(req,res)=>{
    try {
      const id = req.query.id;
    console.log("this id is being deleted", id);
    await category.findByIdAndDelete({ _id: id });
    res.redirect("/admin/category");
    } catch (error) {
      console.log(error.message);
    }
  }

  //listed
  const listCategory = async(req,res)=>{
    try {
      await category.findByIdAndUpdate(
        { _id: req.query.id },
        { $set: { is_Listed: 0 } }
      );
    
      res.redirect("/admin/category");
    } catch (error) {
      console.log(error.message);
    }
  }

  //unlisted
  const unlistCategory = async (req,res)=>{
    try {
      await category.findByIdAndUpdate(
        { _id: req.query.id },
        { $set: { is_Listed: 1 } }
      );
      res.redirect("/admin/category");
    } catch (error) {
      console.log(error.message);
    }
  }


  module.exports = {
    loadcategory,
    AddCategory,
    editCategory,
    editingcategory,
    deleteCategory,
    listCategory,
    unlistCategory
   
  }