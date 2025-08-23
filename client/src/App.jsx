import React from "react";
import { Link } from "react-router-dom";
import Landing from "./components/Landing";

// Simple Login Component
function Login() {
  return (
    <div>
      <h1>Login Page</h1>
      <p><Link to="/">Back to Home</Link></p>
      {/* Add your login form here */}
    </div>
  );
}

// Simple Signup Component  
function Signup() {
  return (
    <div>
      <h1>Signup Page</h1>
      <p><Link to="/">Back to Home</Link></p>
      {/* Add your signup form here */}
    </div>
  );
}

function App() {
  return (
    <div>
      <Landing />
    </div>
  );
}

export default App;