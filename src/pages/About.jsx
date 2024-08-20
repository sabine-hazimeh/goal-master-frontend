import React from "react";
import "./styles/About.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import man from "../images/working-man.png";
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
            <br /> At <b>GoalMaster</b>, we believe that every individual has
            the potential to reach their goals, whether they are financial,
            personal, or professional.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
