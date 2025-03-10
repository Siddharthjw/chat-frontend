// src/components/ChatBox.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { API_ENDPOINT } from '../apiConfig';

function ChatBox({ token }) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const res = await axios.get(`${API_ENDPOINT}/chat/history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChatHistory(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_ENDPOINT}/chat/send`, { message }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('');
      fetchChatHistory();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar token={token} />
      <div className="chat-history">
        {chatHistory.map(msg => (
          <div key={msg.id} className="card">
            <img src={msg.profile_picture || 'default.png'} alt="profile" width="30" height="30" />
            <span style={{ fontSize: '0.8em' }}>{msg.username}</span>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend}>
        <input type="text" placeholder="Type your message" value={message} onChange={(e)=> setMessage(e.target.value)} className="input-field" required />
        <button type="submit" className="button">Send</button>
      </form>
    </div>
  );
}

export default ChatBox;
