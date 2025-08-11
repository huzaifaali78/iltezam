const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      required: true,
    },
    organizationName: {
      type: String,
      required: true,
    },
    organizationWebsite: {
      type: String,
    },
    organizationLicense: {
      type: String,
    },

    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    position: {
      type: String,
    },

    goodGovernance: {
      type: Boolean,
    },
    transparencyAndReporting: {
      type: Boolean,
    },
    sustainableFunding: {
      type: Boolean,
    },
    impactMeasurement: {
      type: String,
    },

    shortBio: {
      type: String,
    },
    organizationImage: {
      type: String,
    },
    organizationTags: [{ type: String }],

  },
  
  { timestamps: true }
);

module.exports = mongoose.model("Organization", organizationSchema);
