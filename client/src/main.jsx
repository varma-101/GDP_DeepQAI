import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

function PrivateRoute({ children }) {
  const stored = localStorage.getItem("token");
  if (!stored) return <Navigate to="/login" />;

  const tokenData = JSON.parse(stored);
  if (Date.now() > tokenData.expiry) {
    localStorage.removeItem("token"); // expired
    return <Navigate to="/login" />;
  }

  return children;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Navbar />
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
);