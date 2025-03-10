// frontend/src/components/Navbar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ token }) {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <nav>
      <button onClick={() => navigate('/dashboard')}>Dashboard</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={toggleDarkMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
      <a href="mailto:admin@example.com">Contact Admin</a>
    </nav>
  );
}

export default Navbar;
