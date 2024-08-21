import React, { useEffect } from "react";
import Header from "../components/Header";
import "./styles/Journals.css";
import { useNavigate } from "react-router-dom";

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
                    
                </div>
            </div>
        </>
    );
}

export default Journals;
