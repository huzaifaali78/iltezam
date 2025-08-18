const Profile = require("../models/profileModel");

//   try {
//     const { firstName, lastName, occupation, location, about, skills, education } = req.body;


//     let profile = await Profile.findOne({ firstName, lastName });

//     if (!profile) {
    
//       profile = new Profile({
//         firstName,
//         lastName,
//         occupation,
//         location,
//         about,
//         skills,
//         education
//       });
//       await profile.save();
//       return res.status(201).json({ message: "New profile created", profile });
//     }


//     res.json({ message: "Profile already exists", profile });

//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };



const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = {
    getProfiles,
    updateProfile,
    
};
