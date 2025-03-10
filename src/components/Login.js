// frontend/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setAuthToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setAuthToken(res.data.token);
      navigate('/chat');
    } catch (err) {
      alert(err.response.data.message || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <a href="/forgot-password">Forgot Password?</a><br/>
      <a href="/register">Register</a>
    </div>
  );
}

export default Login;
