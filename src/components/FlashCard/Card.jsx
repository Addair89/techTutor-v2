import React from "react";

const Card = ({ showFront, content, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`w-[400px] h-[400px] flex flex-col overflow-auto gap-10 items-center justify-start bg-gradient-to-bl text-[5.5vmin] ${
        showFront
          ? "from-[#5390D9]/60 to-[#7400B8]/60"
          : "from-[#7400B8]/60 to-[#5390D9]/60"
      } transition-colors duration-1000`}
    >
      <h3>{showFront ? "Question: " : "Answer: "}</h3>
      <p className="text-white text-[3.5vmin] p-8">{content}</p>
    </div>
  );
};

export default Card;
