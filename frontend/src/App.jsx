import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";

import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import { useAuth } from "./context/AuthContext.jsx";

export default function App() {
  const { authUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="center-page">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="app-shell">
      {authUser && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            !authUser ? <LandingPage /> : <Navigate to="/chat" replace />
          }
        />

        <Route path="/welcome" element={<LandingPage />} />

        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/chat" replace />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/chat" replace />}
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
