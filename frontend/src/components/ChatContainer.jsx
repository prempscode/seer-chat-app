import { useEffect, useRef } from "react";
import { useChat } from "../context/ChatContext.jsx";
import MessageBubble from "./MessageBubble.jsx";
import MessageInput from "./MessageInput.jsx";

export default function ChatContainer({
  authUser,
  selectedUser,
  messages,
  setMessages,
}) {
  const { onlineUsers } = useChat();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, selectedUser]);

  if (!selectedUser) {
    return (
      <div className="chat-empty">
        <p>Select a conversation from the left to start chatting 👈</p>
      </div>
    );
  }

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <section className="chat-main">
      <header className="chat-header">
        <div className="avatar">
          {selectedUser.profilePic ? (
            <img src={selectedUser.profilePic} alt={selectedUser.fullName} />
          ) : (
            selectedUser.fullName?.[0]?.toUpperCase() || "?"
          )}
        </div>
        <div>
          <div className="name">{selectedUser.fullName}</div>
          <div className={`status ${isOnline ? "online" : ""}`}>
            {isOnline ? "● Online" : "Offline"}
          </div>
        </div>
      </header>

      <div className="chat-messages" ref={scrollRef}>
        {messages.length === 0 && (
          <div style={{ textAlign: "center", color: "var(--text-dim)", marginTop: 40 }}>
            No messages yet. Say hi! 👋
          </div>
        )}

        {messages.map((m) => (
          <MessageBubble
            key={m._id || `${m.senderId}-${m.createdAt}`}
            message={m}
            isMine={m.senderId === authUser._id}
          />
        ))}
      </div>

      <MessageInput
        authUser={authUser}
        selectedUser={selectedUser}
        messages={messages}
        setMessages={setMessages}
      />
    </section>
  );
}