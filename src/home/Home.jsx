import React from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const home = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("users");
    navigate("/");
  };
  return (
    <div>
      <Navbar />
      <div className="home">
        <h2>Welcome to home page!!</h2>
        <button onClick={logout}>Log Out</button>
      </div>
    </div>
  );
};

export default home;
