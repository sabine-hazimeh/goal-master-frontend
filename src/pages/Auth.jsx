import React from "react";
import "./styles/Auth.css";
import Header from "../components/Header";
import woman from "../images/working-woman.png";
const Auth = () => {
  return (
    <>
      <Header />
      <div className="Auth">
        <div className="Auth-left">
          <img src={woman} className="Auth-img"></img>
        </div>
        <div className="Auth-right">
          <div class="Auth-form">
            <div className="Auth-buttons">
              <button className="Auth-button">Login</button>
              <button className="Auth-button">Sign Up</button>
            </div>
            <div className="Auth-inputs">
              <label className="Auth-label">Email</label>
              <input
                className="Auth-input"
                type="text"
                placeholder="Enter your Email here"
              />
              <label className="Auth-label">Password</label>
              <input
                className="Auth-input"
                type="text"
                placeholder="Enter your Password here"
              />
              <div class="button-container">
              <button className="Auth-submit">Log in</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
