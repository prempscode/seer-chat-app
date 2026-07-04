import { useNavigate } from "react-router-dom";

// Receives `authUser`, `onClose`, and `onLogout` as plain props
// (that's the prop-drilling pattern you asked for).
export default function ProfileMenu({ authUser, onClose, onLogout }) {
  const navigate = useNavigate();

  const goSettings = () => {
    onClose();
    navigate("/settings");
  };

  const handleLogout = () => {
    onClose();
    onLogout();
  };

  return (
    <div className="profile-menu" onMouseLeave={onClose}>
      <div className="pm-header">
        <div className="avatar">
          {authUser?.profilePic ? (
            <img src={authUser.profilePic} alt={authUser.fullName} />
          ) : (
            authUser?.fullName?.[0]?.toUpperCase() || "?"
          )}
        </div>
        <div>
          <div className="pm-name">{authUser?.fullName}</div>
          <div className="pm-email">{authUser?.email}</div>
        </div>
      </div>

      <button className="pm-item" onClick={goSettings}>
        ⚙️ Profile settings
      </button>
      <button className="pm-item" onClick={handleLogout}>
        🚪 Logout
      </button>
    </div>
  );
}