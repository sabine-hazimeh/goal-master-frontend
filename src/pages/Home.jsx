import React from "react";
import GoalImage from "../images/goal-achievement.png";
import "./styles/Home.css";
import FilledButton from "../components/FilledButton";
import EmptyButton from "../components/EmptyButton";
const Home = () => {
  return (
    <>
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
    </>
  );
};

export default Home;
