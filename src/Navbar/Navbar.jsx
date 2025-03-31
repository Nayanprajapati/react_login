import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <a className="head">Explore!</a>
        </li>
        <li>
          <a>Signup</a>
        </li>
        <li>
          <a>Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
