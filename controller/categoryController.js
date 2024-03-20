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

  const loadAddCAtegory = async(req,res)=>{
    try {
      res.render('admin/addcategory',)
    } catch (error) {
      console.log(error);
    }
  }

  const AddCategory = async (req, res) => {
    try {
      console.log('inside add category controller');
  
      // Extracting category name and description from request body
      const name = req.body.categoryname.toUpperCase(); 
      const description = req.body.categorydescription.toUpperCase();
  
      // Fetching all existing categories
      const Categories = await category.find()
      
      // Checking if category with the same name already exists
      const Category = await category.findOne({ name: name });
  
      if (Category) {
        // If category exists, render the addcategory template with error message
        res.render("admin/addcategory", { Categories: Categories, message: "This category already exists" });
      } else {
        // If category does not exist, create a new category and save it
        const newData = new category({
          name: name,
          description: description,
        });
        const categoryData = await newData.save();
        
        // Redirect to category page after successfully adding category
        res.redirect("/admin/category");
      }
    } catch (error) {
      console.log(error);
      // Handling internal server error
      res.status(500).send("Internal Server Error");
    }
  };

  //edit category
  const editCategory = async(req,res)=>{
    try {
        const categoryId = req.query.id
        console.log('this is category id', categoryId);
        const Category = await category.findById(categoryId)
        console.log(Category);
        console.log('category', Category);
        res.render('admin/editcategory', {  Category})
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Errror in loading edit category")
    }
  }

  //CATEGORY EDITING
  const editingcategory = async(req,res)=>{
    try {
      console.log(req.body.categoryid, 'please onn varane');
      const id = req.body.categoryid
      const categoryId = req.query.id
      console.log(categoryId, 'nikkane ivdnn');
      const Category = await category.findById(categoryId)    
      const name = req.body.CategoryName.toUpperCase()
      console.log(name);  
      const description = req.body.CategoryDescription.toUpperCase()
      console.log(description);

      const existingCategory = await category.findOne( { name: name } )
      console.log(existingCategory,'there is a existing category');  
      
      console.log('before if case');
      if(existingCategory && existingCategory._id.toString() !== id){
        return res.render("admin/editcategory", {
          messages: { message: "This category already exists" },
          },
          { category: Category}
          );
      }
      console.log('aftervthe if case');

      const updatedCategory = await category.findByIdAndUpdate(
        id,
        { name:name, description: description},    
        { new: true}
      )
      console.log(updatedCategory);

      if (!updatedCategory) {
        return res.render("admin/editcategory", {
          messages: { message: "Category not found" },
        },
        { category: Category}
        );
      }
      console.log('after updated category before redirect');                                                                     

      res.redirect('/admin/category')
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error in editing category")
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
    loadAddCAtegory,
    AddCategory,
    editCategory,
    editingcategory,
    deleteCategory,
    listCategory,
    unlistCategory
   
  }