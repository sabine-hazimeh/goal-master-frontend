import React from 'react';
import './styles/FilledButton.css'; 

const FilledButton = ({ text, onClick }) => {
    return (
        <button className="filled-button" onClick={onClick}>
            {text}
        </button>
    );
};

export default FilledButton;
