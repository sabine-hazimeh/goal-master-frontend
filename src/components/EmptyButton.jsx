import React from "react";
import "./styles/EmptyButton.css";

const EmptyButton = ({ text, onClick }) => {
    return (
        <button className="empty-button" onClick={onClick}>
            {text}
        </button>
    );

}

export default EmptyButton