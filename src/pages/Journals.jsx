import React from "react";
import Header from "../components/Header";
import "./styles/Journals.css";
function Journals() {
    return (<>
    <Header />
    <div className="journals">
    <p className="journals-text">Did you write in your journal today?</p>
    <button className="journals-button">Add New Journal</button>
    </div>
    </>);
}

export default Journals;