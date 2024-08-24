import React, { useState } from "react";
import "./styles/GoalsForm.css";
import Header from "../components/Header";
import Goal from "../images/goal.png";

function GoalsForm() {
  const [category, setCategory] = useState({
    finance: false,
    health: false,
    education: false,
  });

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
            <form className="goals-form">
              <h3>Finance Goals</h3>
              <label className="goals-label">Income</label>
              <input
                type="number"
                name="income"
                className="goals-input"
                placeholder="Enter Income"
              />

              <label className="goals-label">Savings</label>
              <input
                type="number"
                name="savings"
                className="goals-input"
                placeholder="Enter Savings"
              />

              <label className="goals-label">Expenses</label>
              <input
                type="number"
                name="expenses"
                className="goals-input"
                placeholder="Enter Expenses"
              />

              <label className="goals-label">Target</label>
              <input
                type="number"
                name="target"
                className="goals-input"
                placeholder="Enter Target"
              />

              <label className="goals-label">Target Date</label>
              <input type="date" name="target_date" className="goals-input" />
            </form>
          )}
          {category.health && (
            <form className="goals-form">
              <h3>Health Goals</h3>
              <label className="goals-label">Age</label>
              <input
                type="number"
                name="age"
                className="goals-input"
                placeholder="Enter Age"
              />
              <label className="goals-label">Gender</label>
              <select name="gender" className="goals-input">
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
              />
              <label className="goals-label">Current Weight</label>
              <input
                type="number"
                step="0.01"
                name="current_weight"
                className="goals-input"
                placeholder="Enter Current Weight"
              />
              <label className="goals-label">Desired Weight</label>
              <input
                type="number"
                step="0.01"
                name="desired_weight"
                className="goals-input"
                placeholder="Enter Desired Weight"
              />
              <label className="goals-label">Medical Conditions</label>
              <input
                type="text"
                name="medical_conditions"
                className="goals-input"
                placeholder="Enter Medical Conditions"
              />
              <label className="goals-label">Time Horizon</label>
              <input type="date" name="time_horizon" className="goals-input" />
            </form>
          )}
          {category.education && (
            <form className="goals-form">
              <h3>Education Goals</h3>
              <label className="goals-label">Goal</label>
              <input
                type="text"
                name="goal"
                className="goals-input"
                placeholder="Enter Goal"
              />
              <label className="goals-label">Current Knowledge</label>
              <input
                type="text"
                name="current_knowledge"
                className="goals-input"
                placeholder="Enter Current Knowledge"
              />
              <label className="goals-label">Available Days</label>
              <input
                type="number"
                name="available_days"
                className="goals-input"
                placeholder="Enter Available Days"
              />
              <label className="goals-label">Available Hours</label>
              <input
                type="number"
                name="available_hours"
                className="goals-input"
                placeholder="Enter Available Hours"
              />
              <label className="goals-label">Time Horizon</label>
              <input type="date" name="time_horizon" className="goals-input" />
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default GoalsForm;
