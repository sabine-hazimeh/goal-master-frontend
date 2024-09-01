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
                setGoals(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchGoals();
    },[]);
    return (
        <div>
            <Header />
        </div>
    );
};

export default Goals;