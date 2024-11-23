import React, { useState, useContext } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../css/Login.css"; // Ensure styles for the input and error messages

export default function Login() {
  const [details, setDetails] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateUsername = (value) => {
    if (!value) {
      setErrors((prev) => ({ ...prev, username: "Username is required." }));
      setIsUsernameValid(false);
      return false;
    } else {
      setErrors((prev) => ({ ...prev, username: "" }));
      setIsUsernameValid(true);
      return true;
    }
  };

  const validatePassword = (value) => {
    if (!value) {
      setErrors((prev) => ({ ...prev, password: "Password is required." }));
      setIsPasswordValid(false);
      return false;
    } else if (value.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters long.",
      }));
      setIsPasswordValid(false);
      return false;
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
      setIsPasswordValid(true);
      return true;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });

    if (name === "username") {
      validateUsername(value);
    } else if (name === "password") {
      validatePassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameValid = validateUsername(details.username);
    const passwordValid = validatePassword(details.password);

    if (usernameValid && passwordValid) {
      try {
        const response = await api.post("/api/auth/login", null, {
          params: {
            username: details.username,
            password: details.password,
          },
        });
        if (response.status === 200) {
          await updateUser();
          navigate("/customer");
        } else {
          alert("Login failed");
        }
      } catch (error) {
        console.error("There was an error!", error);
        alert("Invalid credentials");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="text-center fw-bold shadow">WELCOME BACK..!</h1>

          <div className="mb-3">
            <label htmlFor="username" className="form-label shadow">
              Email
            </label>
            <div className="input-group">
              <input
                type="email"
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
                id="username"
                name="username"
                placeholder="Enter your email"
                value={details.username}
                onChange={handleChange}
              />
              {isUsernameValid && (
                <span className="input-group-text text-success">✔</span>
              )}
            </div>
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label shadow">
              Password
            </label>
            <div className="input-group">
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                aria-describedby="passwordHelpBlock"
                value={details.password}
                onChange={handleChange}
              />
              {isPasswordValid && (
                <span className="input-group-text text-success">✔</span>
              )}
            </div>
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
            <div id="passwordHelpBlock" className="clr d-none d-sm-block">
              Your password must be 8-20 characters long.
            </div>
          </div>

          <div className="d-flex flex-column flex-md-row mt-5 justify-content-between">
            <button type="submit" className="btn btn-warning">
              Sign in
            </button>
            <a href="#" className="shadow text-dark">
              Forget Password
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
