import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";
import Navbar from "../Navbar/Navbar";
import sinchan from "../assets/sinchan.png"; // Fixed import statement for image
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      // If user is logged in, redirect to home page
      navigate("/home");
    }
    toast.info("Welcome! Please fill out the form.");
  }, [navigate]);

  const validateInputs = () => {
    if (!data.name && !data.email && !data.password && !data.confirmPassword) {
      toast.error("All fields are empty! Please fill out the form.");
      return false;
    }
    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
      toast.error("All fields are required");
      return false;
    }
    if (data.name.length < 3) {
      toast.error("Name must be at least 3 characters long");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (data.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }
    if (!/[A-Z]/.test(data.password)) {
      toast.error("Password must contain at least one uppercase letter");
      return false;
    }
    if (!/[0-9]/.test(data.password)) {
      toast.error("Password must contain at least one number");
      return false;
    }
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (existingUsers.some((user) => user.email === data.email)) {
      toast.error("User with this email already exists!");
      return;
    }

    // Add new user
    const { confirmPassword, ...userData } = data;
    localStorage.setItem("users", JSON.stringify([...existingUsers, userData]));

    // Store logged-in user
    localStorage.setItem("loggedInUser", JSON.stringify(userData));

    toast.success("Registration successful! Redirecting to home...", {
      onClose: () => navigate("/home"),
    });

    setData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <div className="main-page">
        <form onSubmit={handleSubmit}>
          <div className="heading">
            <p>Sign Up</p>
          </div>
          <div className="account">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Username"
                value={data.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={data.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={data.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <div>
          <img
            src={sinchan}
            alt="Illustration"
            style={{ width: "200px", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
