const User = require("../models/user");
const Profile = require("../models/profileModel");

const registerUser = async (req, res) => {
  const { fullName, lastName, occupation, location, about, skills, education } = req.body;

  try {
    let existingUser = await User.findOne({ fullName, lastName });

    if (existingUser) {
    
      existingUser.occupation = occupation || existingUser.occupation;
      existingUser.location = location || existingUser.location;
      existingUser.about = about || existingUser.about;
      existingUser.skills = skills || existingUser.skills;
      existingUser.education = education || existingUser.education;

      await existingUser.save();

     
      let existingProfile = await Profile.findOne({ userId: existingUser._id });

      if (existingProfile) {
        existingProfile.occupation = occupation || existingProfile.occupation;
        existingProfile.location = location || existingProfile.location;
        existingProfile.about = about || existingProfile.about;
        existingProfile.skills = skills || existingProfile.skills;
        existingProfile.education = education || existingProfile.education;

        await existingProfile.save();
      } else {
       
        const newProfile = new Profile({
          userId: existingUser._id,
          occupation,
          location,
          about,
          skills,
          education,
        });
        await newProfile.save();
      }

      return res.status(200).json({
        message: "User and Profile updated successfully",
        user: existingUser,
      });
    }

    
    const newUser = new User({
      fullName,
      lastName,
      occupation,
      location,
      about,
      skills,
      education,
    });

    await newUser.save();

    
    const newProfile = new Profile({
      userId: newUser._id,
      occupation,
      location,
      about,
      skills,
      education,
    });

    await newProfile.save();

    res.status(201).json({
      message: "User and Profile registered successfully",
      user: newUser,
      profile: newProfile,
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser };
