import React, { useState } from "react";
import "./styles/JournalsForm.css";
import Header from "../components/Header";
import woman from "../images/laptop.png";
import FilledButton from "../components/FilledButton";
import axios from "axios";
const JournalsForm = () => {
  const [mood, setMood] = useState("");
  const [focus, setFocus] = useState("");
  const [productivity, setProductivity] = useState("");
  const [description, setDescription] = useState("");
  const handleAddNewJournal = async () => {
    const token = localStorage.getItem("Token");
    if (!token) {
        console.error("No authentication token found");
        return;
    }
    try {
        const response = await axios.post(
            "http://localhost:8000/api/journal",
            {
                mood,
                productivity,
                description,
                focus,
                emotion_id: 1,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json" 
                },
            }
        );
        console.log("Journal added successfully", response.data);
    } catch (error) {
        console.error("Error adding journal:", error);
    }
};
  return (
    <>
      <Header />
      <div className="journals">
            <p className="journals-title">Today's Journal</p>
            <p className="journals-form-text">Please fill out the form below to capture your thoughts and experiences for today.</p>
        </div>
      <div className="journals-form-container">
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
