import React, { useState } from "react";
import "./styles/GoalsForm.css";
import Header from "../components/Header";
import Goal from "../images/goal.png";
import FilledButton from "../components/FilledButton";
import axios from "axios";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
function GoalsForm() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [modalContent, setModalContent] = useState("");
  const [educationGoalId, setEducationGoalId] = useState(null);
  const navigate = useNavigate();
  function handleChange(e) {
    const { name } = e.target;
    if (selectedCategory !== name) {
      setModalContent(null);
    }
    setSelectedCategory(selectedCategory === name ? null : name);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let url = "";
    if (selectedCategory === "finance") {
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
      if (!apiKey) {
        console.error("API key is missing.");
        return;
      }

      const currentDate = new Date();
      const targetDate = new Date(formData.target_date);
      const monthsRemaining =
        (targetDate.getFullYear() - currentDate.getFullYear()) * 12 +
        targetDate.getMonth() -
        currentDate.getMonth();

      const openAiData = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Based on the following financial information: income: ${formData.income}, savings: ${formData.savings}, expenses: ${formData.expenses}, target: ${formData.target}, target date(in month): ${monthsRemaining}. Calculate the monthly savings needed to reach the target by the target date. Is this goal reachable? if no, explain why. your response should be formatted in a list of bullet points. Each list item must be on a new line include \n whenever possible.`,
          },
        ],
        max_tokens: 300,
        temperature: 0.7,
      };

      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          openAiData,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("OpenAI Response:", response.data);
        setModalContent(response.data.choices[0].message.content);
        setIsModalOpen(true);
      } catch (error) {
        console.error("There was an error with the OpenAI request:", error);
        return;
      }
      url = "http://localhost:8000/api/finance";
    } else if (selectedCategory === "health") {
      url = "http://localhost:8000/api/health";
      requestExerciseRecommendation();
    } else if (selectedCategory === "education") {
      url = "http://localhost:8000/api/education";
      requestRecommendation();
    }

    if (!url) {
      console.error("Category is not defined.");
      return;
    }

    const token = localStorage.getItem("Token");
    if (!token) {
      console.error("Token is missing.");
      return;
    }

    try {
      const result = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Goal submitted successfully:", result.data);
      if (selectedCategory === "education") {
        const goalId = result.data["education goal"].id;
        console.log("Education goal ID:", goalId);
        setEducationGoalId(goalId);
      }
    } catch (error) {
      console.error("There was an error submitting the goal!", error);
    }
  }
  const requestRecommendation = async () => {
    const EducationForm = {
      desired_course: formData.goal,
      available_hours_per_day: parseInt(formData.available_hours, 10),
      available_days_per_week: parseInt(formData.available_days, 10),
      target_date: formData.time_horizon,
      current_level: formData.current_knowledge,
    };
    const response = await axios.post(
      "http://localhost:5000/recommend",
      EducationForm
    );

    if (response.data.recommended_courses) {
      setRecommendedCourses(response.data.recommended_courses);
      setIsModalOpen(true);
    } else {
      console.log(response.data.message);
    }
  };
  const requestExerciseRecommendation = async () => {
    const healthData = {
      age: parseInt(formData.age, 10),
      gender: formData.gender,
      height: parseFloat(formData.height),
      weight: parseFloat(formData.current_weight),
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/predict",
        healthData
      );
      console.log(response.data);
      setModalContent(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error(
        "There was an error getting the exercise recommendation:",
        error
      );
    }
  };

  async function handleAddCourse(course) {
    const token = localStorage.getItem("Token");
    if (!token) {
      console.error("Token is missing.");
      return;
    }

    const courseData = {
      title: course["Course Title"],
      level: course["Level"],
      hours: course["Duration to complete (Approx.)"],
      url: course["Course Url"],
      education_id: educationGoalId,
    };

    console.log(courseData);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/coursera",
        courseData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Course added successfully:", response.data);
    } catch (error) {
      console.error("Error adding the course:", error);
    }
  }

  return (
    <>
      <Header />
      {selectedCategory === "education" && (
      <div className="goals-form-button">
        <div className="goals-form-button-container">
          <FilledButton text="View Goals" onClick={() => navigate("/goals")} />
        </div>
      </div>
      )}
      <div className="goals-form-container">
        <div className="goals-form-left">
          <form>
            <label className="goals-checkbox-label">
              <input
                type="checkbox"
                name="finance"
                checked={selectedCategory === "finance"}
                onChange={handleChange}
              />
              <span></span> Finance
            </label>

            <br />
            <label className="goals-checkbox-label">
              <input
                type="checkbox"
                name="health"
                checked={selectedCategory === "health"}
                onChange={handleChange}
              />
              <span></span> Health
            </label>
            <br />
            <label className="goals-checkbox-label">
              <input
                type="checkbox"
                name="education"
                checked={selectedCategory === "education"}
                onChange={handleChange}
              />
              <span></span> Education
            </label>
          </form>
          <div className="goals-form-img">
            <img src={Goal} className="goals-form-image" alt="Goal" />
          </div>
        </div>
        <div className="goals-form-right">
          {selectedCategory === "finance" && (
            <form className="goals-form" onSubmit={handleSubmit}>
              <h3 className="goals-form-title">Finance Goals</h3>
              <label className="goals-label">Income</label>
              <input
                type="number"
                name="income"
                className="goals-input"
                placeholder="Enter Income"
                onChange={handleInputChange}
              />

              <label className="goals-label">Savings</label>
              <input
                type="number"
                name="savings"
                className="goals-input"
                placeholder="Enter Savings"
                onChange={handleInputChange}
              />

              <label className="goals-label">Expenses</label>
              <input
                type="number"
                name="expenses"
                className="goals-input"
                placeholder="Enter Expenses"
                onChange={handleInputChange}
              />

              <label className="goals-label">Target</label>
              <input
                type="number"
                name="target"
                className="goals-input"
                placeholder="Enter Target"
                onChange={handleInputChange}
              />

              <label className="goals-label">Target Date</label>
              <input
                type="date"
                name="target_date"
                className="goals-input"
                onChange={handleInputChange}
              />
              <div className="goals-button-container">
                <FilledButton text="Submit" className="goals-form-button" />
              </div>
            </form>
          )}
          {selectedCategory === "finance" && (
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <div className="goals-plan-container">
                <h3 className="finance-form-title">Your Financial Plan</h3>
                <p>{modalContent}</p>
              </div>
            </Modal>
          )}
          {selectedCategory === "health" && (
            <form className="goals-form" onSubmit={handleSubmit}>
              <h3 className="goals-form-title">Health Goals</h3>
              <label className="goals-label">Age</label>
              <input
                type="number"
                name="age"
                className="goals-input"
                placeholder="Enter Age"
                onChange={handleInputChange}
              />
              <label className="goals-label">Gender</label>
              <select
                name="gender"
                className="goals-input"
                onChange={handleInputChange}
              >
                <option value="male">Female</option>
                <option value="female">Male</option>
              </select>
              <label className="goals-label">Height</label>
              <input
                type="number"
                step="0.01"
                name="height"
                className="goals-input"
                placeholder="Enter Height"
                onChange={handleInputChange}
              />
              <label className="goals-label">Current Weight</label>
              <input
                type="number"
                step="0.01"
                name="current_weight"
                className="goals-input"
                placeholder="Enter Current Weight"
                onChange={handleInputChange}
              />
              <label className="goals-label">Desired Weight</label>
              <input
                type="number"
                step="0.01"
                name="desired_weight"
                className="goals-input"
                placeholder="Enter Desired Weight"
                onChange={handleInputChange}
              />
              <label className="goals-label">Medical Conditions</label>
              <input
                type="text"
                name="medical_conditions"
                className="goals-input"
                placeholder="Enter Medical Conditions"
                onChange={handleInputChange}
              />
              <label className="goals-label">Time Horizon</label>
              <input
                type="date"
                name="time_horizon"
                className="goals-input"
                onChange={handleInputChange}
              />
              <div className="goals-button-container">
                <FilledButton text="Submit" className="goals-form-button" />
              </div>
            </form>
          )}
          {selectedCategory === "health" && (
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <div className="goals-plan-container">
                <h3 className="education-modal-title">Your Exercise Plan</h3>
                {modalContent ? (
                  <div className="health-modal">
                    <p>
                      <span className="health-modal-item">{modalContent.predicted_plan}</span> is the plan that
                      fits your case
                    </p>
                    <p>
                      <b>Explanation: </b> {modalContent.explanation}
                    </p>
                    <p>
                      <b>Ideal Times: </b>
                      {modalContent.ideal_times}
                    </p>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </Modal>
          )}

          {selectedCategory === "education" && (
            <form className="goals-form" onSubmit={handleSubmit}>
              <h3 className="goals-form-title">Education Goals</h3>
              <label className="goals-label">Goal</label>
              <input
                type="text"
                name="goal"
                className="goals-input"
                placeholder="Enter Goal"
                onChange={handleInputChange}
              />
              <label className="goals-label">Current Knowledge</label>
              <select
                name="current_knowledge"
                className="goals-input"
                onChange={handleInputChange}
              >
                <option value="">Select Knowledge Level</option>
                <option value="Beginner level">Beginner Level</option>
                <option value="Intermediate level">Intermediate Level</option>
                <option value="Advanced level">Advanced Level</option>
              </select>

              <label className="goals-label">Available Days</label>
              <input
                type="number"
                name="available_days"
                className="goals-input"
                placeholder="Enter Available Days"
                onChange={handleInputChange}
              />
              <label className="goals-label">Available Hours</label>
              <input
                type="number"
                name="available_hours"
                className="goals-input"
                placeholder="Enter Available Hours"
                onChange={handleInputChange}
              />
              <label className="goals-label">Time Horizon</label>
              <input
                type="date"
                name="time_horizon"
                className="goals-input"
                onChange={handleInputChange}
              />
              <div className="goals-button-container">
                <FilledButton text="Submit" className="goals-form-button" />
              </div>
            </form>
          )}
          {selectedCategory === "education" && (
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <h3 className="education-modal-title">Recommended Courses</h3>
              <ul>
                {recommendedCourses.map((course, index) => (
                  <li key={index} className="education-modal-item">
                    <strong>Course Title:</strong> {course["Course Title"]}{" "}
                    <br />
                    <strong>Duration:</strong>{" "}
                    {course["Duration to complete (Approx.)"]} {"hours"} <br />
                    <strong>Level:</strong> {course["Level"]}
                    <br />
                    <strong>URL: </strong>
                    <a
                      href={course["Course Url"]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {course["Course Url"]}
                    </a>
                    <div className="add-course-button-container">
                      <button
                        className="add-course-button"
                        onClick={() => handleAddCourse(course)}
                      >
                        Add Course
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
}

export default GoalsForm;
