import React, { useState, useEffect } from "react";
import "./styles/Header.css";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const isConsultant = user && user.role === "consultant";
  const isAdmin = user && user.role === "admin";
  const isUser = user && user.role === "user";

  useEffect(() => {
    const token = localStorage.getItem("Token");
    setIsAuthenticated(!!token);
  }, []);
  const handleLogout = async () => {
    const token = localStorage.getItem("Token");
    try {
      const response = await axios.get(
        "http://ec2-13-38-78-41.eu-west-3.compute.amazonaws.com/api/logout",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Logout response:", response.data);
      localStorage.removeItem("Token");
      setIsAuthenticated(false);
      navigate("/auth");
    } catch (error) {
      console.error(
        "Logout error:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} className="header-logo" alt="Goal Master Logo" />
        <h1 className="header-title">Goal Master</h1>
      </div>
      <div className="header-right">
        <Link to="/" className="header-links">
          Home
        </Link>
        <Link to="/goals-form" className="header-links">
          Goals
        </Link>
        <Link to="/journals" className="header-links">
          Journal
        </Link>

        {isUser && (
          <>
            <Link to="/profile" className="header-links">
              Profile
            </Link>
            <Link to="/about" className="header-links">
              About
            </Link>
          </>
        )}
        {isConsultant && (
          <>
            <Link to="/users" className="header-links">
              Users
            </Link>
            <Link to="/about" className="header-links">
              About
            </Link>
          </>
        )}
        {isAdmin && (
          <>
            <Link to="/sentiment-chart" className="header-links">
              Feedback
            </Link>
            <div className="header-links dropdown">
              <span onClick={toggleDropdown} className="dropdown-toggle">
                Consultants
              </span>
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/consultants-form" className="dropdown-item">
                    Add Consultant
                  </Link>
                  <Link to="/admin-consultants" className="dropdown-item">
                    View Consultants
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
        {isAuthenticated ? (
          <Link onClick={handleLogout} className="header-links auth-link">
            Log Out
          </Link>
        ) : (
          <Link to="/auth" className="header-links auth-link">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
