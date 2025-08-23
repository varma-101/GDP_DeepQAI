import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ userName = "Dashboard User" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    navigate("/");               // redirect
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-brand">
          <h2>WorldBank Stats</h2>
        </div>
        <div className="nav-links">
          <div className="user-info">
            <div className="user-avatar">👤</div>
            <span className="user-name">{userName}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="logout-button"
            title="Logout"
          >
            <span className="logout-icon">🚪</span>
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;