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
              <input type="checkbox" name="categories" value="finance" />
              Finance
            </label>
            <br />
            <label>
              <input type="checkbox" name="categories" value="health" />
              Health
            </label>
            <br />
            <label>
              <input type="checkbox" name="categories" value="education" />
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
        </div>
      </div>
    </>
  );
}

export default GoalsForm;
