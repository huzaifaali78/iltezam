const mongoose = require("mongoose");

// Contribution Schema
const contributionSchema = new mongoose.Schema(
  {
    donation: [
      {
        applicantName: String,
        applicantEmail: String,
        amount: Number,
        status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
        date: { type: Date, default: Date.now },
      },
    ],
    volunteer: [
      {
        applicantName: String,
        applicantEmail: String,
        positionApplied: String,
        status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { _id: false }
);

// Project Schema
const projectSchema = new mongoose.Schema(
  {
    projectImage: [{ type: String }],
    thumnailImage: { type: String },
    projectName: { type: String },
    fundraisingGoal: { type: Number },
    location: { type: String },
    startDate: { type: Date },
    finishDate: { type: Date },
    about: { type: String },
    projectCategory: { type: String, enum: ["donation", "volunteer"] },
    status: { type: String, enum: ["active", "close"], default: "active" },
    position: [
      {
        positionName: { type: String },
        volunteerNeed: { type: String },
        aboutPosition: { type: String },
      },
    ],
    contributions: [contributionSchema],
  },
  { timestamps: true }
);

// Course Schema
const courseSchema = new mongoose.Schema(
  {
    allCourses: [
      {
        courseId: mongoose.Schema.Types.ObjectId,
        courseName: String,
        description: String,
        progress: { type: Number, default: 0 },
      },
    ],
    inProgress: [
      {
        courseId: mongoose.Schema.Types.ObjectId,
        courseName: String,
        progress: Number,
      },
    ],
    completed: [
      {
        courseId: mongoose.Schema.Types.ObjectId,
        courseName: String,
        completedAt: Date,
      },
    ],
    saved: [
      {
        courseId: mongoose.Schema.Types.ObjectId,
        courseName: String,
        savedAt: Date,
      },
    ],
  },
  { _id: false }
);

// Certification Schema
const certificationSchema = new mongoose.Schema(
  {
    certificates: [
      {
        certificateUrl: { type: String, required: true },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { _id: false }
);

// My Account Schema
const myAccountSchema = new mongoose.Schema(
  {
    accountAccess: {
      email: { type: String, required: true },
      phone: { type: String },
      password: { type: String, required: true },
      twoFactorEnabled: { type: Boolean, default: false },
      lastLogin: { type: Date },
    },
    paymentMethod: {
      cardType: { type: String },
      cardLast4: { type: String },
      cardExpiry: { type: String },
      upiId: { type: String },
      paypalEmail: { type: String },
    },
    accountManagement: {
      isActive: { type: Boolean, default: true },
      isDeleted: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
  },
  { _id: false }
);

// Setting Schema
const settingSchema = new mongoose.Schema(
  {
    notification: {
      preferences: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
        push: { type: Boolean, default: false },
      },
    },
    accessibility: {
      language: { type: String, default: "en" },
      appearance: { type: String, enum: ["light", "dark"], default: "light" },
    },
    helpCenter: {
      contactSupport: { type: String },
    },
    others: {
      privacyPolicy: { type: String },
      termsAndCondition: { type: String },
    },
  },
  { _id: false }
);


const dashboardSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    contribution: contributionSchema,
    courses: courseSchema,
    certification: certificationSchema,
    myAccount: myAccountSchema,
    setting: settingSchema,
  },
  { timestamps: true }
);


module.exports = {
  Project: mongoose.model("Project", projectSchema),
  Dashboard: mongoose.model("Dashboard", dashboardSchema),
};