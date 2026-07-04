import { useRef, useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios.js";
import { useChat } from "../context/ChatContext.jsx";

// Reads an image File and returns a base64 data-URL string (what the backend
// expects so it can upload straight to Cloudinary).
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export default function MessageInput({
  authUser,
  selectedUser,
  setMessages,
}) {
  const { socket } = useChat();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null); // { file, preview }
  const [sending, setSending] = useState(false);
  const fileInputRef = useRef(null);

  const handleImagePick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please pick an image file");
      return;
    }
    const preview = URL.createObjectURL(file);
    setImage({ file, preview });
    // allow picking the same file again
    e.target.value = "";
  };

  const clearImage = () => {
    if (image?.preview) URL.revokeObjectURL(image.preview);
    setImage(null);
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!text.trim() && !image) return;

    setSending(true);
    try {
      const payload = { text: text.trim() };
      if (image) payload.image = await fileToBase64(image.file);

      const res = await api.post(`/messages/send/${selectedUser._id}`, payload);
      const newMsg = res.data;

      // Append to local state (also handled by socket but we do it here
      // immediately so the sender sees their own message instantly).
      setMessages((prev) => ({
        ...prev,
        [selectedUser._id]: [...(prev[selectedUser._id] || []), newMsg],
      }));

      // Tell other tabs / the receiver (the server already emits it, but
      // emitting client-side for our own session is harmless).
      socket?.emit("newMessage", newMsg);

      setText("");
      clearImage();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSend}>
      {image && (
        <div className="image-preview">
          <img src={image.preview} alt="to send" />
          <button type="button" onClick={clearImage} title="Remove">
            ✕
          </button>
        </div>
      )}

      <div className="message-input">
        <button
          type="button"
          className="icon-btn"
          title="Attach image"
          onClick={() => fileInputRef.current?.click()}
        >
          📎
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImagePick}
        />

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Message ${selectedUser.fullName}...`}
        />

        <button className="send-btn" type="submit" disabled={sending}>
          {sending ? "..." : "Send"}
        </button>
      </div>
    </form>
  );
}