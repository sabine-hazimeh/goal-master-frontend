import React, { useEffect, useState } from "react";
import "./styles/Profile.css";
import Header from "../components/Header";
import Default from "../images/default-profile.jpeg";
import FilledButton from "../components/FilledButton";
import EmptyButton from "../components/EmptyButton";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get("http://localhost:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
        });
        setProfile(response.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    }
    fetchProfile();
  }, []);

  const validatePassword = (password) => {
    const lengthValid = password.length > 8;
    const specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const uppercaseValid = /[A-Z]/.test(password);
    setPasswordValid(lengthValid && specialCharValid && uppercaseValid);
  };

  const checkPasswordMatch = () => {
    setPasswordMatch(newPassword === confirmPassword);
  };

  return (
    <>
      <Header />
      <div className="profile">
        <p>Profile Picture</p>
        <div className="profile-img-container">
          <img
            src={profile.profile_picture || Default}
            className="profile-img"
            alt="Profile"
          />
          <div className="profile-img-buttons">
            <FilledButton text="Change picture" />
            <EmptyButton text="Delete picture" />
          </div>
        </div>
        <form className="profile-form">
          <label>Username</label>
          <input
            type="text"
            className="profile-input"
            value={profile.name}
            readOnly
          />
          <label>Email</label>
          <input
            type="email"
            className="profile-input"
            value={profile.email}
            readOnly
          />
          <p onClick={() => setShowPasswordFields(!showPasswordFields)}>
            {showPasswordFields ? "Cancel" : "Change Password?"}
          </p>

          <div className="save-button">
            <FilledButton text="Save Changes" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
