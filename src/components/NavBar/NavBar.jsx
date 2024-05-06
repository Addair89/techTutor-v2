import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import { useState } from "react";

export default function NavBar({ setUser, user }) {
  const [showMenu, setShowMenu] = useState(false);
  function handleLogOut() {
    userService.logOut();
    setShowMenu(false);
    setUser(null);
  }
  return (
    <nav
      className={`fixed rounded-md
        text-black flex flex-col items-start mt-10 z-[9999]  ${
          showMenu ? "bg-white shadow-2xl" : ""
        }`}
    >
      <i
        onClick={() => setShowMenu(!showMenu)}
        className={`${
          showMenu ? "fa-solid fa-xmark" : "fa-solid fa-bars"
        } text-4xl mx-8 `}
      ></i>

      <div
        className={`transition-transform text-[3.5vmin] text-[#7400B8]  flex flex-col gap-4 px-8 w-fit
          ${
            showMenu
              ? "duration-500 ease-out opacity-100 scale-y-100 h-auto"
              : "duration-100 ease-in scale-y-0 h-0"
          }`}
      >
        <Link
          onClick={() => setShowMenu(!showMenu)}
          className="hover:text-black"
          to="/"
        >
          Dashboard
        </Link>
        <Link
          to="/quizzes"
          onClick={() => setShowMenu(!showMenu)}
          className="hover:text-black"
        >
          New Quiz
        </Link>
        <Link
          onClick={() => setShowMenu(!showMenu)}
          className="hover:text-black"
          to="/flashcards"
        >
          Flash Cards
        </Link>
        {user ? (
          <Link className="hover:text-black" to="" onClick={handleLogOut}>
            Log Out
          </Link>
        ) : (
          <Link
            onClick={() => setShowMenu(!showMenu)}
            className="hover:text-black"
            to="/login-signup"
          >
            Log In/Sign Up
          </Link>
        )}
      </div>
    </nav>
  );
}
