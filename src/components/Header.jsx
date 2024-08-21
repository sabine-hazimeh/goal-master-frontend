import React from "react";
import "./styles/Header.css";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
const Header = () => {
    return (<>
    <header className="header">
        <div className="header-left">
        <img src={logo} className="header-logo"></img>
        <h1 className="header-title">Goal Master</h1>
        </div>
        <div className="header-right">
            <Link to="/" className="header-links">Home</Link>
            <Link to="/journals" className="header-links">Journal</Link>
            <Link to="/about" className="header-links">About</Link>
            <Link to="#" className="header-links">Profile</Link>
            <Link to="/auth" className="header-links">SignIn</Link>
        </div>
        
    </header>
    </>);
}

export default Header;