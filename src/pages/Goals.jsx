import React, { useEffect, useState } from "react";
import "./styles/Goals.css";
import Header from "../components/Header";
import axios from "axios";
const Goals = () => {
    const [goals, setGoals] = useState([]);
    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/goals",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("Token")}`,
                            "Content-Type": "application/json",
                        }
                    }
                );
                setGoals(response.data.educationGoal);
            } catch (error) {
                console.log(error);
            }
        }

        fetchGoals();
    },[]);
    return (
        <div>
            <Header />
            <div className="goals-container">
                {goals.map((goal) => (
                    <div className="goal-card" key={goal.id}>
                        <p className="goal-title"><b>Goal: </b>{goal.goal}</p>
                        <p className="goal-description"><b>Current Knowledge: </b>{goal.current_knowledge}</p>
                        <p className="goal-description"><b>Available Days: </b>{goal.available_days}</p>
                        <p className="goal-description"><b>Available Hours: </b>{goal.available_hours}</p>
                        <p className="goal-description"><b>Deadline: </b>{goal.time_horizon}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Goals;