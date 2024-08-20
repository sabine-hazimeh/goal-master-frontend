import React from "react";
import GoalImage from "../images/goal-achievement.png";
const Home = () => {
  return (
    <>
      <div className="home-intro">
        <div className="intro-left">
          <h1>
            Reach Your
            <br />
            Goal Easily!
          </h1>
          <p>
            Get personalized recommendations, daily journaling, and AI-driven
            insights to stay motivated and track your progress every step of the
            way. Start your journey towards success today!
          </p>
          <div className="intro-buttons">
            <button>Get Started!</button>
            <button>Free Consultation</button>
          </div>
        </div>
        <div className="intro-right">
            <img src={GoalImage}></img>
        </div>
      </div>
    </>
  );
};

export default Home;
