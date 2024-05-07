import React, { useState } from "react";
import Logo from "../../images/techTutorLogo.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [isFront, setIsFront] = useState(true);
  const flashCards = [
    ["Whats Jsx", "Javascript XML"],
    ["Whats a component", "Reusable piece of code"],
  ];

  const toggleCard = () => {
    setIsFront(!isFront);
  };

  return (
    <div className="flex flex-col flex-wrap items-center m-auto relative z-20 ">
      <div className="absolute bottom-[5%] z-10 left-[-20rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] bg-[#5E60CE]/80 "></div>
      <div className="md:grid md:grid-cols-2 flex justify-items-center items-center relative ">
        <img
          src={Logo}
          alt=""
          className="z-[9999] rounded-full h-4/5 hidden lg:block"
        />
        <div className="rounded-md flex flex-col items-center justify-evenly bg-black/75 h-[100%]">
          <h1 className="text-[7vmin] text-center text-white">
            {"{"}
            <span className="text-[8vmin] text-[#7400B8]">
              <strong>tech</strong>
            </span>
            <span className="text-[8vmin] text-[#80FFDB]">
              <strong>Tutor</strong>
            </span>
            {"}"}
          </h1>
          <p className="text-[5.5vmin] text-white p-20 md:text-[2.5vmin]">
            Welcome to our learning platform dedicated to helping you master
            programming languages through quizzes and flashcards! 🚀 Whether
            you're a beginner eager to dive into the world of coding or an
            experienced developer looking to brush up on your skills, our
            platform offers a range of interactive tools designed to enhance
            your learning experience.
          </p>
          <Link
            to="/login-signup"
            className="text-[4.5vmin] mb-10 p-4 bg-[#7400B8] rounded-full text-white hover:bg-[#48BFE3] hover:text-[#7400B8] transition-all duration-300 ease-in-out"
          >
            Start Now
          </Link>
        </div>
        <svg
          className=" w-[100vw] absolute bottom-0"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 43.9999C106.667 43.9999 213.333 7.99994 320 7.99994C426.667 7.99994 533.333 43.9999 640 43.9999C746.667 43.9999 853.333 7.99994 960 7.99994C1066.67 7.99994 1173.33 43.9999 1280 43.9999C1386.67 43.9999 1440 19.0266 1440 9.01329V100H0V43.9999Z"
            className="fill-current text-[#7400B8]"
          ></path>
        </svg>
      </div>
      {/* <div className="flex flex-col justify-center items-center pt-20 relative w-screen bg-white">
        <svg
          className=" w-[100vw] absolute top-0"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 56.0001C106.667 56.0001 213.333 92.0001 320 92.0001C426.667 92.0001 533.333 56.0001 640 56.0001C746.667 56.0001 853.333 92.0001 960 92.0001C1066.67 92.0001 1173.33 56.0001 1280 56.0001C1386.67 56.0001 1440 80.9734 1440 90.9867V0.000100136H0V56.0001Z"
            className="fill-current text-[#7400B8]"
          ></path>
        </svg>
        <div className="mt-[5rem] bg-white rounded-lg p-10 flex flex-col relative items-start justify-center w-[70vw] z-20 bg-gradient-to-l from-[#4EA8DE]/60 to-[#7400B8] shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
          <p className="text-[4vmin] text-white">Question titel:</p>
          <p className="absolute top-2 right-2 text-[2.5vmin] text-1xl p-4 bg-[#7400B8] rounded-full m-4 text-white hover:bg-[#48BFE3] hover:text-[#7400B8] transition-all duration-300 ease-in-out hover:cursor-pointer">
            Hint?
          </p>
          <button className="text-[4vmin] bg-clip-text hover:text-transparent text-white hover:bg-gradient-to-r from-[#5E60CE] to-[#7400B8] hover:underline ">
            A{")"} Answer A, i will loop though answers for this.
          </button>
          <button className="text-[4vmin] bg-clip-text hover:text-transparent text-white hover:bg-gradient-to-r from-pink-500 to-violet-500 hover:underline">
            B{")"} Answer B, i will loop though answers for this.
          </button>
          <button className="text-[4vmin] bg-clip-text hover:text-transparent text-white hover:bg-gradient-to-r from-pink-500 to-violet-500 hover:underline">
            C{")"} Answer C, i will loop though answers for this.
          </button>
          <button className="text-[4vmin] bg-clip-text hover:text-transparent text-white hover:bg-gradient-to-r from-pink-500 to-violet-500 hover:underline">
            D{")"} Answer D, i will loop though answers for this.
          </button>
          <button className=" text-1xl p-4 bg-[#7400B8] rounded-full m-4 text-white hover:bg-[#48BFE3] hover:text-[#7400B8] transition-all duration-300 ease-in-out absolute bottom-2 right-2">
            Submit
          </button>
        </div>
        <div className=" w-[70vw] grid grid-cols-3 gap-[4vmin] justify-items-center mt-[3rem] z-20 relative">
          {flashCards.map((el) => {})}
        </div>
        <Link
          to="/login-signup"
          className="text-1xl m-10 p-4 bg-[#7400B8] rounded-full text-white hover:bg-[#48BFE3] hover:text-[#7400B8] transition-all duration-300 ease-in-out"
        >
          Start Now
        </Link>
      </div> */}
    </div>
  );
};

export default LandingPage;
