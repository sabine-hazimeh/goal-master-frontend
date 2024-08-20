import React from "react";
import "./styles/JournalsForm.css";
import Header from "../components/Header";
import woman from "../images/planning-woman.png";
const JournalsForm = () => {
  return (
    <>
      <Header />
      <div className="journals-form">
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
          </form>
        </div>
      </div>
    </>
  );
};

export default JournalsForm;
