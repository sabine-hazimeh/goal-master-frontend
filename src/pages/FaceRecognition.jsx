import React from "react";
import "./styles/FaceRecognition.css";
import Header from "../components/Header";
import FilledButton from "../components/FilledButton";
import faceRecognition from "../images/face-recognition.gif";
const FaceRecognition = () => {
  return (
    <>
      <Header />
      <div className="face-recognition">
        <div className="recognition-lower">
        <p className="recognition-title">
          Discover Your <br />
          Emotional Insights
        </p>
        <p className="recognition-text">
          Unlock a deeper understanding of your emotions with our advanced face
          recognition technology. This tool helps you stay aware of your
          emotional state, guiding you towards better self-awareness and goal
          achievement.
        </p>
        <FilledButton text="Take photo" onClick={() => {}} />
        </div>
        <div className="recognition-right">
            <img src={faceRecognition} className="recognition-img"></img>
        </div>
      </div>
    </>
  );
};

export default FaceRecognition;
