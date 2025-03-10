// frontend/src/components/Dashboard.js
import React, { useState } from 'react';
import axios from 'axios';

function Dashboard({ token }) {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    bio: '',
    profile_picture: ''
  });
  const [password, setPassword] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:5000/api/user/update', { ...profile, password }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.message || 'Update failed');
    }
  };

  const handlePictureUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:5000/api/user/update-picture', { profile_picture: profile.profile_picture }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.message || 'Picture update failed');
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" placeholder="Username" value={profile.username} onChange={(e)=> setProfile({...profile, username: e.target.value})} required />
        <input type="email" placeholder="Email" value={profile.email} onChange={(e)=> setProfile({...profile, email: e.target.value})} required />
        <textarea placeholder="Bio" value={profile.bio} onChange={(e)=> setProfile({...profile, bio: e.target.value})}></textarea>
        <input type="password" placeholder="New Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
        <button type="submit">Update Profile</button>
      </form>
      <form onSubmit={handlePictureUpdate}>
        <input type="text" placeholder="Profile Picture URL" value={profile.profile_picture} onChange={(e)=> setProfile({...profile, profile_picture: e.target.value})} />
        <button type="submit">Update Picture</button>
      </form>
    </div>
  );
}

export default Dashboard;
