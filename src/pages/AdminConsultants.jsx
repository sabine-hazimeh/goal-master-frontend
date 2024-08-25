import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./styles/AdminConsultants.css";
import axios from "axios";
function AdminConsultants() {
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
        setConsultants(response.data[1]);
      } catch (error) {
        console.error("Error fetching consultants:", error);
      }
    }

    fetchConsultants();
  }, []);
  return (
    <div>
      <Header />
    </div>
  );
}

export default AdminConsultants;
