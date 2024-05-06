const mongoose = require("mongoose");

const userFlashCardSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    category: { type: String, default: "Created By You" },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const UserFlashCard = mongoose.model(
  "UserDefinedFlashCard",
  userFlashCardSchema
);

module.exports = UserFlashCard;
