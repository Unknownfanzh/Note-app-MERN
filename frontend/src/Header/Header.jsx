import { Link } from "react-router-dom";

function Header({ isLoggedIn, username }) {
  const handleDashboardClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault(); // Prevent the default action (navigation)
      alert("Please log in first.");
    }
  };


  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Notes
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="./" className="nav-link active">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/dashboard"
                  className="nav-link active"
                  onClick={handleDashboardClick}
                >
                  Dashboard
                </Link>
              </li>
            </ul>
            {isLoggedIn && (
              <span className="navbar-text">Welcome, {username || "User"}</span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
