import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // --- LOGIC (UNCHANGED) ---
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://127.0.0.1:8000/api/login/", {
      username,
      password,
    });

    // ✅ Save token with expiry
    const tokenData = {
      value: res.data.token,         // backend should send a token
      expiry: Date.now() + 60 * 60 * 1000 // 1 hour expiry
    };

    localStorage.setItem("token", JSON.stringify(tokenData));

    alert("Login successful!");
    navigate("/dashboard");
  } catch (err) {
    alert("Invalid credentials");
  }
};


  // --- STYLING ---
  // A small state to handle the button's hover effect for better UI feedback
  const [isHovered, setIsHovered] = useState(false);

  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
  };

  const formContainerStyle = {
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  };

  const titleStyle = {
    marginBottom: '24px',
    color: '#333',
    fontSize: '28px',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '16px',
    boxSizing: 'border-box', // Ensures padding doesn't affect the total width
    fontSize: '16px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease', // Smooth transition for hover effect
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3', // Darker shade of blue on hover
  };

  // --- JSX with Styles Applied ---
  return (
    <div style={pageStyle}>
      <div style={formContainerStyle}>
        <h2 style={titleStyle}>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <button
            type="submit"
            style={isHovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;