// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINT } from '../apiConfig';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_ENDPOINT}/auth/register`, { username, email, password });
      alert(res.data.message);
      navigate('/otp-verification');
    } catch (err) {
      alert(err.response.data.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} required />
        <button type="submit" className="button">Register</button>
      </form>
    </div>
  );
}

export default Register;
