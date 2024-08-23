import React, { useState } from "react";
import "./styles/ConsultantForm.css";
import Header from "../components/Header";
import consultant from "../images/consultant.png";
import FilledButton from "../components/FilledButton";
import axios from "axios";
function ConsultantsForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name,
        email,
        password,
        phoneNumber,
        experience,
        description,
        profilePhoto,
      };

      const response = await axios.post(
        "http://localhost:8000/api/register",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Consultant registered:", response.data);
    } catch (error) {
      console.error("Error registering consultant:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="journals-form-container">
        <div className="journals-left">
          <img src={consultant} className="journals-img" alt="Consultant" />
        </div>
        <div className="journals-right">
          <form className="journals-form" onSubmit={handleSubmit}>
            <label className="journals-label">Name</label>
            <input
              className="journals-input"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="journals-label">Email</label>
            <input
              className="journals-input"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="journals-label">Password</label>
            <input
              className="journals-input"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="journals-label">Phone Number</label>
            <input
              className="journals-input"
              type="text"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <label className="journals-label">Experience</label>
            <input
              className="journals-input"
              type="text"
              placeholder="Enter Experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
            <label className="journals-label">Description</label>
            <textarea
              className="journals-input"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="journals-label">Profile Photo</label>
            <input
              type="file"
              onChange={(e) => setProfilePhoto(e.target.files[0])}
            />
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
