import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

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
    <div>
      <video ref={videoRef} autoPlay width="720" height="560" />
      <p>Detected Emotion: {emotion}</p>
    </div>
  );
};

export default EmotionRecognition;
