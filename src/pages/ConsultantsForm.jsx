import React, { useState } from "react";
import "./styles/ConsultantForm.css";
import Header from "../components/Header";
import consultant from "../images/consultant.png";
import FilledButton from "../components/FilledButton";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone_number", phoneNumber);
    formData.append("experience", experience);
    formData.append("description", description);
    if (profilePhoto) {
      formData.append("profile_photo", profilePhoto);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register/consultant",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Consultant registered successfully!");
      console.log("Consultant registered:", response.data);
    } catch (error) {
      toast.error("Error registering consultant.");
      console.error(
        "Error registering consultant:",
        error.response?.data || error.message
      );
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
            <h3 className="journals-title">Add New Consultant</h3>
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
              type="number" 
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
      <ToastContainer />
    </>
  );
}

export default ConsultantsForm;
