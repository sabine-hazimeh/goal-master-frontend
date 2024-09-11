import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import "./styles/EmotionRecognition.css";

const EmotionRecognition = ({ setEmotion, onClose }) => {
  const videoRef = useRef(null);

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
          onClose();
        }
      }
    };

    loadModels();
    const intervalId = setInterval(detectEmotions, 1000);
    return () => clearInterval(intervalId);
  }, [setEmotion, onClose]);

  return (
    <div className="emotion-container">
      <video ref={videoRef} autoPlay className="video" />
    </div>
  );
};

export default EmotionRecognition;
