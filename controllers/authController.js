const User = require("../models/user");
const Profile = require("../models/profileModel");


const registerUser = async (req, res) => {
  const { fullName, email, lastName, designation, location, about, skills, education, password } = req.body;

  try {
    let existingUser = await User.findOne({ email});
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
      
  
     const newUser = new User({
      fullName,
      lastName,
      email,
      designation,
      location,
      about,
      skills,
      education,
      password,
    });

    await newUser.save();

    const newProfile = new Profile({
      userId: newUser._id,
      occupation : designation,
      firstName: fullName,
      lastName,
      email,
    });
    await newProfile.save();
    res.status(201).json({ message: "User registered successfully", newUser, });
  }
  catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
 

module.exports = { registerUser };
