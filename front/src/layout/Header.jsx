import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import MainContent from "../MainContent";

function Header() {
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
      // navigate("/");
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
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* <a className="navbar-brand" href="#">
            Notes
          </a> */}
          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="./" className="nav-link active">
                  Home
                </Link>
              </li>
              {/* add dashborad  here */}
              <div>
                {isAuthenticated ? (
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link active">
                      Dashboard
                    </Link>
                  </li>
                ) : null}
              </div>

              {/* add dashborad  here */}
            </ul>
            {/* add logout button here */}
            <div>
              {isAuthenticated ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : null}
            </div>

            {/* add logout button here */}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
