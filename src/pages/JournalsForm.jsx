import React, { useState } from "react";
import "./styles/JournalsForm.css";
import Header from "../components/Header";
// import woman from "../images/laptop.png";
import FilledButton from "../components/FilledButton";
import axios from "axios";
import { toast } from "react-toastify";

const JournalsForm = () => {
  const [mood, setMood] = useState("");
  const [focus, setFocus] = useState("");
  const [productivity, setProductivity] = useState("");
  const [description, setDescription] = useState("");
  const [emotion, setEmotion] = useState("");

  const handleAddNewJournal = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("Token");
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    try {
      const journalResponse = await axios.post(
        "http://localhost:8000/api/journal",
        {
          mood,
          productivity,
          focus,
          description,
          emotion,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Journal added successfully");
      console.log("Journal added successfully", journalResponse.data);

      setMood("");
      setProductivity("");
      setFocus("");
      setDescription("");
      setEmotion("");
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error adding journal:", error.response.data);
        toast.error(`Failed to add journal: ${error.response.data.message}`);
      } else {
        console.error("Error adding journal:", error.message);
        toast.error("Failed to add journal");
      }
    }
  };

  return (
    <>
      <div className="journals-form-container">
        <div className="journals-right">
          <form className="journals-form" onSubmit={handleAddNewJournal}>
            <h3 className="journals-title">Add New Journal</h3>
            <label className="journals-label">Emotion</label>
            <input
              className="journals-input"
              type="text"
              placeholder="Enter Emotion"
              value={emotion}
              onChange={(e) => setEmotion(e.target.value)}
            />
            <label className="journals-label">Overall mood</label>
            <input
              className="journals-input"
              type="text"
              placeholder="Enter Mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            />
            <label className="journals-label">Overall productivity</label>
            <input
              className="journals-input"
              type="text"
              placeholder="Enter Productivity"
              value={productivity}
              onChange={(e) => setProductivity(e.target.value)}
            />
            <label className="journals-label">Overall focus</label>
            <input
              className="journals-input"
              type="text"
              placeholder="Enter Focus"
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
            />
            <label className="journals-label">Description</label>
            <textarea
              className="journals-input"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="journals-button-container">
              <FilledButton text="Submit" className="journals-button" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default JournalsForm;
