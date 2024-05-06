import React, { useEffect, useState } from "react";
import Card from "../../components/FlashCard/Card";
import {
  getFlashCards,
  addUserDefinedCard,
} from "../../utilities/flashCard-api";
import { getQuestionAndAnswer } from "../../utilities/questions-api";

const FlashCard = ({ user }) => {
  const [flashCards, setFlashCards] = useState([]);
  const [questionAndAnswer, setQuestionAndAnswer] = useState([]);
  const [showFronts, setShowFronts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [flashCardAnswer, setFlashCardAnswer] = useState("");
  const [flashCardQuestion, setFlashCardQuestion] = useState("");
  const [userFlashCards, setUserFlashCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cards = await getFlashCards(user._id);
        console.log("Flash Cards:", cards);
        setFlashCards(cards);
        setShowFronts(Array(cards.length).fill(true));

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

  const toggleCardSide = (index) => {
    console.log("Toggling card side for index:", index);
    setShowFronts((prev) => {
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
      setUserFlashCards([...userFlashCards, [response]]);
      setFlashCardAnswer("");
      setFlashCardQuestion("");
      setShowForm(false);
    } catch (error) {}
  };

  const handleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <button onClick={handleShowForm}>Add Flash Card?</button>
      {showForm ? (
        <div className="absolute top-0 w-screen h-full bg-black/40 flex justify-center items-center">
          <div className="relative flex flex-col bg-white backdrop-blur-md p-20 items-center justify-center gap-10">
            <p
              onClick={handleShowForm}
              className="absolute top-5 right-5 text-[3.5vmin] text-black"
            >
              X
            </p>
            <h3>Flash Card</h3>
            <input
              type="text"
              placeholder="Question..."
              value={flashCardQuestion}
              onChange={(evt) => setFlashCardQuestion(evt.target.value)}
            />
            <input
              type="text"
              placeholder="Answer..."
              value={flashCardAnswer}
              onChange={(evt) => setFlashCardAnswer(evt.target.value)}
            />
            <button onClick={handleAddFlashCard}>Add</button>
          </div>
        </div>
      ) : (
        ""
      )}
      <div
        className="flex flex-wrap items-center justify-center
       gap-4 transition-colors duration-1000 m-auto"
      >
        {questionAndAnswer.map((el, index) => (
          <Card
            key={index}
            showFront={showFronts[index]}
            content={
              showFronts[index] ? el.question : el.options[el.answer - 1]
            }
            onClick={() => toggleCardSide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FlashCard;
