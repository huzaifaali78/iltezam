const User = require("../models/user");
const Profile = require("../models/profileModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { fullName, email, lastName, designation, location, about, skills, education, password } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      lastName,
      email,
      designation,
      location,
      about,
      skills,
      education,
      password: hashPassword,
    });

    await newUser.save();

    const newProfile = new Profile({
      userId: newUser._id,
      occupation: designation,
      firstName: fullName, // consider splitting fullName into first/last
      lastName,
      email,
    });
    await newProfile.save();

    const { password: _, ...userWithoutPassword } = newUser.toObject();

    res.status(201).json({ message: "User registered successfully", user: userWithoutPassword });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json({ message: "Login successful", user: userWithoutPassword, token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerUser, loginUser };
