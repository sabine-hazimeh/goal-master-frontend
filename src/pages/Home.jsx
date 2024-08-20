import React from "react";
import GoalImage from "../images/goal-achievement.png";
import "./styles/Home.css";
import FilledButton from "../components/FilledButton";
import EmptyButton from "../components/EmptyButton";
import Header from "../components/Header";
import Scan from "../images/scan.png";
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
        <div className="scan_left"></div>


      </div>
    </>
  );
};

export default Home;
