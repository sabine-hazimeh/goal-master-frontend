import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const EmotionRecognition = () => {
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
      startVideo();
    };
  }, []);

  return <div></div>;
};

export default EmotionRecognition;
