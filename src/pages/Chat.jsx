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
  const [receiverId, setReceiverId] = useState(null); 
  const user = useSelector((state) => state.user.user); 
  const userId = user ? user.id : null; 

  useEffect(() => {
    async function fetchChatDetails() {
      const token = localStorage.getItem("Token");
  
      try {
        const chatResponse = await axios.get(
          `http://localhost:8000/api/chats/${chatId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        const chat = chatResponse.data.chat;
        const { user_id, consultant_id } = chat;
  
        const determinedReceiverId = userId === user_id ? consultant_id : user_id;
        setReceiverId(determinedReceiverId);
        
        const messagesResponse = await axios.get(
          `http://localhost:8000/api/messages/${chatId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setMessages(messagesResponse.data.messages);
      } catch (error) {
        console.error("Error fetching chat details or messages:", error);
      }
    }
  
    fetchChatDetails();
  }, [chatId, userId]);

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
