import './App.css';


import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import OTPVerification from './components/OTPVerification';
import ForgotPassword from './components/ForgotPassword';
import ChatBox from './components/ChatBox';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  
  const setAuthToken = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/chat" element={token ? <ChatBox token={token} /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={token ? <Dashboard token={token} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
