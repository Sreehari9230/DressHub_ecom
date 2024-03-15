const User = require("../model/userModel");
const products = require("../model/productModel");
const category = require("../model/categoryModel");
const otpVerification = require("../model/otpVerification");
const bcrypt = require("bcrypt");
// const { TopologyDescription } = require("mongodb")
const nodemailer = require("nodemailer");
const { sendOtpVerificationMail } = require("../utils/sendOtp");
const randomstring = require("randomstring");

// LOAD HOME PAGE
const loadHome = async (req, res) => {
  try {
    const userIn = req.session.userId;

    res.render("user/home", { userIn, user: req.session.userId });
  } catch (error) {
    console.log(error.message);
  }
};

// //LOAD LOGIN
// const loadLogin = async (req, res) => {
//   try {
//     res.render("user/login");
//   } catch (error) {
//     console.log(error.messsage);
//   }
// };

//LOAD REGISTER PAGE
const loadRegister = async (req, res) => {
  try {
    res.render("user/register");
  } catch (error) {
    console.log(error.messsage);
  }
};

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

//REGISTRATION VERIFICATION
const verifyRegister = async (req, res) => {
  try {
    const exitUser = await User.findOne({ email: req.body.email });
    let message = "";
    console.log(exitUser);
    console.log("id",req.body)
    if (exitUser && exitUser.is_Verified) {
      const message = "Email already Registerd";
      console.log("Message:", message); // Debugging statement
      res.render("user/Register", { message });
    } else if (exitUser && !exitUser.is_Verified) {
      const message =
        "Email already registerd but not varified. So send OTP to email and verify the email";
      // console.log("Message:", message);
      res.render("user/Register", { message });
    } else {
      const bodypassword = req.body.password;
      const confirmPassword = req.body.confirmPassword;
      const bodyemail = req.body.email;
      const spassword = await securePassword(bodypassword);
      // const cpassword = await securePassword(confirmPassword)
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: spassword,
        confirmPassword: confirmPassword,
        is_Admin: 0,
      });

      console.log(user);
      if (bodypassword !== confirmPassword) {
        return res.render("user/register", {
          message: "password do not match",
        });
      }

      const userData = await user.save();
      //if the emailin body eqals to the emailin session varify otp page should come
      req.session.email = req.body.email;
      await sendOtpVerificationMail(userData, res);
    }
  } catch (error) {
    console.log(error.message);
  }
};

//SENT OTP IMPORTED FROM UTILS
const getSentOtp = async (req, res) => {
  try {
    console.log(req.session.email, "this is email");
    await sendOtpVerificationMail({ email: req.session.email }, res);
  } catch (error) {
    console.log(error.message);
  }
};

//LOAD OTP PAGE
const loadOtp = async (req, res) => {
  try {
    // console.log("hello");
    const email = req.query.email;
    // console.log("the email query be ", email);
    res.render("user/verifyotp", { email: email });
  } catch (error) {
    console.log("Error loading OTP page:", error.message);
  }
};

///OTP VERIFICATION
const verifyOtp = async (req, res) => {
  try {
    console.log("hii", req.body);
    console.log("jkdkljkjk");
    const email = req.body.email;
    // console.log(email)
    const enteredOtp =
      req.body.one + req.body.two + req.body.three + req.body.four;

    const OtpRecord = await otpVerification.findOne({ email: email });
    console.log(OtpRecord);

    if (!OtpRecord) {
      return res.render("user/verifyotp", { message: `OTP not found`, email });
    }

    const expiresAt = OtpRecord.expiresAt;

    if (expiresAt < Date.now()) {
      return res.render("user/verifyotp", {
        message: "otp expired",
        email,
      });
    }

    const { otp: hashedOTP } = OtpRecord;
    const validOTP = await bcrypt.compare(enteredOtp, hashedOTP);
    console.log(validOTP);
    if (validOTP) {
      const userData = await User.findOne({ email: email });
      // console.log(userData);
      if (!userData) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }

      await User.findByIdAndUpdate(
        { _id: userData._id },
        { is_Verified: true }
      );
      req.session.userId = userData._id;

      await otpVerification.deleteOne({ email: email });

      console.log("hello");

      res.json({ success: true });
      // res.redirect('user/login')
    } else {
      //JSON RESPONSE FORINVALID OTP
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.log("error in otp verification", error.message);
    //JSON RESPONSE FOR INTERNAL SERVER ERROR
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};
// // //RESENT OTP
const resentOtp = async (req, res) => {
  try {
    console.log(req.body);
    const email = req.body.email;
    const userData = await User.findOne({ email: email });
    await sendOtpVerificationMail(userData, res);
    return res.json({ success: true });
  } catch (error) {
    console.log(error.message);
  }
};

// // //LOAD LOGIN
const loadLogin = async (req, res) => {
  try {
    res.render("user/login");
  } catch (error) {
    console.log(error.messsage);
  }
};

// //VERIFY LOGIN

const verifyLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(req.body.email);

    if (user) {
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      console.log(req.body.password);
      if (passwordMatch) {
        if (user.is_Verified === 1) {
          req.session.userId = user._id;
          console.log(req.session.userId);
          return res.redirect("/");
        } else {
          await user.deleteOne({ is_Verified: 0 });
          const message = "user not verified please verify your email ";
          return res.render("user/login", { message });
        }
      } else {
        const message = "paswword is incorrect";
        return res.render("user/login", { message });
      }
    } else {
      const message = "email and passwird is incorrect";
      return res.render("user/login", { message });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).end("internal server error");
  }
};

