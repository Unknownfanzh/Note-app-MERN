import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import PleaseLogin from "./components/PleaseLogin";
// The main application component
function MainContent() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const checkAuthenticated = async () => {
    try {
      const response = await fetch("/api/auth", {
        method: "GET",
        credentials: "include", // This is required to include the session cookie with the request
      });
      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        setCurrentUser({ username: data.user });
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking authentication status:", error);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "GET",
        credentials: "include",
      });
      setIsAuthenticated(false);
      setCurrentUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSuccessfulAuth = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="welcome-div">
          <h2 className="welcome">Welcome, {currentUser.username}</h2>
          <Link to="/dashboard">Go to Dashboard</Link>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : null}
      <Routes>
        {isAuthenticated ? (
          <>
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
            <Route path="/" element={<div className="welcome-div">Welcome to the home page!</div>} />
          </>
        ) : (
          <>
            <Route
              path="/dashboard"
              element={<PleaseLogin />}
            />
            {isNewUser ? (
              <Route
                path="/"
                element={
                  <Signup
                    onSignupSuccess={handleSuccessfulAuth}
                    setIsNewUser={setIsNewUser}
                  />
                }
              />
            ) : (
              <Route
                path="/"
                element={
                  <Login
                    onLoginSuccess={handleSuccessfulAuth}
                    setIsNewUser={setIsNewUser}
                  />
                }
              />
            )}
          </>
        )}
      </Routes>
    </>
  );
}

// Login component

// Signup component

export default MainContent;
