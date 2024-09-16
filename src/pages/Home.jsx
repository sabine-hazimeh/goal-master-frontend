import React, { useState } from "react";
import GoalImage from "../images/goal-achievement.png";
import "./styles/Home.css";
import FilledButton from "../components/FilledButton";
import EmptyButton from "../components/EmptyButton";
import Header from "../components/Header";
import Scan from "../images/face-scan.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faBookOpen,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import JournalsForm from "./JournalsForm";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="home">
        <div className="home-intro">
          <div className="intro-left">
            <p className="intro-title">
              Reach Your
              <br />
              Goal Easily!
            </p>
            <p className="intro-text">
              Get personalized recommendations, daily journaling, and AI-driven
              insights to stay motivated and track your progress every step of
              the way. Start your journey towards success today!
            </p>
            <div className="intro-buttons">
              <FilledButton
                text="Get Started!"
                onClick={() => navigate("/goals-form")}
              />

              <EmptyButton
                text="Free Consultation"
                onClick={() => navigate("/consultants")}
              />
            </div>
          </div>
          <div className="intro-right">
            <img src={GoalImage} className="intro-img" alt="Goal Achievement" />
          </div>
        </div>
        <div className="face_scan">
          <div className="scan_right">
            <img src={Scan} className="scan_img" alt="Face Scan" />
          </div>
          <div className="scan_left">
            <p className="intro-title">
              Feel Understood <br /> with Our Emotion <br /> Recognition
            </p>
            <p className="intro-text">
              Facial Emotion Recognition is a cutting-edge technology that uses
              computer vision and machine learning to analyze facial expressions
              and detect emotions like happiness, sadness, anger, and surprise
              in real-time. Our system can recognize these emotions with high
              accuracy, allowing us to better understand how you're feeling.
            </p>
              <FilledButton text="Try it now!" onClick={openModal} />
          </div>
        </div>
        <div className="Features_container">
          <p className="features_title">Why Goal Master?</p>
          <div className="features">
            <div className="feature">
              <FontAwesomeIcon icon={faBullseye} className="feature_icon" />
              <p>
                Set and achieve your unique goals with personalized
                recommendations.
              </p>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faBookOpen} className="feature_icon" />
              <p>
                Capture your thoughts and experiences daily to reflect and grow
                over time.
              </p>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faBrain} className="feature_icon" />
              <p>
                AI-driven insights to stay motivated and track your progress
                effectively.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <JournalsForm />
      </Modal>
    </>
  );
};

export default Home;