const userlogout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/userlogin");
  } catch (error) {
    console.log(error.message);
  }
};

//   //home page after login

const afterlogin = async (req, res) => {
  try {
    res.render("user/home");
  } catch (error) {
    console.log(error.message);
  }
};

//LOAD PASSWORD

const loadforgotpassword = async (req, res) => {
  try {
    res.render("user/forgotpassword");
  } catch (error) {
    console.log(error.messsage);
  }
};

//VERIFY PASSWORD
const forgetPasswordverify = async (req, res) => {
  try {
    const email = req.body.email;
    const userDetails = await User.findOne({ email: email });
    if (userDetails) {
      if (userDetails.is_Verified === 0) {
        res.render("user/forgotpassword", {
          message: "Please verify your email",
        });
      } else {
        const randomString = randomstring.generate();

        const updatedData = await User.updateOne(
          { email: email },
          { $set: { token: randomString } }
        );
        if (updatedData) {
          console.log("hello");
        }
        sendResetPasswordEmail(
          userDetails.name,
          userDetails.email,
          randomString
        );
        res.render("user/forgotpassword", {
          message: "please check your mail to reset your password",
        });
      }
    } else {
      res.render("user/forgotpassword", { message: "User email is incorrect" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

//for reset password sent mail
const sendResetPasswordEmail = async (name, email, token) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.Email_USERNAME,
        pass: process.env.Email_Password,
      },
    });

    const mailOptions = {
      from: process.env.Email_USERNAME,
      to: email,
      subject: "For Password Reset",
      html: `<p>Hello ${name}, please click <a href="http://127.0.0.1:3000/resetpassword?token=${token}">here</a> to reset your password.</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been sent:", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const loadResetPassword = async (req, res) => {
  try {
    const token = req.query.token;
    console.log(token);
    const tokenData = await User.findOne({ token: token });
    console.log(tokenData);
    if (tokenData) {
      res.render("user/resetpassword", { message: "", tokenData: tokenData });
    } else {
      res.redirect("/error404");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const verifyResetPassword = async (req, res) => {
  try {
    const password = req.body.password;
    const confirm_Password = req.body.confirmpassword;
    const user_id = req.body.user_id;

    if (password === confirm_Password && user_id) {
      const secure_password = await securePassword(password);
      // const secure_confirm = await securePassword(confirm_Password)
      const updatedData = await User.findByIdAndUpdate(
        { _id: user_id },
        {
          $set: {
            password: secure_password,
            confirmPassword: confirm_Password,
            token: "",
          },
        }
      );
      console.log(updatedData);
      res.redirect("/userlogin");
    }
  } catch (error) {
    console.log(error.message);
  }
};

//load user dashboard

const userDashboard = async (req, res) => {
  try {
    console.log("id:", req.session.userId);
    const userData = await User.findById({ _id: req.session.userId });
    console.log("udata:", userData);
    res.render("user/myaccount", { user: userData });
    // , { user:userData } give it inside re.render
  } catch (error) {
    console.log(error.message);
  }
};

//load shop
const loadShop = async (req, res) => {
  try {
    let query = { is_Listed: true };
    const userIn = req.session.userId;
    if(req.query.category) {
      query.category = req.query.category
      console.log('lol', req.quer.category); 
    }
    const [product, categories] = await Promise.all([
      products.find(),
      category.find(),
    ]);

    res.render("user/shop", { product, categories, userIn });
  } catch (error) {
    console.log(error.message);
  }
};

const loadproductdeatils = async (req, res) => {
  try {
    const productId = req.query.id;
    const userIn = req.session.userId;
    console.log("this is product id", productId);
    const product = await products.findOne({ _id: productId });
    res.render("user/productdetails", { product: product, userIn });
  } catch (error) {
    console.log(error);
  }
};



module.exports = {
  loadHome,
  loadRegister,
  securePassword,
  verifyRegister,
  getSentOtp,
  loadOtp,
  verifyOtp,
  resentOtp,
  loadLogin,
  verifyLogin,
  afterlogin,
  loadforgotpassword,
  userDashboard,
  userlogout,
  forgetPasswordverify,
  sendResetPasswordEmail,
  loadResetPassword,
  verifyResetPassword,
  loadShop,
  loadproductdeatils,

};
