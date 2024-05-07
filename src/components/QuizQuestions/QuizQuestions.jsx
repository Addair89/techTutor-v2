import React, { useState, useEffect } from "react";
import { getQuestions } from "../../utilities/questions-api";
import QuizResults from "../QuizResults/QuizResults";
import { Link } from "react-router-dom";

const QuizQuestions = ({ user, category, difficulty }) => {
  const [questions, setQuestions] = useState([]);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [optionSelected, setOptionSelected] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({}); // Object to store selected options for each question
  const allQuestionsAnswered =
    questions.length > 0 &&
    Object.keys(selectedOptions).length === questions.length;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questions = await getQuestions(category, difficulty);
        setQuestions(questions);
        console.log(questions);
      } catch (error) {}
    };
    fetchQuestions();
  }, []);

  const handleSelectOption = (option, optionIdx) => {
    setOptionSelected(true);
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [currentQuestion._id]: { option, optionIdx }, // Store selected option for the current question index
    }));
    console.log(selectedOptions);
  };

  const currentQuestion =
    questions.length > 0 && questionIdx < questions.length
      ? questions[questionIdx]
      : null;

  const handleQuestionSubmission = () => {
    setOptionSelected(false);
    setQuestionIdx((prevValue) => prevValue + 1);
    setShowHint(false);
  };

  console.log(currentQuestion);

  return (
    <div className="flex relative flex-col items-center w-[70vw] mb-10 bg-gradient-to-t from-[#64acd3]/60 to-[#7400B8]/60  p-10 rounded-2xl min-h-[80vh] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <h1 className="capitalize text-[8.5vmin] text-[#80FFDB]">
        {category} {difficulty} Quiz
      </h1>
      {currentQuestion && (
        <div className=" self-start">
          <p className="text-[4.5vmin] text-white">
            {currentQuestion.question.replace(/.$/, "?")}
          </p>
          <div className="p-5">
            {currentQuestion.options.map((option, idx) => (
              <p
                className={`m-5 min-w-[80%] p-5 text-[#572579] bg-[white]/70 rounded-xl ${
                  selectedOptions[currentQuestion._id]?.optionIdx === idx
                    ? "bg-[black]/40 text-white"
                    : "bg-[white]/70 text-[#572579] hover:bg-[black]/40 hover:text-white hover:cursor-pointer"
                } transition-all duration-300 ease-in-out`}
                key={idx}
                onClick={() => handleSelectOption(option, idx)}
              >
                {idx + 1}: {option}
              </p>
            ))}
            <button
              onClick={() => setShowHint((prev) => !prev)}
              className=" absolute bottom-0 right-5 text-[2.2vmin] mb-3 py-4 px-6 bg-[#7400B8] rounded-full text-white hover:bg-[#48BFE3] hover:text-[#7400B8] transition-all duration-300 ease-in-out"
            >
              Hint?
            </button>
            {optionSelected ? (
              <button
                className="absolute bottom-0 mb-3 left-5 text-[2.2vmin] py-4 px-6 bg-[#7400B8] rounded-full text-white hover:bg-[#48BFE3] hover:text-[#7400B8] transition-all duration-300 ease-in-out"
                onClick={handleQuestionSubmission}
              >
                Next
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
      {!currentQuestion && allQuestionsAnswered && (
        <>
          <QuizResults
            questions={questions}
            answers={selectedOptions}
            user={user}
            category={category}
            difficulty={difficulty}
          />
          <Link
            to="/quizzes"
            className="absolute top-5 right-5 text-white p-2 bg-black/60 rounded-lg hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
          >
            New Quiz?
          </Link>
        </>
      )}
      {showHint && (
        <div className="text-[#7400B8] font-semibold text-[2.2vmin] bg-[#80FFDB]/60 p-3 rounded-xl">
          <i class="fa-regular fa-lightbulb"></i> {currentQuestion.hint}
        </div>
      )}
    </div>
  );
};

export default QuizQuestions;
