import React from "react";
import "./styles/Header.css";
import logo from "../images/logo.png";
const Header = () => {
    return (<>
    <header className="header">
        <div className="header-left">
        <img src={logo} className="header-logo"></img>
        <h1 className="header-title">Goal Master</h1>
        </div>
        
    </header>
    </>);
}

export default Header;