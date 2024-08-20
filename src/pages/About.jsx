import React from "react";
import "./styles/About.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import man from "../images/working-man.png";
import woman from "../images/young-woman.png";
const About = () => {
  return (
    <>
      <Header />
      <div className="about-upper">
        <div className="upper-left">
          <img src={man} className="upper-img"></img>
        </div>
        <div className="upper-right">
          <p className="upper-title">About Us</p>
          <p className="upper-text">
            Welcome to <b>GoalMaster</b>, your ultimate partner in achieving
            your dreams and aspirations.
            <br />
            At <b>GoalMaster</b>, we believe that every individual has the
            potential to reach their goals, whether they are financial,
            personal, or professional.
          </p>
        </div>
      </div>
      <div className="about-lower">
        <div className="lower-left">
          <p className="lower-text">
            Our mission is to provide you with the tools, insights, and support
            you need to turn your ambitions into reality. Through our innovative
            platform, we offer personalized goal-setting, daily scheduling, and
            progress tracking, all designed to help you stay focused and
            motivated.
          </p>
          <p className="lower-text">
            Thank you for choosing <b>GoalMaster</b> as your goal-setting and
            achievement partner. We are excited to be part of your journey and
            look forward to helping you reach new heights.
          </p>
          <p className="lower-text">
            Together, let's turn your dreams into reality and make every goal
            achievable.
          </p>
        </div>
        <div className="lower-right">
          <img src={woman} className="lower-img"></img>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
