import React from "react";
import "./styles/GoalsForm.css";
import Header from "../components/Header";
import Goal from "../images/goal.png";
function GoalsForm() {
  return (
    <>
      <Header />
      <div className="goals-form">
        <div className="goals-form-left">
          <form>
            <label>
              <input type="checkbox" name="finance" value="finance" />
              Finance
            </label>
            <br />
            <label>
              <input type="checkbox" name="health" value="health" />
              Health
            </label>
            <br />
            <label>
              <input type="checkbox" name="education" value="education" />
              Education
            </label>
          </form>
          <div className="goals-form-img">
            <img src={Goal} className="goals-form-image"></img>
          </div>
        </div>
        <div className="goals-form-right">
          <form className="goals-form">
            <h3>Finance Goals</h3>
            <label>
              Income: <input type="number" name="income" />
            </label>
            <br />
            <label>
              Savings: <input type="number" name="savings" />
            </label>
            <br />
            <label>
              Expenses: <input type="number" name="expenses" />
            </label>
            <br />
            <label>
              Target: <input type="number" name="target" />
            </label>
            <br />
            <label>
              Target Date: <input type="date" name="target_date" />
            </label>
          </form>
          <form className="goals-form">
            <h3>Health Goals</h3>
            <label>
              Age: <input type="number" name="age" />
            </label>
            <br />
            <label>
              Gender:
              <select name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <br />
            <label>
              Height: <input type="number" step="0.01" name="height" />
            </label>
            <br />
            <label>
              Current Weight:{" "}
              <input type="number" step="0.01" name="current_weight" />
            </label>
            <br />
            <label>
              Desired Weight:{" "}
              <input type="number" step="0.01" name="desired_weight" />
            </label>
            <br />
            <label>
              Medical Conditions:{" "}
              <input type="text" name="medical_conditions" />
            </label>
            <br />
            <label>
              Time Horizon: <input type="date" name="time_horizon" />
            </label>
          </form>
          <form className="education-form">
            <h3>Education Goals</h3>
            <label>
              Goal: <input type="text" name="goal" />
            </label>
            <br />
            <label>
              Current Knowledge: <input type="text" name="current_knowledge" />
            </label>
            <br />
            <label>
              Available Days: <input type="number" name="available_days" />
            </label>
            <br />
            <label>
              Available Hours: <input type="number" name="available_hours" />
            </label>
            <br />
            <label>
              Time Horizon: <input type="date" name="time_horizon" />
            </label>
          </form>
        </div>
      </div>
    </>
  );
}

export default GoalsForm;
