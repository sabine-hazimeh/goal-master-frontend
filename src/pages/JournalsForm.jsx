import React, { useState } from "react";
import "./styles/JournalsForm.css";
import axios from "axios";
import { toast } from "react-toastify";
import EmotionRecognitionModal from "../components/EmotionRecognitionModal"; // Import separate EmotionRecognitionModal component

const JournalsForm = () => {
  const [mood, setMood] = useState("");
  const [focus, setFocus] = useState("");
  const [productivity, setProductivity] = useState("");
  const [description, setDescription] = useState("");
  const [emotion, setEmotion] = useState("");
  const [isEmotionModalOpen, setIsEmotionModalOpen] = useState(false); // Separate state for emotion modal

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
      setMood("");
      setProductivity("");
      setFocus("");
      setDescription("");
      setEmotion("");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(`Failed to add journal: ${error.response.data.message}`);
      } else {
        toast.error("Failed to add journal");
      }
    }
  };

  const toggleEmotionModal = () => {
    setIsEmotionModalOpen(!isEmotionModalOpen);
  };

  return (
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
      <p className="emotion-recognition-text" onClick={toggleEmotionModal}>
        Want to detect emotion automatically?
      </p>

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
        <button type="submit" className="journal-button">
          Submit
        </button>
      </div>

      {isEmotionModalOpen && (
        <EmotionRecognitionModal
          isOpen={isEmotionModalOpen}
          onClose={toggleEmotionModal}
          setEmotion={setEmotion}
        />
      )}
    </form>
  );
};

export default JournalsForm;
