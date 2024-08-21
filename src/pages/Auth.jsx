import React from "react";
import "./styles/Auth.css";
import Header from "../components/Header";
import woman from "../images/working-woman.png";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure, logout } from "../redux/usersSlice/slice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const [activeForm, setActiveForm] = React.useState("login");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      const { token, user } = response.data;
      dispatch(loginSuccess({ user, token }));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure({ error: error.response.data.message }));
    }
  };
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
                className={`Auth-button ${
                  activeForm === "login" ? "active" : ""
                }`}
                onClick={() => setActiveForm("login")}
              >
                Login
              </button>
              <button
                className={`Auth-button ${
                  activeForm === "signup" ? "active" : ""
                }`}
                onClick={() => setActiveForm("signup")}
              >
                Sign Up
              </button>
            </div>
            {activeForm === "login" ? (
              <form className="Auth-inputs">
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
              </form>
            ) : (
              <form className="Auth-inputs">
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
                <input type="file" accept="image/*" />
                <div className="button-container">
                  <button className="Auth-submit">Sign Up</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
