import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./styles/Journals.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Journals() {
    const [journals, setJournals] = useState([]);
    const navigate = useNavigate();

    const handleAddNewJournal = () => {
        navigate("/journal-form");
    };
    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/userJournals");
                setJournals(response.data.journals); 
            } catch (error) {
                console.error("Error fetching journals:", error);
            }
        };
        fetchJournals();
    }, []);
    return (
        <>
            <Header />
            <div className="journals">
                <p className="journals-text">Did you write in your journal today?</p>
                <button className="journals-button" onClick={handleAddNewJournal}>
                    Add New Journal
                </button>
                <div className="journals-container">
                {journals.length > 0 ? (
                        journals.map((journal) => (
                            <div key={journal.id} className="journal-item">
                                <p>{journal.mood}</p>
                                <p>{journal.productivity}</p>
                                <p>{journal.focus}</p>
                                <p>{journal.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No journals found.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Journals;
