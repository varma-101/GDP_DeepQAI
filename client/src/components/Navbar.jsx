import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    navigate("/login");               // redirect
  };

  return (
    <div>
      {/* Navbar */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#282c34",
        color: "white"
      }}>
        <h2>My App</h2>
        <button 
          onClick={handleLogout}
          style={{
            backgroundColor: "#f44336",
            border: "none",
            padding: "8px 16px",
            borderRadius: "5px",
            color: "white",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </nav>

      {/* Dashboard Content */}
      
    </div>
  );
}
