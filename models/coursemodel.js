const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
    media: { type: String, required: true },
    chapterTitle: { type: String, required: true },
    description: { type: String, required: true },
    quiz: { type: [String], required: true }
}, { _id: false });

const topicSchema = new mongoose.Schema({
    topicTitle: { type: String,required: true },
    numberOfChapters: { type: Number,required: true },
    chapters: { type: [chapterSchema],  required: true      }
}, { _id: false });
const courseSchema = new mongoose.Schema({
    thumbnail: { type: String, },
    courseName: { type: String,  },
    language: { type: String,  },
    whatLearn: { type: [String],  },
    topics: { type: [topicSchema],  },
    status: { type: String, enum: ["close", "live"], default: "live" },
    tags: { type: [String], }
}, { timestamps: true });



module.exports = mongoose.model("Course", courseSchema);
