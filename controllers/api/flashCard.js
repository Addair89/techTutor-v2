const FlashCard = require("../../models/flashCard");
const UserFlashCard = require("../../models/userDefinedFlashCard");

const add = async (req, res) => {
  try {
    const flashCard = await FlashCard.create({
      question: req.body.question._id,
      user: req.body.user._id,
    });
    res.status(201).json({ message: "Flash Card", flashCard });
  } catch (error) {
    console.error("error adding flashCard: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addUserCard = async (req, res) => {
  try {
    const userFlashCard = await UserFlashCard.create({
      question: req.body.question,
      answer: req.body.answer,
      user: req.body.user._id,
    });
    res.status(201).json({ message: "User Flash Card", userFlashCard });
  } catch (error) {
    console.error("error adding userFlashCard: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAll = async (req, res) => {
  console.log("RUNNNNNINGNGNGNGNGN");
  try {
    const flashCards = await FlashCard.find({ user: req.params.userId });
    res.status(200).json(flashCards);
    return flashCards;
  } catch (error) {
    console.log("ERROR GETTING FLASH CARDS", error);
  }
};

const deleteOne = async (req, res) => {
  try {
    const flashCard = await FlashCard.deleteOne({
      question: req.params.question,
      user: req.params.user,
    });
    res
      .status(200)
      .json({ message: "FlashCard Deleted successfully", flashCard });
  } catch (error) {
    console.log("ERROR GETTING FLASH CARDS", error);
  }
};

module.exports = {
  add,
  addUserCard,
  getAll,
  deleteOne,
};
