const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  category: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: Number, required: true },
  options: [{ type: String, required: true }],
  hint: { type: String },
  explanation: { type: String },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
