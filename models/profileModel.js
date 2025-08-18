const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  occupation: String,
  location: String,
  about: String,
  skills: [String], 
  education: {
    type: String,
  }
});

module.exports = mongoose.model("Profile", profileSchema);
