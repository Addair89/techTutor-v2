import React, { useEffect, useState } from "react";
import Card from "../../components/FlashCard/Card";
import {
  getFlashCards,
  addUserDefinedCard,
  getUserDefinedCards,
  removeUserCard,
  updateUserCard,
  removeFlashCard,
} from "../../utilities/flashCard-api";
import { getQuestionAndAnswer } from "../../utilities/questions-api";

const FlashCard = ({ user }) => {
  const [flashCards, setFlashCards] = useState([]);
  const [questionAndAnswer, setQuestionAndAnswer] = useState([]);
  const [showFronts, setShowFronts] = useState([]);
  const [showUserFronts, setShowUserFronts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [flashCardAnswer, setFlashCardAnswer] = useState("");
  const [flashCardQuestion, setFlashCardQuestion] = useState("");
  const [userFlashCards, setUserFlashCards] = useState([]);
  const [editCardId, setEditCardId] = useState(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cards = await getFlashCards(user._id);
        console.log("Flash Cards:", cards);
        setFlashCards(cards);
        setShowFronts(Array(cards.length).fill(true));
        const userCards = await getUserDefinedCards(user._id);
        console.log(userCards);
        setUserFlashCards(userCards);
        setShowUserFronts(Array(userCards.length).fill(true));

        if (cards.length > 0) {
          // Fetch question and answer for each flash card using the question ID
          const questionsAndAnswers = await Promise.all(
            cards.map((card) =>
              getQuestionAndAnswer(card.question).catch((error) => {
                console.error(
                  "Error fetching Q&A for question ID:",
                  card.question,
                  error
                );
                return null; // Return null or a default value for this card's Q&A
              })
            )
          );
          console.log("Questions and Answers:", questionsAndAnswers);
          setQuestionAndAnswer(questionsAndAnswers.filter((qa) => qa !== null));
        } else {
          console.log("No flash cards to fetch Q&A for.");
        }
      } catch (error) {
        console.error("Error fetching flash cards:", error);
      }
    };

    fetchCards();
  }, [user]);

  console.log(userFlashCards);

  const toggleCardSide = (index) => {
    console.log("Toggling card side for index:", index);
    setShowFronts((prev) => {
      const newShowFronts = [...prev];
      newShowFronts[index] = !newShowFronts[index];
      return newShowFronts;
    });
  };

  const toggleUserCardSide = (index) => {
    console.log("Toggling card side for index:", index);
    setShowUserFronts((prev) => {
      const newShowFronts = [...prev];
      newShowFronts[index] = !newShowFronts[index];
      return newShowFronts;
    });
  };

  const handleAddFlashCard = async () => {
    try {
      const response = await addUserDefinedCard(
        flashCardQuestion,
        flashCardAnswer,
        user
      );
      console.log(response);
      setUserFlashCards((prevUserFlashCards) => [
        ...prevUserFlashCards,
        response.userFlashCard,
      ]);
      setFlashCardAnswer("");
      setFlashCardQuestion("");
      setShowForm(false);
    } catch (error) {}
  };

  const handleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleUserDelete = async (cardId) => {
    setUserFlashCards((prevCards) =>
      prevCards.filter((card) => card._id !== cardId)
    );
    await removeUserCard(cardId);
  };

  const handleEditFlashCard = async () => {
    try {
      const response = await updateUserCard(
        editCardId,
        editQuestion,
        editAnswer
      );
      console.log("Updated card:", response);
      // Update the local state to reflect the changes
      setUserFlashCards((prevUserFlashCards) =>
        prevUserFlashCards.map((card) =>
          card._id === editCardId
            ? { ...card, question: editQuestion, answer: editAnswer }
            : card
        )
      );
      // Reset edit form
      setEditCardId(null);
      setEditQuestion("");
      setEditAnswer("");
      setShowEditForm(false);
    } catch (error) {
      console.error("Error updating flash card:", error);
    }
  };

  const handleShowEditForm = (card) => {
    setEditCardId(card._id);
    setEditQuestion(card.question);
    setEditAnswer(card.answer);
    setShowEditForm((prev) => !prev);
  };

  const handleCardDelete = async (card, user) => {
    try {
      const response = await removeFlashCard(card, user);
      setQuestionAndAnswer((prev) =>
        prev.filter((flashCard) => flashCard._id !== card._id)
      );
    } catch (error) {
      console.log(error, "error deleting flash card");
    }
  };

  return (
    <div className="realtive min-h-screen mt-[10rem] md:mt-0 flex flex-col justify-center items-center">
      <button
        className="text-[2.5vmin] fixed top-9 z-[999]  p-4 bg-[#7400B8] rounded-full text-white hover:bg-[#48BFE3] hover:text-[#7400B8] transition-all duration-300 ease-in-out"
        onClick={handleShowForm}
      >
        Add Flash Card?
      </button>
      {showForm ? (
        <div className="absolute z-[9999999] top-0 w-full h-full bg-black/40 backdrop-blur-lg flex justify-center items-center pt-[10rem] md:pt-0 ">
          <div className="relative flex flex-col bg-gradient-to-t  from-[#64acd3b9] to-[#7500b8b6] self-start md:self-center rounded-2xl w-[400px] md:w-[500px] p-20 items-center justify-center gap-10 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.5)]">
            <p
              onClick={handleShowForm}
              className="absolute top-5 right-5 text-[3.5vmin] text-black"
            >
              X
            </p>
            <h3 className="text-white text-[3.5vmin]">Flash Card</h3>
            <input
              required
              className="text-white w-[100%] placeholder:text-black p-2 rounded-md bg-white/60 focus:bg-black/60 focus:text-white focus:placeholder:text-white focus:outline-none"
              type="text"
              placeholder="Question..."
              value={flashCardQuestion}
              onChange={(evt) => setFlashCardQuestion(evt.target.value)}
            />
            <input
              required
              className="text-white w-[100%] placeholder:text-black p-2 rounded-md bg-white/60 focus:bg-black/60 focus:text-white focus:placeholder:text-white focus:outline-none"
              type="text"
              placeholder="Answer..."
              value={flashCardAnswer}
              onChange={(evt) => setFlashCardAnswer(evt.target.value)}
            />
            <button
              className="text-[2.5vmin] p-4 w-[50%] bg-white rounded-full text-black hover:bg-[#48BFE3] hover:text-[#7400B8] transition-all duration-300 ease-in-out"
              onClick={handleAddFlashCard}
            >
              Add
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {showEditForm ? (
        <div className="absolute z-[9999999] top-0 w-full h-full bg-black/40 backdrop-blur-lg flex justify-center items-center pt-[10rem] md:pt-0 ">
          <div className="relative flex flex-col bg-gradient-to-t  from-[#64acd3b9] to-[#7500b8b6] self-start md:self-center rounded-2xl w-[400px] md:w-[500px] p-20 items-center justify-center gap-10 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.5)]">
            <p
              onClick={handleShowEditForm}
              className="absolute top-5 right-5 text-[3.5vmin] text-black"
            >
              X
            </p>
            <h3 className="text-white text-[3.5vmin]">Edit Flash Card</h3>
            <input
              required
              className="text-white w-[100%] placeholder:text-white p-2 rounded-md focus:bg-white/60 focus:text-black focus:placeholder:text-black focus:outline-none"
              type="text"
              placeholder="Question..."
              value={editQuestion}
              onChange={(evt) => setEditQuestion(evt.target.value)}
            />
            <input
              required
              className="text-white w-[100%] placeholder:text-white p-2 rounded-md focus:bg-white/60 focus:text-black focus:placeholder:text-black focus:outline-none"
              type="text"
              placeholder="Answer..."
              value={editAnswer}
              onChange={(evt) => setEditAnswer(evt.target.value)}
            />
            <button
              className="text-[2.5vmin] p-4 w-[50%] bg-white rounded-full text-black hover:bg-[#48BFE3] hover:text-[#7400B8] transition-all duration-300 ease-in-out"
              onClick={handleEditFlashCard}
            >
              Submit Edit
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <div
        className="flex flex-wrap items-center justify-center
       gap-4 transition-colors duration-1000 m-auto lg:mt-[10rem]"
      >
        {userFlashCards.map((el, index) => (
          <Card
            key={index}
            showFront={showUserFronts[index]}
            content={showUserFronts[index] ? el.question : el.answer}
            onClick={() => toggleUserCardSide(index)}
            card={el}
            handleUserDelete={handleUserDelete}
            isUser={true}
            handleShowEditForm={handleShowEditForm}
          />
        ))}
        {questionAndAnswer.map((el, index) => (
          <Card
            key={index}
            showFront={showFronts[index]}
            content={
              showFronts[index] ? el.question : el.options[el.answer - 1]
            }
            onClick={() => toggleCardSide(index)}
            card={el}
            isUser={false}
            handleCardDelete={handleCardDelete}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default FlashCard;
