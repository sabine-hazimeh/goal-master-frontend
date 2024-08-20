import React from 'react';
import './FilledButton.css'; 

const FilledButton = ({ text, onClick }) => {
    return (
        <button className="custom-button" onClick={onClick}>
            {text}
        </button>
    );
};

export default FilledButton;
