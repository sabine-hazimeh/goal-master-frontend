import React, { useState } from "react";
import "./styles/ConsultantForm.css";
import Header from "../components/Header";
import consultant from "../images/consultant.png";
import FilledButton from "../components/FilledButton";
function ConsultantsForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [experience, setExperience] = useState("");
    const [description, setDescription] = useState("");
    const [profilePhoto, setProfilePhoto] = useState(null);
  
  return (
    <>
      <Header />
      <div className="journals-form-container">
        <div className="journals-left">
          <img src={consultant} className="journals-img" alt="Laptop" />
        </div>
        <div className="journals-right">
          <form className="journals-form">
            <label className="journals-label">Name</label>
            <input
              className="journals-input"
              type="text"
              placeholder="Enter Name"
            />
            <label className="journals-label">Email</label>
            <input
              className="journals-input"
              type="text"
              placeholder="Enter Email"
            />
            <label className="journals-label">Password</label>
            <input
              className="journals-input"
              type="text"
              placeholder="Enter Productivity"
            />
            <label className="journals-label">Phone Number</label>
            <input
              className="journals-input"
              type="text"
              placeholder="Enter Number"
            />
            <label className="journals-label">Experience</label>
            <input
              className="journals-input"
              type="text"
              placeholder="Enter Experience"
            />
            <label className="journals-label">Description</label>
            <textarea
              className="journals-input"
              placeholder="Enter Description"
            />
            <label className="Auth-label">Profile Photo</label>
            <input type="file" />
            <div className="journals-button-container">
              <FilledButton text="Submit" className="journals-button" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ConsultantsForm;
