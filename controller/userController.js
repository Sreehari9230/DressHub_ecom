const User = require("../model/userModel");
const otpVerification = require("../model/otpVerification");
const bcrypt = require("bcrypt");
// const { TopologyDescription } = require("mongodb")
const nodemailer = require("nodemailer");
const { sendOtpVerificationMail } = require("../utils/sendOtp");

// LOAD HOME PAGE
const loadHome = async (req, res) => {
  try {
    res.render("user/home");
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
    // console.log("id",req.body)
    if (exitUser && exitUser.is_Verified) {
      const message = "Email already Registerd";
      res.render("user/Register", { message });
    } else if (exitUser && !exitUser.is_Verified) {
      const message =
        "Email already registerd but not varified. So send OTP to email and verify the email";
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
    console.log(req.session.email);
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
    console.log('jkdkljkjk');
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

    if ((expiresAt < Date, now())) {
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
      console.log(userData);
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

      // console.log("hell");

      res.json({ success: true });
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

// const verifyLogin = async (req,res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     // console.log("")

//     if(user) {
//       const passwordMatch = await bcrypt.compare(
//         req.body.password,
//         user.password
//       )

//       if(passwordMatch){
//         if(user.is_Verified === 1) {
//           req.session.userId = user._id;
//           console.log(req.session.userId)
//             return res.redirect("/")
//         } else{
//           await user.deleteOne({ is_Verified:0 })
//           const message = "user not verified please verify your email "
//           return res.render("user/login", { message })
//         }
//       } else{
//         const message = 'paswword is incorrect'
//         return res.render("user/login", {message})
//       }
//     }
//     else{
//       const mesage = "register your email";
//       return res.render('user/login', { message })
//     }
//     }
//     catch(error){
//       console.log(error.message);
//       res.status(500).end("internal server error")
//     }
//   }

//   //home page after login

//   const afterlogin = async (req,res) => {
//     try{
//       res.render("user/home")
//     } catch(error){
//       console.log(error.message);
//     }
//   }






module.exports = {
  loadHome,
  loadRegister,
  securePassword,
  verifyRegister,
  getSentOtp,
  loadOtp,
  verifyOtp,
  resentOtp,
  loadLogin
  // verifyLogin
};











