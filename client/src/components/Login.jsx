import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post("https://deepq-ai-backend.onrender.com/api/login/", {
        username,
        password,
      });

      // Save token with expiry
      const tokenData = {
        value: res.data.token,
        expiry: Date.now() + 60 * 60 * 1000 // 1 hour expiry
      };

      localStorage.setItem("token", JSON.stringify(tokenData));
      
      // Success animation
      document.querySelector('.login-container').classList.add('success');
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
      
    } catch (err) {
      // Error animation
      document.querySelector('.login-form').classList.add('shake');
      setTimeout(() => {
        document.querySelector('.login-form')?.classList.remove('shake');
      }, 500);
      
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>
      
      <div className="login-container">
        <div className="login-form">
          <div className="form-header">
            <div className="brand-logo">
              <div className="logo-icon">📊</div>
              <h1 className="brand-title">WorldBank Stats</h1>
            </div>
            <p className="form-subtitle">Access your analytics dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="form">
            <div className="input-group">
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>
            
            <div className="input-group">
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className={`login-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="button-icon">→</span>
                </>
              )}
            </button>
          </form>
          
          <div className="form-footer">
            <p className="signup-text">
              Don't have an account? 
              <Link to="/signup" className="signup-link">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;