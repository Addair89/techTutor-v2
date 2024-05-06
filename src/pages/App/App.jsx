import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from "../../utilities/users-service";
import { set } from "mongoose";
import DashBoard from "../DashBoard/DashBoard";
import LandingPage from "../LandingPage/LandingPage";
import Quiz from "../Quiz/Quiz";
import QuizResults from "../../components/QuizResults/QuizResults";
import QuizQuestions from "../../components/QuizQuestions/QuizQuestions";
import IconLogo from "../../components/IconLogo/IconLogo";
import FlashCard from "../FlashCard/FlashCard";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  return (
    <main className="App relative bg-white/60 z-10 w-screen">
      <div className="absolute top-[20%] -z-10 right-[10rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] bg-[#7400B8] "></div>
      <div className="absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] bg-[#56CFE1]/70 "></div>

      <NavBar user={user} setUser={setUser} />

      {user ? (
        <>
          <IconLogo user={user} />
          <br />
          <div className="flex flex-col w-screen items-center mt-10">
            <Routes>
              <Route path="/" element={<DashBoard user={user} />} />
              <Route
                path="/quizzes"
                element={
                  <Quiz
                    user={user}
                    selectedCategory={selectedCategory}
                    selectedDifficulty={selectedDifficulty}
                    setSelectedCategory={setSelectedCategory}
                    setSelectedDifficulty={setSelectedDifficulty}
                  />
                }
              />
              <Route
                path="/questions"
                element={
                  <QuizQuestions
                    user={user}
                    category={selectedCategory}
                    difficulty={selectedDifficulty}
                  />
                }
              />
              <Route path="flashcards" element={<FlashCard user={user} />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route
            path="/login-signup"
            element={<AuthPage setUser={setUser} />}
          ></Route>
          <Route path="/" element={<LandingPage />}></Route>
        </Routes>
      )}
    </main>
  );
}
