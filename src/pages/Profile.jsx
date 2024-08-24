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
        <img src={Default} className="profile-img" alt="Profile" />
        <FilledButton text="Change picture" />
        <EmptyButton text="Delete picture" />
        <form className="profile-form">
          <label>Username</label>
          <input type="text" />
          <label>email</label>
          <input type="email" />
          <p>Change Password?</p>
          <FilledButton text="Save Changes" />
        </form>
      </div>
    </>
  );
}

export default Profile;
