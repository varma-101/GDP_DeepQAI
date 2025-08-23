import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !password || !email) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        "https://deepq-ai-backend.onrender.com/api/register/",
        { username, password, email },
        { headers: { "Content-Type": "application/json" } }
      );
      
      // Success animation
      document.querySelector('.signup-container').classList.add('success');
      
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data?.error || "Error creating account");
      
      // Error animation
      document.querySelector('.signup-form').classList.add('shake');
      setTimeout(() => {
        document.querySelector('.signup-form')?.classList.remove('shake');
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>
      
      <div className="signup-container">
        <div className="signup-form">
          <div className="form-header">
            <div className="brand-logo">
              <div className="logo-icon">📊</div>
              <h1 className="brand-title">WorldBank Stats</h1>
            </div>
            <p className="form-subtitle">Create your analytics account</p>
          </div>
          
          <form onSubmit={handleSignup} className="form">
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}
            
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
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              className={`signup-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                <>
                  <span>Create Account</span>
                  <span className="button-icon">→</span>
                </>
              )}
            </button>
          </form>
          
          <div className="form-footer">
            <p className="login-text">
              Already have an account? 
              <Link to="/login" className="login-link">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;