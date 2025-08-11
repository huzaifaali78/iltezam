const Organization = require("../models/organizationModel");
const sendOtpEmail = require("../utils/sendOtp");

const createOrganization = async (req, res) => {
  try {
    const {
      email,
      country,
      organizationName,
      organizationWebsite,
      organizationLicense,
      name,
      phone,
      position,
      contactEmail,
      goodGovernance,
      transparencyAndReporting,
      sustainableFunding,
      impactMeasurement,
      shortBio,
      organizationImage,
      organizationTags,
    } = req.body;

    const existing = await Organization.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Organization already exists with this email" });
    }


    const newOrg = new Organization({
      email,
      country,
      organizationName,
      organizationWebsite,
      organizationLicense,
      name,
      phone,
      position,
      contactEmail,
      goodGovernance,
      transparencyAndReporting,
      sustainableFunding,
      impactMeasurement,
      shortBio,
      organizationImage,
      organizationTags,
      // verificationCode: otp,
    });

    const saved = await newOrg.save();

    
    const message = `Your OTP has been successfully generated. Your verification code is: ${otp}`;
    await sendOtpEmail(email, message);

    res.status(201).json({
      message: "Organization created successfully. OTP sent to email.",
      organization: saved,
    });
  } catch (error) {
    console.error("Error creating organization:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  createOrganization,
  sendOtpEmail
};

