import React, { useEffect } from "react";
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
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordValid, setPasswordValid] = React.useState(false);
  const [passwordMatch, setPasswordMatch] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validatePassword = (password)=>{
    const Length = password.length>8;
    const Uppercase = /[A-Z]/.test(password);
    const characters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
    setPasswordValid(Length && Uppercase && characters);
  }
  const validatePasswordMatch = (password)=>{
    setPasswordMatch(password===password);
  }
  useEffect(() => {
    validatePassword(password);
    validatePasswordMatch(password);
  }, [password, confirmPassword]);
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
          <div className="Auth-form">
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
              <form className="Auth-inputs" onSubmit={handleLogin}>
                <label className="Auth-label">Email</label>
                <input
                  className="Auth-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email here"
                />
                <label className="Auth-label">Password</label>
                <input
                  className="Auth-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password here"
                />
                <div className="button-container">
                  <button className="Auth-submit">Log in</button>
                </div>
              </form>
            ) : (
              <form className="Auth-inputs">
                <label className="Auth-label">Username</label>
                <input
                  className="Auth-input"
                  type="text"
                  placeholder="Enter your Email here"
                />
                <label className="Auth-label">Email</label>
                <input
                  className="Auth-input"
                  type="email"
                  placeholder="Enter your Email here"
                />
                <label className="Auth-label">Password</label>
                <input
                  className="Auth-input"
                  type="password"
                  placeholder="Enter your Password here"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="password-validation">
                    <ul>
                      <li className={password.length > 8 ? "valid" : "invalid"}>At least 8 characters long</li>
                      <li className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "valid" : "invalid"}>Contain a special character</li>
                      <li className={/[A-Z]/.test(password) ? "valid" : "invalid"}>Contain an uppercase letter</li>
                    </ul>
                  </div>

                <label className="Auth-label">Confirm Password</label>
                <input
                  className="Auth-input"
                  type="password"
                  placeholder="Confirm your Password here"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                 <div className="password-validation">
                    <ul>
                      <li className={passwordMatch ? "valid" : "invalid"}>Match the confirmation password</li>
                    </ul>
                  </div>

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
