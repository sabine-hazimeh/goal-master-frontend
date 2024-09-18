import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./styles/ConsultantForm.css";
import consultant from "../images/consultant.png";
import FilledButton from "../components/FilledButton";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateConsultant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    experience: 0,
    description: "",
    profile_photo: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get(
          `http://ec2-13-38-78-41.eu-west-3.compute.amazonaws.com/api/consultants/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setProfile(response.data.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        toast.error("Failed to fetch consultant data.");
      }
    }
    fetchProfile();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("phone_number", profile.phone_number);
    formData.append("experience", profile.experience);
    formData.append("description", profile.description);

    if (profile.password) {
      formData.append("password", profile.password);
    }

    if (profile.profile_photo) {
      formData.append("profile_photo", profile.profile_photo);
    }

    try {
      const response = await axios.post(
        `http://ec2-13-38-78-41.eu-west-3.compute.amazonaws.com/api/consultants/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Consultant profile updated successfully!");
      navigate("/admin-consultants");
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
      <div className="consultants-form-container">
        <div className="consultants-left">
          <img src={consultant} className="consultants-img" alt="Consultant" />
        </div>
        <div className="consultants-right">
          <form className="consultants-form" onSubmit={handleSubmit}>
            <h3 className="consultants-title">Update Consultant Profile</h3>
            <label className="consultants-label">Name</label>
            <input
              className="consultants-input"
              type="text"
              placeholder="Enter Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />

            <label className="consultants-label">Email</label>
            <input
              className="consultants-input"
              type="email"
              placeholder="Enter Email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
            <label className="consultants-label">Password</label>
            <input
              className="consultants-input"
              type="password"
              placeholder="Enter Password"
              value={profile.password}
              onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })
              }
            />
            <label className="consultants-label">Phone Number</label>
            <input
              className="consultants-input"
              type="text"
              placeholder="Enter Phone Number"
              value={profile.phone_number}
              onChange={(e) =>
                setProfile({ ...profile, phone_number: e.target.value })
              }
            />
            <label className="consultants-label">Experience</label>
            <input
              className="consultants-input"
              type="number"
              placeholder="Enter Experience"
              value={profile.experience}
              onChange={(e) =>
                setProfile({ ...profile, experience: e.target.value })
              }
            />
            <label className="consultants-label">Description</label>
            <textarea
              className="consultants-input"
              placeholder="Enter Description"
              value={profile.description}
              onChange={(e) =>
                setProfile({ ...profile, description: e.target.value })
              }
            />
            <label className="consultants-label">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setProfile({ ...profile, profile_photo: e.target.files[0] })
              }
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
};

export default UpdateConsultant;
