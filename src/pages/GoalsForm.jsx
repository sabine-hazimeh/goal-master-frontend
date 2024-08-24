import React, { useState } from "react";
import "./styles/GoalsForm.css";
import Header from "../components/Header";
import Goal from "../images/goal.png";
import FilledButton from "../components/FilledButton";
import axios from "axios";

function GoalsForm() {
  const [category, setCategory] = useState({
    finance: false,
    health: false,
    education: false,
  });

  const [formData, setFormData] = useState({});

  function handleChange(e) {
    const { name, checked } = e.target;
    if (checked) {
      setCategory({
        finance: name === "finance",
        health: name === "health",
        education: name === "education",
      });
    } else {
      setCategory({
        finance: false,
        health: false,
        education: false,
      });
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let url = "";

    if (category.finance) {
      url = "http://localhost:8000/api/finance";
    } else if (category.health) {
      url = "http://localhost:8000/api/health";
    } else if (category.education) {
      url = "http://localhost:8000/api/education";
    }

    const token = localStorage.getItem("Token");
    axios
      .post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Goal submitted successfully:", response.data);
      })
      .catch((error) => {
        console.error("There was an error submitting the goal!", error);
      });
  }

  return (
    <>
      <Header />
      <div className="goals-form-container">
        <div className="goals-form-left">
          <form>
            <label>
              <input
                type="checkbox"
                name="finance"
                checked={category.finance}
                onChange={handleChange}
              />
              Finance
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="health"
                checked={category.health}
                onChange={handleChange}
              />
              Health
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="education"
                checked={category.education}
                onChange={handleChange}
              />
              Education
            </label>
          </form>
          <div className="goals-form-img">
            <img src={Goal} className="goals-form-image" alt="Goal" />
          </div>
        </div>
        <div className="goals-form-right">
          {category.finance && (
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
          {category.health && (
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
          {category.education && (
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
