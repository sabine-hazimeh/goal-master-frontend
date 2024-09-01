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
                        <p className="goal-title">{goal.goal}</p>
                        <p className="goal-description">{goal.current_knowledge}</p>
                        <p className="goal-description">{goal.available_days}</p>
                        <p className="goal-description">{goal.available_hours}</p>
                        <p className="goal-description">{goal.time_horizon}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Goals;