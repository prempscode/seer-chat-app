import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext.jsx";

/*
 * ChatContext
 * -----------
 * Owns the socket connection, the sidebar user list, online user ids, and the
 * map of conversations keyed by the other user's id:
 *   messages = { [otherUserId]: [Message, Message, ...] }
 *
 * The chat page still does its own prop-drilling of `selectedUser` /
 * `setSelectedUser` down to <Sidebar/> and <ChatContainer/> — we keep this
 * context small and focused on data that really is global.
 */
const ChatContext = createContext(null);

export function ChatProvider({ children }) {

  
  const { authUser } = useAuth();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState({});

 
  useEffect(() => {
    if (!authUser) {
     
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      setOnlineUsers([]);
      setUsers([]);
      setMessages({});
      return;
    }

    
    const newSocket = io({
      query: { userId: authUser._id },
    });
    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (ids) => setOnlineUsers(ids));

   
      newSocket.on("newMessage", (msg) => {
        setMessages((prev) => {
          const key = msg.senderId === authUser._id ? msg.receiverId : msg.senderId;
          return {
            ...prev, [key]: [...(prev[key] || []), msg],
          };
        });
      });
    
    newSocket.on("profileUpdated", (updatedUser) => {
      setUsers((prev) =>
        prev.map((u) => (u._id === updatedUser._id ? updatedUser : u)),
      );
    });


  
    newSocket.on("userCreated", (newUser) => {
      if (authUser && newUser._id === authUser._id) return;

      setUsers((prev) => {
        if (prev.some((u) => u._id === newUser._id)) return prev;

        return [...prev, newUser];
      });
    });



    return () => {
      newSocket.disconnect();
    };
   
  }, [authUser]);

  return (
    <ChatContext.Provider value={{socket,onlineUsers,users,setUsers,messages,setMessages,}}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside <ChatProvider>");
  return ctx;
};
