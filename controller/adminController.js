const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const Order = require('../model/orderModel')

//LOAD LOGIN PAGE

const adminLogin = async (req, res) => {
  try {
    console.log("1");
    res.render("admin/adminlogin");
  } catch (error) {
    console.log(error.message);
  }
};

const verifyadminlogin = async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.body.email });
    console.log(userData);
    if (userData && userData.is_Admin === 1) {
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (passwordMatch) {
        req.session.admin_id = userData._id;
        console.log("enthero entho", req.session.admin_id);
        console.log("2");
        res.redirect("dashboard");
      } else {
        const message = "password or email is incorrect";
        res.render("admin/adminlogin", { message });
      }
    } else {
      const message = "password or email is incorrect";
      res.render("admin/adminlogin", { message });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadDashboard = async (req, res) => {
  try {
    console.log("3");
    res.render("admin/dashboard");
  } catch (error) {
    console.log(error.message);
  }
};

const adminlogout = async (req, res) => {
  try {
    console.log("4");
    req.session.destroy();
    console.log("5");
    res.redirect("/admin");
  } catch (error) {
    console.log(error.message);
  }
};

const LoadUserManagement = async (req, res) => {
  try {
    let search = ''; // Initialize search variable

    // Check if search query is present in the request
    if (req.query.search) {
      search = req.query.search; // Assign search query to the search variable
    }

    // Pagination logic
    let page = 1;
    if (req.query.page) {
      page = req.query.page;
    }
    const limit = 10;

    // Fetching users from database based on search query
    const Users = await User.find({
      is_Admin: 0,
      $or: [
        { name: { $regex: '.*' + search + '.*', $options: 'i' } },
        { email: { $regex: '.*' + search + '.*', $options: 'i' } },
        { mobile: { $regex: '.*' + search + '.*', $options: 'i' } }
      ]
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Count total number of users based on search query for pagination
    const count = await User.find({
      is_Admin: 0,
      $or: [
        { name: { $regex: '.*' + search + '.*', $options: 'i' } },
        { email: { $regex: '.*' + search + '.*', $options: 'i' } },
        { mobile: { $regex: '.*' + search + '.*', $options: 'i' } }
      ]
    }).countDocuments();

    res.render("admin/usermanagement", {
      Users: Users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      search: search // Pass the search query to the template
    });
  } catch (error) {
    console.log(error.message);
  }
};

const blockUser = async (req, res) => {
  try {
    const userId = req.query.id;
    const actionType = req.query.action;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    const isBlocked = user.is_Blocked === 1;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { is_Blocked: actionType == 1 ? 0 : 1 } },
      { new: true }
    );

    if (updatedUser) {
      res.redirect("/admin/usermanagement");
    } else {
      res.status(500).send("Failed to update user");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const adminOrderlist = async(req,res)=>{
  try {
    const Orders = await Order.find().sort({Date:-1});
    res.render('admin/orderlist',{Orders})
  } catch (error) {
    console.log(error);
  }
}

const orderstatus = async(req,res)=>{
  try {
    const id = req.query

    const orders = await Order.findById({_id:id});

    if(orders.status === 'placed'){
      await Order.findByIdAndUpdate(
        {_id:id},
        {$set:{status:'pending'}},
      )
      res.redirecy("/admin/orders")
    }

    if(orders.status == 'pending'){
      await Order.findByIdAndUpdate(
        {_id:id},
        {$set:{status:'placed'}}
      )
      res.redirect("/admin/orders")
    }else{
      res.redirect("/admin/orders")
    }
  } catch (error) {
    console.log(error);
  }
}

const ordercancel = async(req,res)=>{
  try {
    const id = req.query.id;
    const orders = await Order.findById({_id:id})

    if(orders){
      await Order.findByIdAndUpdate(
        {_id:id},
        {$set:{status:'cancelled'}}
      )
    }
    res.redirect('/admin/orders')
  } catch (error) {
    console.log(error);
  }
}

const orderdelivered = async(req,res)=>{
  try {
    const id = req.query.id;
    const orders = await Order.findById({_id:id})

    if(orders.status == 'placed'){
      await Order.findByIdAndUpdate(
        {_id:id},
        {$set:{status:'delivered'}}
      )
    }
    if(orders.status == 'waiting for approval'){
      await Order.findByIdAndUpdate(
        {_id:id},
        {$set:{status:'Return Approved'}}
      )
      res.redirect('/admin/orders')
    }else{
      res.redirect('/admin/orders')
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  adminLogin,
  verifyadminlogin,
  loadDashboard,
  adminlogout,
  LoadUserManagement,
  blockUser,
  adminOrderlist,
  orderstatus,
  ordercancel,
  orderdelivered

};
