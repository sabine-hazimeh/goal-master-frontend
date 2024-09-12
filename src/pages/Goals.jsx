import React, { useEffect, useState } from "react";
import "./styles/Goals.css";
import Header from "../components/Header";
import axios from "axios";
import Modal from "../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faSpinner } from "@fortawesome/free-solid-svg-icons";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/goals", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
        });
        setGoals(response.data.educationGoal);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  const handleViewDetails = async (education_id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/coursera/education/${education_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSelectedGoal(response.data.courses);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="goals-container">
        {loading ? (
          <div className="Loading-wrapper">
            <div className="Loading-goals">
              <FontAwesomeIcon icon={faSpinner} spin className="Loading-icon" />
              <p>Loading goals...</p>
            </div>
          </div>
        ) : Array.isArray(goals) && goals.length > 0 ? (
          goals.map((goal) => (
            <div className="goal-card" key={goal.id}>
              <p className="goal-title">
                <b>Goal: </b>
                {goal.goal}
              </p>
              <p className="goal-description">
                <b>Current Knowledge: </b>
                {goal.current_knowledge}
              </p>
              <p className="goal-description">
                <b>Available Days: </b>
                {goal.available_days}
              </p>
              <p className="goal-description">
                <b>Available Hours: </b>
                {goal.available_hours}
              </p>
              <p className="goal-description">
                <b>Deadline: </b>
                {goal.time_horizon}
              </p>
              <div className="education-button-container">
                <button
                  className="education-button"
                  onClick={() => handleViewDetails(goal.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-goals-wrapper">
            <div className="no-goals">
              <FontAwesomeIcon icon={faBan} className="no-goals-icon" />
              <p>No Goals found.</p>
            </div>
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedGoal ? (
          <div>
            <h2 className="coursera-modal-title">Course Details</h2>
            {selectedGoal.map((course, index) => (
              <div key={index}>
                <p>
                  <strong>Course Title:</strong> {course.title}
                </p>
                <p>
                  <strong>Duration:</strong> {course.hours} hours
                </p>
                <p>
                  {" "}
                  <strong>Level:</strong> {course.level}
                </p>
                <strong>URL: </strong>
                <a href={course.url} target="_blank" rel="noopener noreferrer">
                  {course.url}
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  );
};

export default Goals;
