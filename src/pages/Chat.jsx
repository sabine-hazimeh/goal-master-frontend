import React, { useEffect, useState } from "react";
import "./styles/Chat.css";
import Header from "../components/Header";

function Chat() {
    const { chatId } = useParams(); 
    const [messages, setMessages] = useState([]);
  
    useEffect(() => {
        async function fetchMessages() {
          const token = localStorage.getItem("Token");
          try {
            const response = await axios.get(
              `http://localhost:8000/api/messages/${chatId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            setMessages(response.data.messages);
          } catch (error) {
            console.error("Error fetching messages:", error);
          }
        }
    
        fetchMessages();
      }, [chatId]);
  return (
    <>
      <Header />
      <div className="Chat"></div>;
    </>
  );
}

export default Chat;
