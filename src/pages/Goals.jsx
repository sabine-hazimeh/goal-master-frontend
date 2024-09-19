import React, { useEffect, useState } from "react";
import "./styles/Goals.css";
import Header from "../components/Header";
import axios from "axios";
import Modal from "../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(
          "http://ec2-13-38-78-41.eu-west-3.compute.amazonaws.com/api/goals",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setGoals(response.data.educationGoal);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);
  const handleDeleteGoal = async (goal_id) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      try {
        await axios.delete(
          `http://ec2-13-38-78-41.eu-west-3.compute.amazonaws.com/api/education/${goal_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        setGoals((prevGoals) =>
          prevGoals.filter((goal) => goal.id !== goal_id)
        );
        toast.success("Goal deleted successfully!");
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete goal. Please try again.");
      }
    }
  };
  

  const handleViewDetails = async (education_id) => {
    try {
      const response = await axios.get(
        `http://ec2-13-38-78-41.eu-west-3.compute.amazonaws.com/api/coursera/education/${education_id}`,
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
              <FontAwesomeIcon
                icon={faTrash}
                className="delete-icon"
                onClick={() => handleDeleteGoal(goal.id)}
              />
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
              <div className="text-link-wrapper">
                <p
                  className="users-text-link"
                  onClick={() => handleViewDetails(goal.id)}
                >
                  View Details
                </p>
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
      <ToastContainer /> 
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
                <p>
                  Check course details from{" "}
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="course-link"
                  >
                    here
                  </a>
                </p>
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
