import React from "react";
import "./styles/JournalsForm.css";
import Header from "../components/Header";
import woman from "../images/planning-woman.png";
import FilledButton from "../components/FilledButton";
const JournalsForm = () => {
  return (
    <>
      <Header />
      <div className="journals-form-container">
        <div className="journals">
            <p className="journals-title">Today’s Journal</p>
            <p className="journals-text">Please fill out the form below to capture your thoughts and experiences for today.</p>
        </div>
        <div className="journals-left">
          <img src={woman} className="journals-img"></img>
        </div>
        <div className="journals-right">
          <form className="journals-form">
            <label className="journals-label">Dominant Emotions</label>
            <input
              className="journals-input"
              type="text"
              placeholder="Enter Emotions"
            />
            <label className="journals-label">Overall mood</label>
            <input
              className="journals-input"
              type="text"
              placeholder="Enter Mood"
            />
            <label className="journals-label">Overall productivity</label>
            <input
              className="journals-input"
              type="text"
              placeholder="Enter Productivity"
            />
            <label className="journals-label">Overall focus</label>
            <input
              className="journals-input"
              type="text"
              placeholder="Enter Focus"
            />
            <label className="journals-label">Description</label>
            <textarea
              className="journals-input"
              type="text"
              placeholder="Enter Description"
            />
            <div className="journals-button-container">
            <FilledButton
              text="Submit"
              onClick={() => {}}
              className="journals-button"
            />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default JournalsForm;
