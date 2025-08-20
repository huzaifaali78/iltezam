const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  occupation: String,
  location: String,
  about: String,
  skills: [String],
  education: String,

  followers: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
      status: { type: String, enum: ["pending", "active"], default: "pending" }
    }
  ],
  following: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
      status: { type: String, enum: ["pending", "active"], default: "pending" }
    }
  ]
});

module.exports = mongoose.model("Profile", profileSchema);

