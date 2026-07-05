import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";


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