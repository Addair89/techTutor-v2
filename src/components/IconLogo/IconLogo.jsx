import React from "react";
import Logo from "../../images/techTutorLogo.png";
import { Link } from "react-router-dom";

const IconLogo = () => {
  return (
    <Link to="/" className="fixed top-10 right-[2rem] ">
      <img
        className="w-[75px] rounded-full shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]"
        src={Logo}
        alt="app-logo"
      />
    </Link>
  );
};

export default IconLogo;
