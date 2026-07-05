import { useEffect, useState } from "react";
import api from "../lib/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useChat } from "../context/ChatContext.jsx";

import Sidebar from "../components/Sidebar.jsx";
import ChatContainer from "../components/ChatContainer.jsx";

export default function ChatPage() {
  const { authUser } = useAuth();
  const { socket, users, setUsers, messages, setMessages, onlineUsers } = useChat();

  // selectedUser lives in the parent so both Sidebar and ChatContainer can see it.
  // This is the prop drilling pattern — we deliberately pass it down as props
  // instead of stuffing it into context.
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch sidebar users on mount.
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/messages/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to load users", err);
      }
    };
    fetchUsers();
  }, [setUsers]);
  
  // When the selected user changes, load that conversation.
  useEffect(() => {
    if (!selectedUser) return;
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/messages/${selectedUser._id}`);
        setMessages((prev) => ({ ...prev, [selectedUser._id]: res.data }));
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };
    fetchMessages();
  }, [selectedUser, setMessages]);

  // Listen for profile updates from other users so the chat header avatar
  // refreshes in real-time (ChatContext handles the sidebar list separately).
  useEffect(() => {
    if (!socket) return;
    const handler = (updatedUser) => {
      setSelectedUser((prev) =>
        prev?._id === updatedUser._id ? updatedUser : prev,
      );
    };
    socket.on("profileUpdated", handler);
    return () => socket.off("profileUpdated", handler);
  }, [socket]);

  return (
    <div className="chat-shell">
      <Sidebar
        users={users}
        onlineUsers={onlineUsers}
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
      />
      <ChatContainer
        authUser={authUser}
        selectedUser={selectedUser}
        messages={messages[selectedUser?._id] || []}
        setMessages={setMessages}
      />
    </div>
  );
}
