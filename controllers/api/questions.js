const Question = require("../../models/question");

const allCategories = async (req, res) => {
  try {
    const categories = await Question.distinct("category");
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const catDifficulties = async (req, res) => {
  try {
    const { cat } = req.params;
    const difficulties = await Question.find({ category: cat }).distinct(
      "difficulty"
    );
    res.json(difficulties);
  } catch (error) {
    console.error("Error fetching difficulties:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getQuestions = async (req, res) => {
  const { cat, diff } = req.params;
  try {
    // Aggregate pipeline to match questions based on category and difficulty
    const pipeline = [
      { $match: { category: cat, difficulty: diff } }, // Match documents with specified category and difficulty
      { $sample: { size: 5 } }, // Randomly sample 5 documents
    ];

    // Execute the aggregation pipeline
    const questions = await Question.aggregate(pipeline);
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const questionDetails = async (req, res) => {
  try {
    console.log("Requested question ID:", req.params.questionId);
    const question = await Question.findById(req.params.questionId);
    console.log("Found question:", question);

    if (question) {
      res.status(200).json(question);
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  } catch (error) {
    console.error("ERROR GETTING QUESTION DETAILS", error);
    res.status(500).json({ message: "Error fetching question details" });
  }
};

module.exports = {
  allCategories,
  catDifficulties,
  getQuestions,
  questionDetails,
};
