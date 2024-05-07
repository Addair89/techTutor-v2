import React, { useState } from "react";
const Card = ({
  showFront,
  content,
  onClick,
  handleUserDelete,
  card,
  isUser,
  handleShowEditForm,
  handleCardDelete,
  user,
}) => {
  console.log(card);
  return (
    <div
      onClick={onClick}
      className={`w-[400px] h-[400px]  relative flex flex-col rounded-3xl overflow-auto gap-10 items-center justify-start text-[5.5vmin] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] transition-transform duration-[.5s] ${
        showFront
          ? " bg-gradient-to-t from-[#64acd399] to-[#7400b899]"
          : "bg-[#843ab4]/70"
      } transition-colors `}
    >
      {isUser ? (
        <i
          onClick={() => handleUserDelete(card._id)}
          className="absolute top-3 right-3 text-[3.5vmin] text-[white] fa-regular fa-trash-can cursor-pointer hover:scale-[1.2] transition-all"
        ></i>
      ) : (
        <i
          onClick={() => handleCardDelete(card, user)}
          className="absolute top-3 right-3 text-[3.5vmin] text-[white] fa-regular fa-trash-can cursor-pointer hover:scale-[1.2] transition-all"
        ></i>
      )}
      {isUser && (
        <i
          onClick={() => handleShowEditForm(card)}
          className="absolute top-3 left-3 text-[3.5vmin] text-[white] fa-regular fa-pen-to-square cursor-pointer"
        ></i>
      )}

      <h3
        className={` font-bold transition-all duration-5000 ${
          showFront ? "text-white" : "text-[#72EFDD]"
        }`}
      >
        {showFront ? "Question: " : "Answer: "}
      </h3>
      <p
        className={` transition duration-[1s] ${
          showFront ? "text-white" : "text-[#72EFDD]"
        }  text-[6.5vmin] lg:text-[3.5vmin] p-8`}
      >
        {content}
      </p>
    </div>
  );
};

export default Card;
