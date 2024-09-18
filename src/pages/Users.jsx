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
        const response = await axios.get(
          "http://ec2-13-38-78-41.eu-west-3.compute.amazonaws.com/api/users",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
              "Content-Type": "application/json",
            },
          }
        );
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
        `http://ec2-13-38-78-41.eu-west-3.compute.amazonaws.com/api/chat`,
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
              <FontAwesomeIcon icon={faSpinner} spin className="loading-icon" />
              <p>Loading users...</p>
            </div>
          </div>
        ) : Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="user-card">
              <div className="user-details">
                <img
                  src={
                    user.profile_photo
                      ? `http://ec2-13-38-78-41.eu-west-3.compute.amazonaws.com/storage/${user.profile_photo}`
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

              <div className="text-link-wrapper">
                <p
                  className="users-text-link"
                  onClick={() => handleChatNow(user.id)}
                >
                  Chat now
                </p>
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
