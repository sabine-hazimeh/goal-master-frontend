import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./styles/Users.css";
import axios from "axios";
import Default from "../images/default-profile.jpeg";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("http://localhost:8000/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
        });
        setUsers(response.data[1]);
      } catch (error) {
        console.error("Error fetching users:", error);
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
      <div className="Users">
        {users.map((user) => (
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
        ))}
      </div>
    </>
  );
}

export default Users;
