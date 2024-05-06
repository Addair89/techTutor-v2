// LoginForm.jsx

import { useState } from "react";
import * as usersService from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
      navigate("/");
    } catch {
      setError("Log In Failed - Try Again");
    }
  }

  return (
    <div className="flex flex-col items-center gap-5  p-5 rounded-lg bg-gradient-to-bl from-[#5390D9]/60 to-[#7400B8]/60 w-full shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
      <h1 className="mb-10 text-[8vmin] text-white">Log In</h1>

      <form
        className="flex flex-col items-stretch gap-4 w-full"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <input
          className="bg-black/10  text-white text-[3vmin] rounded-md p-2  placeholder:text-[white] focus:outline-none focus:bg-black/60"
          type="text"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email..."
          required
        />
        <input
          className="bg-black/10  text-white text-[3vmin] rounded-md p-2 placeholder:text-[white] focus:outline-none focus:bg-black/60"
          placeholder="Password..."
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button
          className="text-1xl p-4 bg-[#7400B8] rounded-full m-4 text-white hover:bg-[#48BFE3] hover:text-[#7400B8] transition-all duration-300 ease-in-out"
          type="submit"
        >
          LOG IN
        </button>
      </form>

      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
