import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";

const TeacherDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      alert("Logged out successfully");
      navigate("/");
    } catch (error) {
      alert("Failed to logout. Please try again.");
    }
  };

  if (!currentUser) {
    return (
      <div>
        <h1>You need to be logged in to view this page</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <p>Welcome, {currentUser.displayName}</p>
      <button onClick={handleLogout}>Logout</button>
      {/* Add other components or functionality here */}
    </div>
  );
};

export default TeacherDashboard;
