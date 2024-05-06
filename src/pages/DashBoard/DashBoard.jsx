import React, { useEffect, useState } from "react";
import {
  getUserQuizData,
  getUserScoreData,
  getUserRank,
} from "../../utilities/users-api";
import { getFlashCards } from "../../utilities/flashCard-api";
import { Link } from "react-router-dom";

const DashBoard = ({ user }) => {
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(0);
  const [userRank, setUserRank] = useState("");
  const [radialProgress, setRadialProgress] = useState(0);
  const [flashCards, setFlashCards] = useState([]);
  console.log(radialProgress);

  function addZeroToEndAndParse(num) {
    const lastDigit = num % 10;
    const concatenated = lastDigit.toString() + "0";
    return parseInt(concatenated, 10);
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const quizData = await getUserQuizData(user._id);
        setQuizCompleted(quizData.length);
        console.log(quizData);
        const scoreData = await getUserScoreData(user._id);
        setScore(scoreData);
        const userRank = await getUserRank(user._id);
        setUserRank(userRank);
        const progression = addZeroToEndAndParse(scoreData);
        setRadialProgress(progression);
        const flashCards = await getFlashCards(user._id);
        setFlashCards(flashCards);
      } catch (error) {}
    };
    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col gap-10 mb-[10rem]  w-[70vw] items-center">
      <div className=" min-h-[40vh] grid grid-cols-2 justify-items-stretch items-center w-[100%] bg-gradient-to-tr from-white/60 to-[#7400B8]/80 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] rounded-3xl">
        <div className="text-[10vmin] flex flex-col items-center justify-center h-[100%]  rounded-lg text-white">
          <div>Hi,</div>

          <div className="text-[#6930C3]">{user.name}!</div>
        </div>
        <div className="text-[3.5vmin] w-[100%] h-[100%] flex flex-col items-center justify-center rounded-lg text-white">
          <div
            className="radial-progress text-[#6930C3] bg-white border-white border-8"
            style={{
              "--value": radialProgress,
              "--size": "12rem",
              "--thickness": "1rem",
            }}
            role="progressbar"
          >
            {(100 - radialProgress).toString().slice(0, 1)} points
            <br /> to lvl up!
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 w-[70vw]">
        <div className="w-[100%] flex flex-col items-center justify-between bg-gradient-to-t from-[white]/60 to-[#7400B8] shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] rounded-3xl">
          <p className="text-[4vmin] p-10 text-white/90 text-center">
            My {userRank ? userRank : "Coding Cadet"}, you have completed{" "}
            {quizCompleted} quizzes for {score} points and only need{" "}
            {(100 - radialProgress).toString().slice(0, 1)} more points to level
            up. Keep going!!!
          </p>
          <Link
            to="/quizzes"
            className="text-[3.5vmin] mb-10 p-4 bg-[#7400B8] rounded-full text-white hover:bg-[#48BFE3] hover:text-[#7400B8] transition-all duration-300 ease-in-out"
          >
            Start A Quiz
          </Link>
        </div>
        <div className="w-[100%] flex flex-col items-center justify-between bg-gradient-to-t from-[white]/60 to-[#7400B8] shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] rounded-3xl">
          <p className="text-[4vmin] p-10 text-white text-center">
            Study your {flashCards.length} flash cards. Its been proven that
            studying this way will help you retain the information 99999% more
            than doing nothing.{" "}
          </p>
          <Link
            to="/quizzes"
            className="text-[3.5vmin] mb-10 p-4 bg-[#7400B8] rounded-full text-white hover:bg-[#48BFE3] hover:text-[#7400B8] transition-all duration-300 ease-in-out"
          >
            Flash Cards
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
