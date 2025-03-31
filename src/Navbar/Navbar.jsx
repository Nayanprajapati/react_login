import React from "react";
import "./Navbar.css";

const Navbar = () => {
  const logout = () => {
    // Clear the logged-in user from localStorage
    localStorage.removeItem("loggedInUser");
    // Redirect to login page after logout
    navigate("/login");
  };
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
      <button onClick={logout}>Log Out</button>
    </nav>
  );
};

export default Navbar;
