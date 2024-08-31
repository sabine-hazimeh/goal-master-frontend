import React, { useState } from "react";
import "./styles/GoalsForm.css";
import Header from "../components/Header";
import Goal from "../images/goal.png";
import FilledButton from "../components/FilledButton";
import axios from "axios";

function GoalsForm() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({});
  const [plan, setPlan] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChange(e) {
    const { name } = e.target;
    if (selectedCategory !== name) {
      setPlan(null);
      setIsSubmitted(false);
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
          content: `Based on the following financial information: income: ${formData.income}, savings: ${formData.savings}, expenses: ${formData.expenses}, target: ${formData.target}, target date: ${formData.target_date}. Calculate the monthly savings needed to reach the target by the target date. Is this goal reachable? if no, explain why.`,
        },
      ],
      max_tokens: 150,
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
      setPlan(response.data.choices[0].message.content);
      setIsSubmitted(true);
    } catch (error) {
      console.error("There was an error with the OpenAI request:", error);
      return;
    }
      url = "http://localhost:8000/api/finance";
    } else if (selectedCategory === "health") {
      url = "http://localhost:8000/api/health";
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
      console.log("Recommended courses:", response.data.recommended_courses);
    } else {
      console.log(response.data.message);
    }

  }

  return (
    <>
      <Header />
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
          {!isSubmitted && selectedCategory === "finance" && (
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
          {isSubmitted && plan && selectedCategory === "finance" && (
            <div className="goals-plan-container">
              <h3>Your Financial Plan:</h3>
              <p>{plan}</p>
            </div>
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
                <option value="male">Male</option>
                <option value="female">Female</option>
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
              <input
                type="text"
                name="current_knowledge"
                className="goals-input"
                placeholder="Enter Current Knowledge"
                onChange={handleInputChange}
              />
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
        </div>
      </div>
    </>
  );
}

export default GoalsForm;
