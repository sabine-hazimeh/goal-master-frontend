import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Consultants.css";
import axios from "axios";
import Default from "../images/default-profile.jpeg";
import Header from "../components/Header";

function Consultants() {
  const [consultants, setConsultants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchConsultants() {
      const token = localStorage.getItem("Token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8000/api/consultants`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setConsultants(response.data.consultants);
      } catch (error) {
        console.error("Error fetching consultants:", error);
      }
    }

    fetchConsultants();
  }, []);

  const handleChatNow = async (consultantId) => {
    const token = localStorage.getItem("Token");
    try {
      const response = await axios.post(
        `http://localhost:8000/api/chat`,
        { consultant_id: consultantId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      navigate(`/chat/${response.data.chat.id}`);
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="Consultants">
        {consultants.map((consultant) => (
          <div className="Consultant" key={consultant.id}>
            <div className="Consultant-info">
              <div className="Consultant-details">
                <img
                  src={consultant.profile_picture || Default}
                  className="Consultant-img"
                  alt="Consultant"
                />
                <div className="Consultant-name">
                  <p>{consultant.name}</p>
                  <p>{consultant.phone_number}</p>
                </div>
              </div>
              <div className="Consultant-description">
                <p>
                  <span className="text-bold">Years of Experience: </span>
                  {consultant.experience}
                </p>
                <p>
                  <span className="text-bold">Description: </span>
                  {consultant.description}
                </p>
                <div className="text-link-wrapper">
                  <p
                    className="users-text-link"
                    onClick={() => handleChatNow(consultant.id)}
                  >
                    Chat now
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Consultants;
