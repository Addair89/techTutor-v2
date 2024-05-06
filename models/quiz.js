const mongoose = require("mongoose");
const Question = require("./question");

const quizSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    score: { type: Number },
    length: { type: Number },
    questions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
    ],
    answers: { type: Object },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
