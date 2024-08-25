import React, { useEffect, useState } from "react";
import "./styles/Profile.css";
import Header from "../components/Header";
import Default from "../images/default-profile.jpeg";
import FilledButton from "../components/FilledButton";
import EmptyButton from "../components/EmptyButton";
import axios from "axios";
function Profile() {
    const [profile, setProfile] = useState({});
    useEffect(() => {
       async function fetchProfile(){
        const response = await axios.get("http://localhost:8000/api/profile",{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
                "Content-Type": "application/json",
            },
        })
        setProfile(response.data);
        }
        fetchProfile();
    },[]);
  return (
    <>
      <Header />
      <div className="profile">
        <p>Profile Picture</p>
        <div className="profile-img-container">
          <img src={profile.profile_picture || Default} className="profile-img" alt="Profile" />
          <div className="profile-img-buttons">
          <FilledButton text="Change picture" />
          <EmptyButton text="Delete picture" />
          </div>
        </div>
        <form className="profile-form">
          <label>Username</label>
          <input type="text" className="profile-input" value={profile.name}/>
          <label>email</label>
          <input type="email" className="profile-input" value={profile.email}/>
          <p>Change Password?</p>
          <div className="save-button">
          <FilledButton text="Save Changes" />
          </div>
        </form>
      </div>
    </>
  );
}

export default Profile;
