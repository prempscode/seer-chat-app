import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Tiny wrapper that redirects to /login if there is no logged-in user.
// This is the classic "prop drill" — children are passed straight through.
export default function ProtectedRoute({ children }) {
  const { authUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="center-page">
        <div className="spinner" />
      </div>
    );
  }

  if (!authUser) return <Navigate to="/login" replace />;

  return children;
}