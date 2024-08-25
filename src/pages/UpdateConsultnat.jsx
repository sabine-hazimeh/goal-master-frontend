import React from "react";
import Header from "../components/Header";
import "./styles/ConsultantForm.css";
import consultant from "../images/consultant.png";
import FilledButton from "../components/FilledButton";
import { ToastContainer } from "react-toastify";
const UpdateConsultnat = () => {
  return (
    <>
      <Header />
      <div className="journals-form-container">
        <div className="journals-left">
          <img src={consultant} className="journals-img" alt="Consultant" />
        </div>
        <div className="journals-right">
          <form className="journals-form">
            <h3 className="journals-title">Add New Consultant</h3>
            <label className="journals-label">Name</label>
            <input
              className="journals-input"
              type="text"
              placeholder="Enter Name"
            />
            <label className="journals-label">Email</label>
            <input
              className="journals-input"
              type="email"
              placeholder="Enter Email"
            />
            <label className="journals-label">Password</label>
            <input
              className="journals-input"
              type="password"
              placeholder="Enter Password"
            />
            <label className="journals-label">Phone Number</label>
            <input
              className="journals-input"
              type="text"
              placeholder="Enter Phone Number"
            />
            <label className="journals-label">Experience</label>
            <input
              className="journals-input"
              type="number"
              placeholder="Enter Experience"
            />
            <label className="journals-label">Description</label>
            <textarea
              className="journals-input"
              placeholder="Enter Description"
            />
            <label className="journals-label">Profile Photo</label>
            <input type="file" />
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
export default UpdateConsultnat;
