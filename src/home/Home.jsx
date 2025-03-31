import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar"; // Assuming you have a Navbar component

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      // If no user is logged in, redirect to login page
      navigate("/login");
    }
  }, [navigate]);

  const logout = () => {
    // Clear the logged-in user from localStorage
    localStorage.removeItem("loggedInUser");
    // Redirect to login page after logout
    navigate("/login");
  };

  return (
    <div>
      <Navbar />
      <div className="home">
        <h2>Welcome to the Home Page!!</h2>
        <button
          onClick={logout}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Home;
