import React from "react";
import "./styles/Profile.css";
import Header from "../components/Header";
import Default from "../images/default-profile.jpeg";
import FilledButton from "../components/FilledButton";
import EmptyButton from "../components/EmptyButton";
function Profile() {
  return (
    <>
      <Header />
      <div className="profile">
        <p>Profile Picture</p>
        <div className="profile-img-container">
          <img src={Default} className="profile-img" alt="Profile" />
          <div className="profile-img-buttons">
          <FilledButton text="Change picture" />
          <EmptyButton text="Delete picture" />
          </div>
        </div>
        <form className="profile-form">
          <label>Username</label>
          <input type="text" className="profile-input"/>
          <label>email</label>
          <input type="email" className="profile-input"/>
          <p>Change Password?</p>
          <FilledButton text="Save Changes" />
        </form>
      </div>
    </>
  );
}

export default Profile;
