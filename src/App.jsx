import React from "react";
import "./App.css";
import Signup from "./Signup/Signup.jsx";
import Login from "./Login/Login.jsx";
import Home from "./home/Home.jsx";
import Navbar from "./Navbar/Navbar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
