import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // reset old error

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/register/",
        { username, password, email },
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data?.error || "Error creating account");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={formContainerStyle}>
        <h2 style={titleStyle}>Create Account</h2>
        <form onSubmit={handleSignup}>
          {error && <p style={errorStyle}>{error}</p>}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            style={buttonStyle}
          >
            Signup
          </button>
        </form>
        <div style={loginLinkContainerStyle}>
          Already have an account?{" "}
          <Link to="/login" style={loginLinkStyle}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- STYLES ---
const pageStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "#f0f2f5",
  fontFamily: "Arial, sans-serif",
};

const formContainerStyle = {
  padding: "40px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "400px",
  textAlign: "center",
};

const titleStyle = {
  marginBottom: "24px",
  color: "#333",
  fontSize: "28px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  marginBottom: "16px",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "4px",
  backgroundColor: "#28a745",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const errorStyle = {
  color: "red",
  marginBottom: "10px",
  fontSize: "14px",
};

const loginLinkContainerStyle = {
  marginTop: "20px",
  color: "#555",
  fontSize: "14px",
};

const loginLinkStyle = {
  color: "#007bff",
  textDecoration: "none",
  fontWeight: "bold",
};

export default Signup;
