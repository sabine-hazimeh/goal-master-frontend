import React, { useState } from "react";
import "./styles/ConsultantForm.css";
import Header from "../components/Header";
import consultant from "../images/consultant.png";
import FilledButton from "../components/FilledButton";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
function ConsultantsForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigate = useNavigate();

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
        "http://ec2-13-38-78-41.eu-west-3.compute.amazonaws.com/api/register/consultant",
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
      setName("");
      setEmail("");
      setPassword("");
      setPhoneNumber("");
      setExperience("");
      setDescription("");
      setProfilePhoto(null);
      document.querySelector('input[type="file"]').value = null;
      navigate("/admin-consultants");
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
      <div className="consultants-form-container">
        <div className="consultants-left">
          <img src={consultant} className="consultants-img" alt="Consultant" />
        </div>
        <div className="consultants-right">
          <form className="consultants-form" onSubmit={handleSubmit}>
            <h3 className="consultants-title">Add New Consultant</h3>
            <label className="consultants-label">Name</label>
            <input
              className="consultants-input"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="consultants-label">Email</label>
            <input
              className="consultants-input"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="consultants-label">Password</label>
            <input
              className="consultants-input"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="consultants-label">Phone Number</label>
            <input
              className="consultants-input"
              type="text"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <label className="consultants-label">Experience</label>
            <input
              className="consultants-input"
              type="number"
              placeholder="Enter Experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
            <label className="consultants-label">Description</label>
            <textarea
              className="consultants-input"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="consultants-label">Profile Photo</label>
            <input
              type="file"
              onChange={(e) => setProfilePhoto(e.target.files[0])}
            />
            <div className="consultants-button-container">
              <FilledButton text="Submit" className="consultants-button" />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default ConsultantsForm;
