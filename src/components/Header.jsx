import React from "react";
import "./styles/Header.css";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const isConsultant = user && user.role === "consultant";
  const isAdmin = user && user.role === "admin";
  const isUser = user && user.role === "user";

  return (
    <>
      <header className="header">
        <div className="header-left">
          <img src={logo} className="header-logo" alt="Goal Master Logo" />
          <h1 className="header-title">Goal Master</h1>
        </div>
        <div className="header-right">
          <Link to="/" className="header-links">
            Home
          </Link>
          <Link to="/journals" className="header-links">
            Journal
          </Link>
          <Link to="/about" className="header-links">
            About
          </Link>
          {isUser && (
            <Link to="/profile" className="header-links">
              Profile
            </Link>
          )}
          {isConsultant && (
            <Link to="/users" className="header-links">
              Users
            </Link>
          )}
          {isAdmin && (
            <Link to="/consultants-form" className="header-links">
              Consultants
            </Link>
          )}
          <Link to="/auth" className="header-links">
            SignIn
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
