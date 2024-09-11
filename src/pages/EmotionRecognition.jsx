import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import "./styles/EmotionRecognition.css";
import Header from "../components/Header";

const EmotionRecognition = () => {
  const videoRef = useRef(null);
  const [emotion, setEmotion] = useState("");

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
          setEmotion(dominantEmotion);
        }
      }
    };

    loadModels();
    setInterval(detectEmotions, 1000);
  }, []);

  return (
    <>
      <Header />
      <div className="emotion-container">
        <div className="emotion-text">
          <p>Detected Emotion: {emotion}</p>
        </div>
        <video ref={videoRef} autoPlay className="video" />
      </div>
    </>
  );
};

export default EmotionRecognition;
