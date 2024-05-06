import { useState } from "react";
import { signUp } from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";

export default function SignUpForm({ setUser }) {
  const navigate = useNavigate(); // Get the navigate function from react-router-dom
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  });

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const user = await signUp(formData);
      setUser(user);
      navigate("/"); // Redirect to the '/' path after successful sign-up
    } catch {
      setFormData({ ...formData, error: "Sign Up Failed - Try Again" });
    }
  };

  const disable = formData.password !== formData.confirm;

  return (
    <div className="flex flex-col items-center gap-5  p-5 rounded-lg bg-gradient-to-bl from-[#7400B8]/60 to-[#5390D9]/60 w-full shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
      <h1 className="mb-10 text-[8vmin] text-white">Sign Up</h1>
      <form
        className="flex flex-col items-stretch gap-4 w-full"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <input
          className="bg-black/10 text-white text-[3vmin] rounded-md p-2 placeholder:text-[white] focus:outline-none focus:bg-black/60"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name..."
          required
        />
        <input
          className="bg-black/10 text-white text-[3vmin] rounded-md p-2 placeholder:text-[white] focus:outline-none focus:bg-black/60"
          type="email"
          name="email"
          placeholder="Email..."
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="bg-black/10 text-white text-[3vmin] rounded-md p-2 placeholder:text-[white] focus:outline-none focus:bg-black/60"
          type="password"
          name="password"
          placeholder="Password..."
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          className="bg-black/10 text-white text-[3vmin] rounded-md p-2 placeholder:text-[white] focus:outline-none focus:bg-black/60"
          type="password"
          name="confirm"
          placeholder="Confirm Password..."
          value={formData.confirm}
          onChange={handleChange}
          required
        />
        <button
          className="text-1xl  p-4 bg-[#7400B8] rounded-full m-4 text-white hover:bg-[#48BFE3] hover:text-[#7400B8] transition-all duration-300 ease-in-out"
          type="submit"
          disabled={disable}
        >
          SIGN UP
        </button>
      </form>
      <p className="error-message">&nbsp;{formData.error}</p>
    </div>
  );
}
