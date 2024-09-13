import React from "react";
import EmotionRecognition from "../pages/EmotionRecognition";
import "./styles/EmotionRecognitionModal.css";

const EmotionRecognitionModal = ({
  isOpen,
  onClose,
  setEmotion,
  sendEmotion,
}) => {
  if (!isOpen) return null;

  return (
    <div className="emotion-modal-overlay">
      <div className="emotion-modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <EmotionRecognition
          setEmotion={setEmotion}
          onClose={onClose}
          sendEmotion={sendEmotion}
        />
      </div>
    </div>
  );
};

export default EmotionRecognitionModal;
