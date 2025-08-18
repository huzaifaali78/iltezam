const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,

    },
    fullName: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
    },
    CNIC: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    organizationName: {
      type: String,
    },
    registrationNumber: {
      type: String,
    },
    organizationType: {
      type: String,
    },
    contactPerson: {
      type: String,
    },
    Address: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["individual", "organization"],
    },
 
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
