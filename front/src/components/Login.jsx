import React, { useState } from "react";
import PropTypes from "prop-types";
import "../css/Login.css";

export default function Login({ onLoginSuccess, setIsNewUser }) {
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });

  const handleInputChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for including the session cookie
        body: JSON.stringify(loginInfo),
      });

      const data = await response.text();

      if (response.ok) {
        onLoginSuccess({ username: loginInfo.username });
      } else {
        alert(data);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="form-container">
      <div className="row form-div">
        <div className="col form-title">
          <h2>Login</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={loginInfo.username}
                onChange={handleInputChange}
                required
                className="form-control"
              />
              <label className="form-label">Username</label>
            </div>
            <div className="form-outline mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginInfo.password}
                onChange={handleInputChange}
                required
                className="form-control"
              />
              <label className="form-label">Password</label>
            </div>
            <div className="row mb-4">
              <div className="col">
                <button
                  onClick={() => setIsNewUser(true)}
                  className="btn btn-link"
                >
                  Don't have an account? Sign Up
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block mb-4 form-submit"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
  setIsNewUser: PropTypes.func.isRequired,
};
