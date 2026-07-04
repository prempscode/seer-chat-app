function formatTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function MessageBubble({ message, isMine }) {
  return (
    <div className={`bubble ${isMine ? "me" : "them"}`}>
      {message.text && <div>{message.text}</div>}
      {message.image && (
        <img className="img" src={message.image} alt="attachment" />
      )}
      <span className="time">{formatTime(message.createdAt)}</span>
    </div>
  );
}