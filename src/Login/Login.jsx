import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handelInput = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    if ("email" == name) {
      setEmail(value);
    }
    if ("password" == name) {
      setPassword(value);
    }
  };
  const handelSubmit = (event) => {
    event.preventDefault();

    if (email == "" || password == "") {
      alert("Please enter your details");
    } else {
      let getDetails = JSON.parse(localStorage.getItem("users"));
      console.log(getDetails);
      getDetails.map((curValue) => {
        console.log(curValue.email);
        let storeEmail = curValue.email;
        let storePassword = curValue.password;
        if (email == storeEmail && password == storePassword) {
          alert("Login Successfully");
          navigate("/home");
        } else {
          return setMsg("Login Failed");
        }
      });
    }
  };
  return (
    <div>
      <p className="errMsg">{msg}</p>
      <Navbar />
      <div>
        <form onSubmit={handelSubmit} className="login-form">
          <div className="heading">
            <p>Log In</p>
          </div>
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
              If you have to create account? <a href="/">Sign Up</a>
            </p>
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
