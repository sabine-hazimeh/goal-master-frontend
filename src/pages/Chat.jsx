import React, { useEffect, useState } from "react";
import "./styles/Chat.css";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux"; 

function Chat() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((state) => state.user.user); 
  const userId = user ? user.id : null; 

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

  const handleSendMessage = async () => {
    const token = localStorage.getItem("Token");
    try {
      const response = await axios.post(
        `http://localhost:8000/api/message`,
        { content: newMessage, chat_id: chatId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessages([...messages, response.data.message]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  console.log("User ID:", userId);
  console.log("Messages:", messages);

  return (
    <>
      <Header />
      <div className="Chat">
        <div className="Chat-messages">
          {messages.map((message) => (
            <p
              key={message.id}
              className={`Chat-message ${
                message.sender_id === userId ? "sent" : "received"
              }`}
            >
              {message.content}
            </p>
          ))}
        </div>
        <div className="Chat-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} className="chat-icon" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Chat;
