import React, { useState, useEffect } from "react";
import "./Login.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget to import the styles
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      // If user is logged in, redirect to home page
      navigate("/home");
    }
  }, [navigate]);

  const handelInput = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    if ("email" === name) {
      setEmail(value);
    }
    if ("password" === name) {
      setPassword(value);
    }
  };

  const handelSubmit = (event) => {
    event.preventDefault();

    if (email === "" || password === "") {
      toast.error("Please enter your details");
    } else {
      let getDetails = JSON.parse(localStorage.getItem("users"));
      let userFound = false;

      getDetails?.forEach((curValue) => {
        let storeEmail = curValue.email;
        let storePassword = curValue.password;

        if (email === storeEmail && password === storePassword) {
          // Store logged-in user details in localStorage
          localStorage.setItem("loggedInUser", JSON.stringify(curValue));

          toast.success("Login Successful!");
          navigate("/home");
          userFound = true;
        }
      });

      if (!userFound) {
        toast.error("Invalid email or password");
      }
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <Navbar />
      <ToastContainer />
      <div className="login-content">
        <form onSubmit={handelSubmit} className="login-form">
          <div className="account">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handelInput}
            />
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                name="password"
                placeholder="Password"
                onChange={handelInput}
              />
              <span
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                {/* Toggle eye icon */}
              </span>
            </div>
            <p>
              If you need to create an account? <a href="/signup">Sign Up</a>
            </p>
          </div>
          <button type="submit">Log In</button>
        </form>
        <div className="image-container"></div>
      </div>
    </div>
  );
};

export default Login;
