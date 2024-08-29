import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./styles/AdminConsultants.css";
import axios from "axios";
import Default from "../images/default-profile.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
function AdminConsultants() {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
  async function deleteConsultant(id) {
    const token = localStorage.getItem("Token");
    if (!token) {
      console.error("No authentication token found");
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/consultants/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        setConsultants((prevConsultants) =>
          prevConsultants.filter((consultant) => consultant.id !== id)
        );
        console.log("Consultant deleted successfully");
      } else {
        console.error("Unexpected data format:", response.data);
        setError("Unexpected data format from server.");
      }
    } catch (error) {
      console.error("Error deleting consultant:", error);
      setError("Failed to delete consultant.");
    }
  }

  return (
    <div>
      <Header />
      <div className="Consultants">
        {consultants.length > 0 ? (
          consultants.map((consultant) => (
            <div className="Consultant" key={consultant.id}>
              <div className="Consultant-info">
                <div className="Consultant-upper">
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
                  <div className="Consultant-options">
                    {/* <FontAwesomeIcon icon={faPenToSquare} /> */}
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deleteConsultant(consultant.id)}
                    />
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
                  <div className="button-wrapper">
                    <button
                      className="Consultant-button"
                      onClick={() =>
                        navigate(`/update-consultant/${consultant.id}`)
                      }
                    >
                      Update
                    </button>
                  </div>
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
