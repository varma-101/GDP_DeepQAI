import React from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Welcome to WorldBank Stats</h1>
      <p><Link to="/login">Login</Link> | <Link to="/signup">Signup</Link></p>
    </div>
  );
}

export default App;
