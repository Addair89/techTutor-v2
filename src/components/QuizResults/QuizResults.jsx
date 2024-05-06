import React, { useEffect, useState } from "react";
import { checkResults } from "../../utilities/questions-api";
import { saveQuiz } from "../../utilities/quiz-api";
import {
  addFlashCard,
  getFlashCards,
  removeFlashCard,
} from "../../utilities/flashCard-api";

const QuizResults = ({ questions, answers, user, category, difficulty }) => {
  console.log("__________RENDERED__________");
  const [flashCards, setFlashCards] = useState([]);

  const { count, wrongAnswers } = checkResults(questions, answers);

  useEffect(() => {
    const saveData = async () => {
      try {
        await saveQuiz(user, questions, count, difficulty, category, answers);
      } catch (error) {}
    };

    const getUserFlashCards = async () => {
      try {
        const flashCards = await getFlashCards(user._id);
        setFlashCards(flashCards);
      } catch (error) {}
    };

    saveData();
    getUserFlashCards();
  }, [questions, answers, user, category, difficulty]);
  console.log(flashCards);

  const checkQuestionInFlashCard = (questionId) => {
    return flashCards.some((flashcard) => flashcard.question === questionId);
  };
  const handleFlashCardAdd = async (question, user) => {
    try {
      const response = await addFlashCard(question, user);
      setFlashCards([
        ...flashCards,
        { question: response._id, user: user._id },
      ]);
    } catch (error) {}
  };

  const handleFlashCardRemove = async (question, user) => {
    try {
      const response = await removeFlashCard(question, user);
      setFlashCards(flashCards.filter((card) => card.question !== response));
    } catch (error) {}
  };

  return (
    <div className="flex flex-col items-center gap-5 w-[80%]">
      <h1 className="text-[5.5vmin] text-white">
        You Got {count} out of {questions.length}
      </h1>
      {questions.map((question, index) => {
        const correctAnswerIdx = question.answer;
        const selectedOptionIdx = answers[question._id].optionIdx + 1;
        const correctAnswer = correctAnswerIdx === selectedOptionIdx;
        const isAlreadyFlashCard = checkQuestionInFlashCard(question._id);
        console.log("Question in flashcards", isAlreadyFlashCard);

        return (
          <div
            key={index}
            className={`${
              correctAnswer
                ? "border-2 border-green-500 "
                : "border-2 border-red-500 "
            }relative m-5 min-w[80%] p-5  w-full bg-[black]/50 hover:bg-[black]/40 rounded-xl hover:text-white transition-all duration-300 ease-in-out`}
          >
            <p className="text-[3.5vmin] text-white pt-5">
              Q{index + 1}: {question.question}
            </p>
            <p className={correctAnswer ? "text-green-400" : "text-red-500"}>
              Your Answer: {answers[question._id].option}
            </p>
            {isAlreadyFlashCard ? (
              <p
                onClick={() => handleFlashCardRemove(question, user)}
                className="absolute top-2 right-2 text-[2vmin] text-1xl rounded-full text-white hover:bg-white hover:text-[#7400B8] hover:p-3 transition-all duration-300 ease-in-out hover:cursor-pointer"
              >
                Remove Flash Card
              </p>
            ) : (
              <p
                onClick={() => handleFlashCardAdd(question, user)}
                className="absolute top-2 right-2 text-[2vmin] text-1xl rounded-full text-white hover:bg-white hover:text-[#7400B8] hover:p-3 transition-all duration-300 ease-in-out hover:cursor-pointer"
              >
                Make Flash Card
              </p>
            )}
            <button className=" text-[2vmin] rounded-full text-white hover:bg-[#48BFE3] hover:text-[#7400B8] transition-all duration-300 ease-in-out absolute bottom-2 right-2">
              Explanation
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default QuizResults;
