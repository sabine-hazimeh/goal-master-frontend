import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./styles/AdminConsultants.css";
import axios from "axios";
import Default from "../images/default-profile.jpeg";

function AdminConsultants() {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchConsultants() {
      const token = localStorage.getItem("Token");
      if (!token) {
        console.error("No authentication token found");
        setLoading(false);
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
        if (response.data && Array.isArray(response.data.consultants)) {
          setConsultants(response.data.consultants);
        } else {
          console.error("Unexpected data format:", response.data);
          setError("Unexpected data format from server.");
        }
      } catch (error) {
        console.error("Error fetching consultants:", error);
        setError("Failed to load consultants.");
      } finally {
        setLoading(false);
      }
    }

    fetchConsultants();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Header />
      <div className="Consultants">
        {consultants.length > 0 ? (
          consultants.map((consultant) => (
            <div className="Consultant" key={consultant.id}>
              <div className="Consultant-info">
                <div className="Consultant-details">
                  <img
                    src={
                      consultant.profile_photo
                        ? `http://localhost:8000/storage/${consultant.profile_photo}`
                        : Default
                    }
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
                    <b>Years of Experience: </b>
                    {consultant.experience}
                  </p>
                  <p>
                    <b>Description: </b>
                    {consultant.description}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No consultants available.</p>
        )}
      </div>
    </div>
  );
}

export default AdminConsultants;
