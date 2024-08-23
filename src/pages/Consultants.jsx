import React, { useEffect, useState } from "react";
import "./styles/Consultants.css";
import axios from "axios";
import Default from "../images/default-profile.jpeg";
function Consultants() {
  const [consultants, setConsultants] = useState([]);

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
        console.log("Fetched consultants data:", response.data);
        setConsultants(response.data[1]);
      } catch (error) {
        console.error("Error fetching consultants:", error);
      }
    }

    fetchConsultants();
  }, []);

  useEffect(() => {
    console.log("Updated consultants state:", consultants);
  }, [consultants]);

  return (
    <div className="Consultants">
      {Array.isArray(consultants) && consultants.length > 0 ? (
        consultants.map((consultant) => (
          <div className="Consultant" key={consultant.id}>
            <div className="Consultant-info">
                <div className="Consultant-details">
              <img src={consultant.profile_picture || Default} className="Consultant-img"></img>
              <div className="Consultant-name">
              <p>{consultant.name}</p>
              <p>{consultant.phone_number}</p>
              </div>
              </div>
              <p>{consultant.experience}</p>
              <p>{consultant.description}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No consultants found.</p>
      )}
    </div>
  );
}

export default Consultants;
