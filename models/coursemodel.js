const mongoose = require("mongoose");
const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctOption: { type: String, required: true },
 
});

const chapterSchema = new mongoose.Schema({
    media: { type: String, required: true },
    chapterTitle: { type: String, required: true },
    description: { type: String, required: true },
    quiz: {
         _id: mongoose.Schema.Types.ObjectId,
        type: [quizSchema], required: true }
}); 

const topicSchema = new mongoose.Schema({
    topicTitle: { type: String, required: true },
    numberOfChapters: { type: Number, required: true },
    chapters: {
         _id: mongoose.Schema.Types.ObjectId,
         type: [chapterSchema], required: true }
});

const courseSchema = new mongoose.Schema({
    thumbnail: { type: String },
    courseName: { type: String },
    language: { type: String },
    whatLearn: { type: [String] },
    topics: {
        _id: mongoose.Schema.Types.ObjectId,
        type: [topicSchema] },
    status: { 
        type: String, 
        enum: ["active", "close",], 
        default: "active" 
    },
    tags: { type: [String] }
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
