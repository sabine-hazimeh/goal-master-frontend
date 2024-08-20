import React from "react";
import "./styles/JournalsForm.css";
import Header from "../components/Header";
import woman from "../images/planning-woman.png";
const JournalsForm = () => {
    return (
        <>
        <Header />
        <div className="journals-form">
            <div className="journals-left">
                <img src={woman} className="journals-img"></img>
            </div>
            <div className="journals-right"></div>
        </div>
        </>
    );
};

export default JournalsForm;