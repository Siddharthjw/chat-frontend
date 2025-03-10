// src/components/OTPVerification.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINT } from '../apiConfig';

function OTPVerification() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_ENDPOINT}/auth/verify-otp`, { email, otp });
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      alert(err.response.data.message || 'Verification failed');
    }
  };

  return (
    <div>
      <h2>OTP Verification</h2>
      <form onSubmit={handleVerify}>
        <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} required />
        <input type="text" placeholder="OTP" value={otp} onChange={(e)=> setOtp(e.target.value)} required />
        <button type="submit" className="button">Verify</button>
      </form>
    </div>
  );
}

export default OTPVerification;
