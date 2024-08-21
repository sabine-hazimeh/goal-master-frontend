import React from "react";
import "./styles/Auth.css";
import Header from "../components/Header";
import woman from "../images/working-woman.png";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/usersSlice/slice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [activeForm, setActiveForm] = React.useState("login");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordValid, setPasswordValid] = React.useState(false);
  const [passwordMatch, setPasswordMatch] = React.useState(true);
  const [showPasswordValidation, setShowPasswordValidation] =
    React.useState(false);
  const [showConfirmPasswordValidation, setShowConfirmPasswordValidation] =
    React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validation functions
  const validatePassword = (password) => {
    const lengthValid = password.length > 8;
    const specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const uppercaseValid = /[A-Z]/.test(password);
    setPasswordValid(lengthValid && specialCharValid && uppercaseValid);
  };

  const checkPasswordMatch = () => {
    setPasswordMatch(password === confirmPassword);
  };

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

  const handleSignup = async (event) => {
    event.preventDefault();
    if (!passwordValid || !passwordMatch) {
      return; 
    }
    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        email,
        password,
        name,
      });
      console.log("Registration successful", response.data);
    } catch (error) { 
      console.error("Registration error:", error);
    }
  };

  React.useEffect(() => {
    validatePassword(password);
    checkPasswordMatch();
  }, [password, confirmPassword]);

  return (
    <>
      <Header />
      <div className="Auth">
        <div className="Auth-left">
          <img src={woman} className="Auth-img" alt="Working woman" />
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
                  required
                />
                <label className="Auth-label">Password</label>
                <input
                  className="Auth-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password here"
                  required
                />
                <div className="button-container">
                  <button className="Auth-submit">Log in</button>
                </div>
              </form>
            ) : (
              <form className="Auth-inputs" onSubmit={handleSignup}>
                <label className="Auth-label">Username</label>
                <input
                  className="Auth-input"
                  type="text"
                  placeholder="Enter your Username here"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label className="Auth-label">Email</label>
                <input
                  className="Auth-input"
                  type="email"
                  placeholder="Enter your Email here"
                  required
                />
                <label className="Auth-label">Password</label>
                <input
                  className="Auth-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password here"
                  onFocus={() => setShowPasswordValidation(true)}
                  onBlur={() => setShowPasswordValidation(false)}
                  required
                />
                {showPasswordValidation && (
                  <div className="password-validation">
                    <ul>
                      <li className={password.length > 8 ? "valid" : "invalid"}>
                        At least 8 characters long
                      </li>
                      <li
                        className={
                          /[!@#$%^&*(),.?":{}|<>]/.test(password)
                            ? "valid"
                            : "invalid"
                        }
                      >
                        Contain a special character
                      </li>
                      <li
                        className={/[A-Z]/.test(password) ? "valid" : "invalid"}
                      >
                        Contain an uppercase letter
                      </li>
                    </ul>
                  </div>
                )}
                <label className="Auth-label">Confirm Password</label>
                <input
                  className="Auth-input"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your Password here"
                  onFocus={() => setShowConfirmPasswordValidation(true)}
                  onBlur={() => setShowConfirmPasswordValidation(false)}
                  required
                />
                {showConfirmPasswordValidation && (
                  <div className="password-validation">
                    <ul>
                      <li className={passwordMatch ? "valid" : "invalid"}>
                        Match the confirmation password
                      </li>
                    </ul>
                  </div>
                )}
                <label className="Auth-label">Profile Photo</label>
                <input type="file" accept="image/*" />
                <div className="button-container">
                  <button
                    className="Auth-submit"
                    disabled={!passwordValid || !passwordMatch}
                  >
                    Sign Up
                  </button>
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
