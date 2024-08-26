import React, { useEffect, useRef, useState } from "react";
import "./styles/Profile.css";
import Header from "../components/Header";
import Default from "../images/default-profile.jpeg";
import FilledButton from "../components/FilledButton";
import EmptyButton from "../components/EmptyButton";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [profilePhotoURL, setProfilePhotoURL] = useState(profile.profile_photo);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const fileInputRef = useRef(null); // Add a ref for the file input

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
        setProfilePhotoURL(response.data.profile_photo);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    }
    fetchProfile();
  }, []);

  useEffect(() => {
    setPasswordMatch(newPassword === confirmPassword);
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    setIsButtonDisabled(!passwordValid || !passwordMatch);
  }, [passwordValid, passwordMatch]);

  const validatePassword = (password) => {
    const lengthValid = password.length > 8;
    const specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const uppercaseValid = /[A-Z]/.test(password);
    setPasswordValid(lengthValid && specialCharValid && uppercaseValid);
  };
  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhotoFile(file);
      setProfilePhotoURL(URL.createObjectURL(file));
    }
  };

  const handleDeleteProfilePhoto = () => {
    setProfilePhotoURL(null);
    setProfilePhotoFile(null);
  };


  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const updatedProfile = new FormData();

    updatedProfile.append("name", profile.name);
    updatedProfile.append("email", profile.email);
    if (newPassword) updatedProfile.append("password", newPassword);
    if (profilePhotoFile) {
      updatedProfile.append("profile_photo", profilePhotoFile);
    } else if (profilePhotoURL === null) {
      updatedProfile.append("profile_photo", "");
    }

    try {
      await axios.post("http://localhost:8000/api/profile", updatedProfile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Profile updated successfully!");
      setError("");
    } catch (err) {
      setError("Failed to update profile.");
      toast.error("Failed to update profile.");
      console.error(err);
    }
  };
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); 
    }
  };

  return (
    <>
      <Header />
      <div className="profile">
        <p>Profile Picture</p>
        <div className="profile-img-container">
          <img
            src={
              profilePhotoURL
                ? `http://localhost:8000/storage/${profilePhotoURL}`
                : Default
            }
            className="profile-img"
            alt="Profile"
          />
          <div className="profile-img-buttons">
            <FilledButton
              text="Change picture"
              onClick={triggerFileInput} 
            />
            <input
              type="file"
              ref={fileInputRef} 
              style={{ display: "none" }} 
              onChange={handleProfilePhotoChange}
            />
            <EmptyButton
              text="Delete picture"
              onClick={handleDeleteProfilePhoto}
            />
          </div>
        </div>
        <form className="profile-form" onSubmit={handleProfileUpdate}>
          <label>Username</label>
          <input
            type="text"
            className="profile-input"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
          <label>Email</label>
          <input
            type="email"
            className="profile-input"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <p onClick={() => setShowPasswordFields(!showPasswordFields)}>
            {showPasswordFields ? "Cancel" : "Change Password?"}
          </p>
          {showPasswordFields && (
            <>
              <label>New Password</label>
              <input
                type="password"
                className="profile-input"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
                placeholder="Enter your new password"
                required
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              {passwordFocused && (
                <div className="password-validation">
                  <ul>
                    <li
                      className={newPassword.length > 8 ? "valid" : "invalid"}
                    >
                      At least 8 characters long
                    </li>
                    <li
                      className={
                        /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
                          ? "valid"
                          : "invalid"
                      }
                    >
                      Contain a special character
                    </li>
                    <li
                      className={
                        /[A-Z]/.test(newPassword) ? "valid" : "invalid"
                      }
                    >
                      Contain an uppercase letter
                    </li>
                  </ul>
                </div>
              )}
              <label>Confirm New Password</label>
              <input
                type="password"
                className="profile-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                required
                onFocus={() => setConfirmPasswordFocused(true)}
                onBlur={() => setConfirmPasswordFocused(false)}
              />
              {confirmPasswordFocused && (
                <div className="password-validation">
                  <ul>
                    <li className={passwordMatch ? "valid" : "invalid"}>
                      Passwords match
                    </li>
                  </ul>
                </div>
              )}
              {error && <p className="error-message">{error}</p>}
            </>
          )}
          <div className="save-button">
            <FilledButton
              text="Save Changes"
              type="submit"
              disabled={isButtonDisabled && !profilePhotoFile}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
