const User = require("../models/user");
const jwt = require("jsonwebtoken");
const sendOtpEmail = require("../utils/sendOtp");

const registerUser = async (req, res) => {
  const { fullname, designation, email, password, organizationname, role } =
    req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    if (role !== "individual" && role !== "organization") {
      return res.status(400).json({
        message: 'Invalid user type. Must be "individual" or "organization"',
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new User({
      fullName: fullname,
      designation: designation || null,
      email,
      password,
      organizationName: organizationname || null,
      role,
      verificationCode: otp,
    });

    await newUser.save();

    await sendOtpEmail(email, otp);

    res.status(201).json({
      message: "User Registered Successfully. OTP sent to email.",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
      token: token,
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, sendOtpEmail };
