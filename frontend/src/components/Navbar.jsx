import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import ProfileMenu from "./ProfileMenu.jsx";

export default function Navbar() {
  const { authUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand">💬 Chatty</Link>

      <div className="right">
        <Link to="/" className="nav-btn">Chats</Link>
        <Link to="/settings" className="nav-btn">Settings</Link>

        <div className="avatar" onClick={() => setMenuOpen((v) => !v)} title={authUser?.fullName} >
        
          {authUser?.profilePic ? ( <img src={authUser.profilePic} alt={authUser.fullName} /> ) : ( authUser?.fullName?.[0]?.toUpperCase() || "?" )}
        
        </div>

        {menuOpen && (
          <ProfileMenu
            authUser={authUser}
            onClose={() => setMenuOpen(false)}
            onLogout={handleLogout}
          />
        )}
      </div>
    </header>
  );
}