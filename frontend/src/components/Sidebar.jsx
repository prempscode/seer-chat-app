export default function Sidebar({ users, onlineUsers, selectedUser, onSelectUser }) {
  const isOnline = (userId) => onlineUsers.includes(userId);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span>Messages</span>
        <span style={{ fontSize: 12, color: "var(--text-dim)" }}>
          {users.length} contact{users.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="sidebar-list">
        {users.length === 0 && ( <div style={{ padding: 20, color: "var(--text-dim)", fontSize: 14 }}> No other users yet. Invite a friend! </div> )}

        {users.map((u) => (
          
          <div key={u._id} className={`user-row ${selectedUser?._id === u._id ? "active" : ""}`} onClick={() => onSelectUser(u)}>

            <div className="avatar sm"> {u.profilePic ? ( <img src={u.profilePic} alt={u.fullName}/> ):( u.fullName?.[0]?.toUpperCase() || "?" )} </div>
            
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="name">{u.fullName}</div>
            </div>

            <span className={`online-dot ${isOnline(u._id) ? "online" : ""}`} />

          </div>
        ))}
      </div>
    </aside>
  );
}