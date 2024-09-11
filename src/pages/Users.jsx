import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./styles/Users.css";
import axios from "axios";
import Default from "../images/default-profile.jpeg";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faSpinner } from "@fortawesome/free-solid-svg-icons";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("http://localhost:8000/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const handleChatNow = async (userId) => {
    const token = localStorage.getItem("Token");
    try {
      const response = await axios.post(
        `http://localhost:8000/api/chat`,
        { consultant_id: userId },
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
      <div
        className={`Users ${
          Array.isArray(users) && users.length === 0 ? "empty" : ""
        }`}
      >
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
        ) : Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="user-card">
              <div className="user-details">
                <img
                  src={
                    user.profile_photo
                      ? `http://localhost:8000/storage/${user.profile_photo}`
                      : Default
                  }
                  className="Consultant-img"
                  alt="user profile"
                />
                <div className="user-info">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                </div>
              </div>

              <div className="button-wrapper">
                <button
                  className="Consultant-button"
                  onClick={() => handleChatNow(user.id)}
                >
                  Chat now
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-journals-wrapper">
            <div className="no-journals">
              <FontAwesomeIcon icon={faBan} className="no-journals-icon" />
              <p>No Users found.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Users;
