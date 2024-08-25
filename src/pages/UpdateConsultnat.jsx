import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./styles/ConsultantForm.css";
import consultant from "../images/consultant.png";
import FilledButton from "../components/FilledButton";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateConsultant = () => {
  const { id } = useParams();
  const [profilePhotoURL, setProfilePhotoURL] = useState("");
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    experience: "",
    description: "",
    profilePhoto: "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/consultants/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setProfile(response.data.data);
        setProfilePhotoURL(response.data.profile_photo);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        toast.error("Failed to fetch consultant data.");
      }
    }
    fetchProfile();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jsonData = {
      name: profile.name,
      email: profile.email,
      phone_number: profile.phone_number,
      experience: profile.experience,
      description: profile.description,
    };

    if (profile.password) {
      jsonData.password = profile.password;
    }

    try {
      await axios.put(`http://localhost:8000/api/consultants/${id}`, jsonData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Consultant profile updated successfully!");
    } catch (error) {
      toast.error("Error updating consultant profile.");
      console.error(
        "Error updating profile:",
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
            <h3 className="journals-title">Update Consultant Profile</h3>
            <label className="journals-label">Name</label>
            <input
              className="journals-input"
              type="text"
              placeholder="Enter Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <label className="journals-label">Email</label>
            <input
              className="journals-input"
              type="email"
              placeholder="Enter Email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
            <label className="journals-label">Password</label>
            <input
              className="journals-input"
              type="password"
              placeholder="Enter Password"
              value={profile.password}
              onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })
              }
            />
            <label className="journals-label">Phone Number</label>
            <input
              className="journals-input"
              type="text"
              placeholder="Enter Phone Number"
              value={profile.phone_number} 
              onChange={(e) =>
                setProfile({ ...profile, phone_number: e.target.value })
              }
            />
            <label className="journals-label">Experience</label>
            <input
              className="journals-input"
              type="number"
              placeholder="Enter Experience"
              value={profile.experience}
              onChange={(e) =>
                setProfile({ ...profile, experience: e.target.value })
              }
            />
            <label className="journals-label">Description</label>
            <textarea
              className="journals-input"
              placeholder="Enter Description"
              value={profile.description}
              onChange={(e) =>
                setProfile({ ...profile, description: e.target.value })
              }
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
};

export default UpdateConsultant;
