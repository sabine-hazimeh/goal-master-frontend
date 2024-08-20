import React from "react";
import GoalImage from "../images/goal-achievement.png";
import "./styles/Home.css";
import FilledButton from "../components/FilledButton";
import EmptyButton from "../components/EmptyButton";
import Header from "../components/Header";
import Scan from "../images/face-scan.png";
const Home = () => {
  return (
    <>
      <Header />
      <div className="home-intro">
        <div className="intro-left">
          <p className="intro-title">
            Reach Your
            <br />
            Goal Easily!
          </p>
          <p className="intro-text">
            Get personalized recommendations, daily journaling, and AI-driven
            insights to stay motivated and track your progress every step of the
            way. Start your journey towards success today!
          </p>
          <div className="intro-buttons">
            <FilledButton text="Get Started!" onClick={() => {}} />
            <EmptyButton text="Free Consultation" onClick={() => {}} />
          </div>
        </div>
        <div className="intro-right">
          <img src={GoalImage} className="intro-img"></img>
        </div>
      </div>
      <div className="face_scan">
        <div className="scan_right">
          <img src={Scan} className="scan_img"></img>
        </div>
        <div className="scan_left">
          <p className="intro-title">
            Feel Understood <br /> with Our Emotion <br /> Recognition
          </p>
          <p className="intro-text">
            Facial Emotion Recognition is a cutting-edge technology that uses
            computer vision and machine learning to analyze facial expressions
            and detect emotions like happiness, sadness, anger, and surprise in
            real-time. Our system can recognize these emotions with high
            accuracy, allowing us to better understand how you're feeling.
          </p>
          <FilledButton text="Try it now!" onClick={() => {}} />
        </div>
      </div>
    </>
  );
};

export default Home;
