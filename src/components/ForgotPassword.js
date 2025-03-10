// src/components/ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINT } from '../apiConfig';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_ENDPOINT}/auth/forgot-password`, { email });
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.message || 'Error sending OTP');
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_ENDPOINT}/auth/reset-password`, { email, otp, newPassword });
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      alert(err.response.data.message || 'Error resetting password');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSendOTP}>
        <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} required />
        <button type="submit" className="button">Send OTP</button>
      </form>
      <h3>Reset Password</h3>
      <form onSubmit={handleReset}>
        <input type="text" placeholder="OTP" value={otp} onChange={(e)=> setOtp(e.target.value)} required />
        <input type="password" placeholder="New Password" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} required />
        <button type="submit" className="button">Reset Password</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
