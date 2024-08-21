import React from "react";
import Header from "../components/Header";
import "./styles/Journals.css";
import { useNavigate } from "react-router-dom";

function Journals() {
    const navigate = useNavigate();

    const handleAddNewJournal = () => {
        navigate("/journal-form");
    };

    return (
        <>
            <Header />
            <div className="journals">
                <p className="journals-text">Did you write in your journal today?</p>
                <button className="journals-button" onClick={handleAddNewJournal}>
                    Add New Journal
                </button>
            </div>
        </>
    );
}

export default Journals;
