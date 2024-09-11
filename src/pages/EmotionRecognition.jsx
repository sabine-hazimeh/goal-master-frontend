import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const EmotionRecognition = () => {
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
  }, []);

  return <div></div>;
};

export default EmotionRecognition;
