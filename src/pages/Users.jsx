import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./styles/Users.css";
import axios from "axios";
import Default from "../images/default-profile.jpeg";
function Users() {
  const [users, setUsers] = useState([]);

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

  return (
    <>
      <Header />
      <div className="Users">
      {users.map((user) => (
        <div key={user._id} className="user-card">
            <div className="user-details">
          <img
            src={user.profile_picture || Default}
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
                    // onClick={() => handleChatNow(user.id)}
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
