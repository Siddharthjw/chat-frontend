// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINT } from '../apiConfig';

function Login({ setAuthToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Define your master email (should match the one in your backend master config)
  const MASTER_EMAIL = "master@example.com"; // Change this to your actual master email

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let res;
      // Check if the email entered is for the master account
      if (email.toLowerCase() === MASTER_EMAIL.toLowerCase()) {
        res = await axios.post(`${API_ENDPOINT}/master/login`, { email, password });
      } else {
        res = await axios.post(`${API_ENDPOINT}/auth/login`, { email, password });
      }
      setAuthToken(res.data.token);
      navigate('/chat');
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      alert(message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} required />
        <button type="submit" className="button">Login</button>
      </form>
      <a href="/forgot-password">Forgot Password?</a><br/>
      <a href="/register">Register</a>
    </div>
  );
}

export default Login;

