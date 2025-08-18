const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  occupation: String,
  location: String,
  about: String,
  skills: [String], 
  education: {
    degree: String,
    university: String,
    year: Number
  }
});

module.exports = mongoose.model("Profile", profileSchema);
