import React, { useEffect, useState } from "react";
import { fetchCategories } from "../../utilities/questions-api";
import { fetchDifficultiesByCategory } from "../../utilities/questions-api";
import QuizQuestions from "../../components/QuizQuestions/QuizQuestions";
import { Link } from "react-router-dom";

const Quiz = ({
  user,
  setSelectedCategory,
  setSelectedDifficulty,
  selectedCategory,
  selectedDifficulty,
}) => {
  const [categories, setCategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false); // State to track whether the quiz has started

  useEffect(() => {
    setSelectedCategory("");
    setSelectedDifficulty("");
    const fetchCategoryData = async () => {
      try {
        const allCategories = await fetchCategories();
        setCategories(allCategories);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategoryData();
  }, []);

  const handleCategoryChange = async (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category) {
      try {
        const difficulties = await fetchDifficultiesByCategory(category);
        setDifficulties(difficulties);
      } catch (error) {
        console.error("Error fetching difficulties:", error.message);
      }
    } else {
      // Clear difficulties if no category is selected
      setDifficulties([]);
    }
  };

  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  const handleChangeQuiz = () => {
    setSelectedCategory("");
    setSelectedDifficulty("");
    setStartQuiz(false); // Reset startQuiz state when changing the quiz
  };

  const handleStartQuiz = () => {
    setStartQuiz(true); // Set startQuiz state to true when the "Yes" button is clicked
  };

  return (
    <div className="min-h-[100vh]">
      {!startQuiz ? (
        <div className="p-20 bg-gradient-to-t from-[white]/60 to-[#7400B8] w-[60vw] h-[70vh] rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex flex-col items-center">
          <h1 className="text-[8.5vmin] text-white/90">Select A Quiz</h1>
          <div className="p-5 flex gap-5">
            <select
              className="h-[50px] bg-black/60 text-white/80 focus:outline-none p-4 rounded-3xl capitalize transition-all duration-300 ease-in-out"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Select a category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {difficulties.length > 0 && (
              <select
                className="h-[50px] bg-black/60 text-white/80 focus:outline-none p-4 rounded-3xl capitalize transition-all duration-300 ease-in-out"
                value={selectedDifficulty}
                onChange={handleDifficultyChange}
              >
                <option value="">Select a Difficulty</option>
                {difficulties.map((diff, idx) => (
                  <option key={idx} value={diff}>
                    {diff}
                  </option>
                ))}
              </select>
            )}
          </div>

          {selectedCategory.length > 0 && selectedDifficulty.length > 0 && (
            <div className="flex flex-col gap-5">
              <h1 className="text-[5.5vmin] text-white capitalize transition-all duration-300 ease-in-out">
                Start Your{" "}
                <span className=" text-[#7400B8] capitalize">
                  {selectedDifficulty} {selectedCategory}
                </span>{" "}
                Quiz?
              </h1>
              <div className="flex items-center justify-center gap-10 w-full transition-all duration-300 ease-in-out">
                <Link
                  className=" flex justify-center text-[2.5vmin] w-full p-4 bg-[#7400B8] rounded-full text-white hover:bg-[#48BFE3] hover:text-[#7400B8] transition-all duration-300 ease-in-out"
                  to="/questions"
                >
                  Yes
                </Link>
                <button
                  className="text-[2.5vmin] p-4 w-full bg-[#7400B8] rounded-full text-white hover:bg-[#48BFE3] hover:text-[#7400B8] transition-all duration-300 ease-in-out"
                  onClick={handleChangeQuiz}
                >
                  Change Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Quiz;
