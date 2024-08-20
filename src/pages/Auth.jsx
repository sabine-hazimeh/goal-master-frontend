import React from "react";
import "./styles/Auth.css";
import Header from "../components/Header";
import woman from "../images/working-woman.png";
const Auth = () => {
  const [activeForm, setActiveForm] = React.useState("login");
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
            <button
                className={`Auth-button ${activeForm === "login" ? "active" : ""}`}
                onClick={() => setActiveForm("login")}
              >
                Login
              </button>
              <button
                className={`Auth-button ${activeForm === "signup" ? "active" : ""}`}
                onClick={() => setActiveForm("signup")}
              >
                Sign Up
              </button>
            </div>
            {activeForm === "login" ? (
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
            ) : (
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
                  type="password"
                  placeholder="Enter your Password here"
                />
                <label className="Auth-label">Confirm Password</label>
                <input
                  className="Auth-input"
                  type="password"
                  placeholder="Confirm your Password here"
                />
                <label className="Auth-label">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                />
                <div className="button-container">
                  <button className="Auth-submit">Sign Up</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
