import { Route, Routes } from "react-router-dom";
import "./app.css";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import TeacherDashboard from "./pages/TeacherDashboard";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Login page as the default route */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
