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
      {users.map((user) => (
        <div key={user._id} className="user-card">
          <img
            src={user.profile_picture || Default}
            className="Consultant-img"
            alt="user profile"
          />
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </>
  );
}

export default Users;
