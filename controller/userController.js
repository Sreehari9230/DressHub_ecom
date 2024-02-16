const User = require("../model/userModel");
const otpVerification = require("../model/otpVerification");
const bcrypt = require("bcrypt");
// const { TopologyDescription } = require("mongodb")
const nodemailer = require("nodemailer");
const { sendOtpVerificationMail } = require("../utils/sendOtp");

const loadHome = async (req, res) => {
  try {
    res.render("user/home"); 
  } catch (error) {
    console.log(error.message);
  }
};

const loadLogin = async (req, res) => {
  try {
    res.render("user/login");
  } catch (error) {
    console.log(error.messsage);
  }
};

// -------------REGESTER PAGE-------------
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

//-----------VERIFY  REGISTRATION-----------
const varifyRegister = async (req, res) => {
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

//load otp---------
const loadOtp = async (req, res) => {
  try {
    const email = req.query.email;
    res.render("user/verifyotp", { email: email });
  } catch (error) {
    console.log(error.message);
  }
};

//import the send otp from utils
const getSentOtp = async (req, res) => {
  try {
    await sendOtpVerificationMail({ email: req.session.email }, res);
  } catch (error) {
    console.log(error.message);
  }
};

///verifyOtp-----------
const verifyOtp = async (req, res) => {
  try {
    const email = req.query.email;
    const enteredOtp =
      req.body.one + req.body.two + req.body.three + req.body.four;

    const OtpRecord = await otpVerification.findOne({ email: email });

    if (!OtpRecord) {
      return res.render("user/verifyotp", {
        message: "OTP not found",
        email,
      });
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

    if (validOTP) {
      const userData = await User.findOne({ email: email });
      await User.findByIdAndUpdate({ _id: userData._id }, { is_Verified: 1 });
      req.session.userId = userData._id;

      await otpVerification.deleteOne({ email: email });
      //JSON RESPONSE FOR SUCCESSFL OTP VERIFICATION
      res.json({ success: true });
    } else {
      //JSON RESPONSE FORINVALID OTP
      res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.log(error.message);
    //JSON RESPONSE FOR INTERNAL SERVER ERROR
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

module.exports = {
  loadHome,
  loadLogin,
  loadRegister,
  varifyRegister,
  loadOtp,
  getSentOtp,
  verifyOtp,
};
