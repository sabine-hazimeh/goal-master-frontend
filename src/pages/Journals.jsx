import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./styles/Journals.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/Modal";
import JournalsForm from "./JournalsForm";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-CA");
};

function Journals() {
  const [journals, setJournals] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleAddNewJournal = (newJournal) => {
    setJournals((prevJournals) => [...prevJournals, newJournal]);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchJournals = async () => {
      const token = localStorage.getItem("Token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }
      try {
        const response = await axios.get(
          "http://ec2-13-38-78-41.eu-west-3.compute.amazonaws.com/api/user-journals",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setJournals(response.data.journals);
      } catch (error) {
        console.error("Error fetching journals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJournals();
  }, []);

  return (
    <>
      <Header />
      <div className="journals">
        <p className="journals-text">Did you write in your journal today?</p>
        <button className="journals-button" onClick={handleOpenModal}>
          Add New Journal
        </button>

        {loading ? (
          <div className="no-journals-wrapper">
            <div className="no-journals">
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                className="no-journals-icon"
              />
              <p>Loading journals...</p>
            </div>
          </div>
        ) : journals.length > 0 ? (
          <div className="journals-container">
            {journals.map((journal) => (
              <div key={journal.id} className="journal-item">
                <div className="date-container">
                  <p className="journal-card-text">
                    {formatDate(journal.created_at)}
                  </p>
                </div>
                <p className="journal-card-text">
                  <b>Emotion: </b>
                  {journal.emotion ? journal.emotion.emotion : "N/A"}
                </p>
                <p className="journal-card-text">
                  <b>Overall Mood: </b>
                  {journal.mood}
                </p>
                <p className="journal-card-text">
                  <b>Productivity: </b>
                  {journal.productivity}
                </p>
                <p className="journal-card-text">
                  <b>Focus: </b>
                  {journal.focus}
                </p>
                <p className="journal-card-text">
                  <b>Description: </b>
                  {journal.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-journals-wrapper">
            <div className="no-journals">
              <FontAwesomeIcon icon={faBan} className="no-journals-icon" />
              <p>No journals found.</p>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <JournalsForm onAddJournal={handleAddNewJournal} />
      </Modal>
    </>
  );
}

export default Journals;
