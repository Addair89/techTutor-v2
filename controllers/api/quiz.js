const Quiz = require("../../models/quiz");
const User = require("../../models/user");

const checkAndUpdateRank = async (user, score) => {
  let newRank;
  if (score >= 160) {
    newRank = "Code Wizard";
  } else if (score >= 150) {
    newRank = "Script Sorcerer";
  } else if (score >= 140) {
    newRank = "Programming Pioneer";
  } else if (score >= 130) {
    newRank = "Algorithm Archmage";
  } else if (score >= 120) {
    newRank = "Logic Maestro";
  } else if (score >= 110) {
    newRank = "Code Conjurer";
  } else if (score >= 100) {
    newRank = "Data Diviner";
  } else if (score >= 90) {
    newRank = "Master Developer";
  } else if (score >= 80) {
    newRank = "Programming Prodigy";
  } else if (score >= 70) {
    newRank = "Algorithmic Artisan";
  } else if (score >= 60) {
    newRank = "Code Craftsman";
  } else if (score >= 50) {
    newRank = "Logic Luminary";
  } else if (score >= 40) {
    newRank = "Syntax Sage";
  } else if (score >= 30) {
    newRank = "Algorithm Adept";
  } else if (score >= 20) {
    newRank = "Binary Apprentice";
  } else if (score >= 10) {
    newRank = "Script Squire";
  } else {
    newRank = "Coding Cadet";
  }

  try {
    await User.updateOne({ _id: user._id }, { $set: { rank: newRank } });
    console.log("UserRankUpdated");
  } catch (error) {
    console.error("Error updating user rank:", error);
  }
};

const save = async (req, res) => {
  try {
    const quiz = await Quiz.create({
      category: req.body.category,
      difficulty: req.body.difficulty,
      score: req.body.count,
      length: req.body.questions.length,
      questions: req.body.questions,
      answers: req.body.answers,
      user: req.body.user._id,
    });
    await User.findByIdAndUpdate(req.body.user._id, {
      $push: { quizHistory: quiz._id },
    });
    await User.findByIdAndUpdate(req.body.user._id, {
      $inc: { score: req.body.count },
    });
    const user = await User.findById(req.body.user._id);
    const score = user.score;
    await checkAndUpdateRank(user, score);
    res.status(201).json({ message: "Quiz saved successfully", quiz });
  } catch (error) {
    console.error("error saving quiz: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  save,
};
