import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <div className="nav-brand">
            <h2>WorldBank Stats</h2>
          </div>
          <div className="nav-links">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link signup-btn">Sign Up</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content animate-on-scroll">
          <h1 className="hero-title">
            Unlock Global Economic Insights with 
            <span className="highlight"> WorldBank Data</span>
          </h1>
          <p className="hero-subtitle">
            Access comprehensive economic indicators, development statistics, and financial data 
            from over 200 countries and territories worldwide.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary">Get Started Free</Link>
            <Link to="/login" className="btn btn-secondary">Explore Data</Link>
          </div>
        </div>
        <div className="hero-visual animate-on-scroll">
          <div className="chart-mockup">
            <div className="chart-bars">
              <div className="bar" style={{height: '60%'}}></div>
              <div className="bar" style={{height: '80%'}}></div>
              <div className="bar" style={{height: '45%'}}></div>
              <div className="bar" style={{height: '90%'}}></div>
              <div className="bar" style={{height: '70%'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Why Choose WorldBank Stats?</h2>
          <div className="features-grid">
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">📊</div>
              <h3>Comprehensive Data</h3>
              <p>Access over 1,400 development indicators covering economics, education, health, and environment across all World Bank member countries.</p>
            </div>
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">🔄</div>
              <h3>Real-time Updates</h3>
              <p>Get the latest data as it's published by the World Bank, with automatic updates and notifications for your tracked indicators.</p>
            </div>
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">📈</div>
              <h3>Advanced Analytics</h3>
              <p>Visualize trends, compare countries, and generate insights with our powerful analytics and visualization tools.</p>
            </div>
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">🌍</div>
              <h3>Global Coverage</h3>
              <p>Explore data from 217 economies, with historical data going back over 50 years for comprehensive trend analysis.</p>
            </div>
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">📱</div>
              <h3>API Access</h3>
              <p>Integrate World Bank data into your applications with our robust RESTful API and comprehensive documentation.</p>
            </div>
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">💼</div>
              <h3>Business Intelligence</h3>
              <p>Make informed decisions with customizable dashboards, automated reports, and data export capabilities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid animate-on-scroll">
            <div className="stat-item">
              <div className="stat-number">1,400+</div>
              <div className="stat-label">Development Indicators</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">217</div>
              <div className="stat-label">Countries & Economies</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Years of Historical Data</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1M+</div>
              <div className="stat-label">Data Points Accessed Daily</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content animate-on-scroll">
            <h2>Ready to Explore Global Economics?</h2>
            <p>Join thousands of researchers, analysts, and decision-makers who trust WorldBank Stats for their data needs.</p>
            <div className="cta-buttons">
              <Link to="/signup" className="btn btn-primary btn-large">Start Your Free Trial</Link>
              <Link to="/login" className="btn btn-outline btn-large">Sign In</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>WorldBank Stats</h3>
              <p>Your gateway to global economic data and insights.</p>
            </div>
            <div className="footer-section">
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#api">API</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li><a href="#docs">Documentation</a></li>
                <li><a href="#support">Support</a></li>
                <li><a href="#blog">Blog</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#careers">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 WorldBank Stats. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;