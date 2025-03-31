import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget to import the styles

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div>
        <form onSubmit={handelSubmit} className="login-form">
          <div className="account">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handelInput}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handelInput}
            />
            <p>
              If you need to create an account? <a href="/signup">Sign Up</a>
            </p>
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
