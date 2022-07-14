import React from "react";
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  let navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("accessToken");
    navigate("/signin");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="">
          Greengrocer
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                <i className="fas fa-list-ul"></i> Products
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/checkout">
                <i className="fas fa-shopping-cart"></i> Checkout
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                <i className="fas fa-user"></i> Profile
              </Link>
            </li>

            <li className="nav-item">
              <a href="" className="nav-link" onClick={logout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const Header = () => {
  return (
    <Router>
      <HeaderComponent></HeaderComponent>
    </Router>
  );
};

export default Header;
