import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";
import Navbar from "../Navbar/Navbar";
import main from "../assets/main.jpg";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();

  // Validation functions
  const validateName = (name) => {
    if (!name) return "Name is required";
    if (name.length < 3) return "Name must be at least 3 characters";
    return "";
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Invalid email format";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password))
      return "Password must contain an uppercase letter";
    if (!/[0-9]/.test(password)) return "Password must contain a number";
    return "";
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return "Please confirm your password";
    if (confirmPassword !== password) return "Passwords do not match";
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate on change if the field has been touched
    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]:
          name === "confirmPassword"
            ? validateConfirmPassword(value, data.password)
            : name === "password"
            ? validatePassword(value)
            : name === "email"
            ? validateEmail(value)
            : validateName(value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate on blur
    setErrors((prev) => ({
      ...prev,
      [name]:
        name === "confirmPassword"
          ? validateConfirmPassword(data.confirmPassword, data.password)
          : name === "password"
          ? validatePassword(data.password)
          : name === "email"
          ? validateEmail(data.email)
          : validateName(data.name),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const newTouched = {
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    };
    setTouched(newTouched);

    // Validate all fields
    const newErrors = {
      name: validateName(data.name),
      email: validateEmail(data.email),
      password: validatePassword(data.password),
      confirmPassword: validateConfirmPassword(
        data.confirmPassword,
        data.password
      ),
    };
    setErrors(newErrors);

    // Check if form is valid
    const isValid = Object.values(newErrors).every((error) => !error);
    if (!isValid) {
      toast.error("Please fix all errors before submitting");
      return;
    }

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.some((user) => user.email === data.email);

    if (userExists) {
      toast.error("User with this email already exists!");
      return;
    }

    // Add new user (excluding confirmPassword from stored data)
    const { confirmPassword, ...userData } = data;
    const updatedUsers = [...existingUsers, userData];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Clear form and show success
    setData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    toast.success("Registration successful! Redirecting to login...", {
      onClose: () => navigate("/login"),
    });
  };

  // Remove the standalone navigate("/login") before the return statement
  return (
    <div>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
                onBlur={handleBlur}
                className={touched.name && errors.name ? "error" : ""}
                required
              />
              {touched.name && errors.name && (
                <p className="error-message">{errors.name}</p>
              )}
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={data.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={touched.email && errors.email ? "error" : ""}
                required
              />
              {touched.email && errors.email && (
                <p className="error-message">{errors.email}</p>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={touched.password && errors.password ? "error" : ""}
                required
              />
              {touched.password && errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={data.confirmPassword}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={
                  touched.confirmPassword && errors.confirmPassword
                    ? "error"
                    : ""
                }
                required
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="error-message">{errors.confirmPassword}</p>
              )}
            </div>

            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <div>
          <img src={main} alt="Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
