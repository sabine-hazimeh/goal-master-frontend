import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";
import "./styles/EmotionRecognition.css";
import FilledButton from "../components/FilledButton";

const EmotionRecognition = ({ setEmotion, onClose, sendEmotion }) => {
  const videoRef = useRef(null);
  const [detectedEmotion, setDetectedEmotion] = useState("");

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error("Error accessing webcam: ", err));
    };

    const detectEmotions = async () => {
      if (videoRef.current) {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceExpressions();

        if (detections.length > 0) {
          const expressions = detections[0].expressions;
          const dominantEmotion = Object.keys(expressions).reduce((a, b) =>
            expressions[a] > expressions[b] ? a : b
          );
          setDetectedEmotion(dominantEmotion);
        }
      }
    };

    loadModels();
    const intervalId = setInterval(detectEmotions, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = () => {
    setEmotion(detectedEmotion);
    onClose();

    if (sendEmotion) {
      axios
        .post(
          "http://localhost:8000/api/emotions",
          {
            emotion: detectedEmotion,
            type: "detected",
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("Emotion sent successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error sending emotion:", error);
        });
    }
  };

  return (
    <div className="emotion-container">
      <video ref={videoRef} autoPlay className="video" />
      <p>Detected Emotion: {detectedEmotion}</p>
      <FilledButton text="Submit" onClick={handleSubmit}></FilledButton>
    </div>
  );
};

export default EmotionRecognition;
