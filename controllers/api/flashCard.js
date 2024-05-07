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

const getUserCards = async (req, res) => {
  try {
    const cards = await UserFlashCard.find({ user: req.params.userId });
    res.status(200).json(cards);
  } catch (error) {
    console.log("ERROR GETTING FLASH CARDS", error);
  }
};

const deleteOneUserCard = async (req, res) => {
  try {
    const userCard = await UserFlashCard.deleteOne({ _id: req.params.cardId });
    res
      .status(200)
      .json({ message: "FlashCard Deleted successfully", userCard });
  } catch (error) {
    console.log("ERROR GETTING USERFLASH CARDS", error);
  }
};

const updateUserCard = async (req, res) => {
  const { cardId, question, answer } = req.body;
  console.log(cardId, question, answer);
  try {
    const userCard = await UserFlashCard.updateOne(
      { _id: cardId },
      { $set: { question: question, answer: answer } }
    );
    console.log(userCard);
    res
      .status(200)
      .json({ message: "User card updated successfully", userCard });
  } catch (error) {
    console.error("Error updating user card:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  add,
  addUserCard,
  getAll,
  deleteOne,
  getUserCards,
  deleteOneUserCard,
  updateUserCard,
};
