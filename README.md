# 👁️ Seer — Real-Time Chat App

**"Nothing stays hidden."**

Seer is a full-stack, real-time messaging application built with the MERN stack and Socket.io. It goes beyond basic CRUD messaging with live  live presence, and instant UI updates across every connected client — no polling, no refreshing.

---

## ✨ Features

- 🔐 **Authentication** — Secure signup/login with JWT stored in `httpOnly` cookies (`sameSite: strict` for CSRF protection)
- 💬 **Real-time messaging** — Instant message delivery via Socket.io
- ⌨️ **Live typing indicators** — See when the other person is typing, in real time
- 🟢 **Live presence** — Online/offline status updates instantly across all clients
- 🆕 **Live user list** — New signups appear in everyone's sidebar instantly (`userCreated` socket event) — no refresh needed
- 🖼️ **Image sharing** — Send images in chat and update profile pictures via Cloudinary
- ⚡ **Protected routes** — Client-side route guarding with automatic redirects for authed/unauthed users

---

## 🛠️ Tech Stack

**Frontend**
- React 19 + Vite
- React Router v6 — routing & protected routes
- Context API — global state for auth and chat/socket
- Axios — HTTP requests with credentials
- Socket.io-client — real-time events
- React Hot Toast — notifications

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Socket.io — real-time engine
- JWT + bcrypt — authentication
- Cloudinary — image storage

---

## 📁 Project Structure

```
seer-chat-app/
├── frontend/
│   ├── vite.config.js        # Dev proxy for /api + /socket.io
│   └── src/
│       ├── main.jsx           # Entry point (AuthProvider + ChatProvider)
│       ├── App.jsx            # Route definitions
│       ├── context/
│       │   ├── AuthContext.jsx    # user, login, signup, logout, updateProfile
│       │   └── ChatContext.jsx    # socket, users, onlineUsers, messages
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── ProfileMenu.jsx
│       │   ├── ProtectedRoute.jsx
│       │   ├── Sidebar.jsx
│       │   ├── ChatContainer.jsx
│       │   ├── MessageBubble.jsx
│       │   └── MessageInput.jsx
│       └── pages/
│           ├── LandingPage.jsx
│           ├── LoginPage.jsx
│           ├── SignupPage.jsx
│           ├── ChatPage.jsx
│           └── SettingsPage.jsx
│
└── backend/
    └── src/
        ├── index.js               # Express app entry + production static serving
        ├── controllers/
        │   ├── auth.controller.js
        │   └── message.controller.js
        ├── middleware/
        │   └── auth.middleware.js # JWT route protection
        ├── models/
        │   ├── user.model.js
        │   └── message.model.js
        ├── routes/
        │   ├── auth.route.js
        │   └── message.route.js
        └── lib/
            ├── db.js
            ├── socket.js          # Socket.io server + online user map
            ├── cloudinary.js
            └── utils.js           # JWT token generation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB instance (local or Atlas)
- A Cloudinary account (for image uploads)

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd seer-chat-app
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend setup

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`. Vite proxies `/api` and `/socket.io` requests to `http://localhost:5000`, so no manual URL configuration is needed in development.

### 4. Production build

```bash
cd frontend
npm run build
```


---

## 🔌 API Reference

| Method | Endpoint                     | Auth Required | Description                  |
|--------|-------------------------------|:--------------:|-------------------------------|
| POST   | `/api/auth/signup`            | No             | Register a new user           |
| POST   | `/api/auth/login`              | No             | Log in                        |
| POST   | `/api/auth/logout`             | No             | Log out                       |
| GET    | `/api/auth/check`              | Yes            | Check current session         |
| PUT    | `/api/auth/update-profile`     | Yes            | Update name / profile picture |
| GET    | `/api/messages/users`          | Yes            | Get sidebar user list          |
| GET    | `/api/messages/:id`            | Yes            | Get conversation with a user  |
| POST   | `/api/messages/send/:id`       | Yes            | Send a message to a user      |

### Socket Events

| Event                | Direction         | Description                          |
|----------------------|-------------------|---------------------------------------|
| `getOnlineUsers`     | Server → Client   | Broadcasts current list of online users |
| `newMessage`         | Server → Client   | Delivers a new message in real time   |
| `typing` / `stopTyping` | Client → Server | Notifies server the user is/isn't typing |
| `userTyping` / `userStoppedTyping` | Server → Client | Relays typing status to the receiver |
| `userCreated`        | Server → Client   | Broadcasts newly signed-up users      |
| `profileUpdated`     | Server → Client   | Broadcasts profile changes            |

---

## 🧠 State Management Approach

Seer intentionally avoids external state libraries:

- **Context API** is used for data every component might need — `AuthContext` (auth state) and `ChatContext` (socket connection, online users, message map).
- **Prop drilling** is used for data with a clear, known flow — e.g. `ChatPage` owns `selectedUser` and passes it down to `Sidebar` and `ChatContainer`.

This keeps the codebase simple, predictable, and easy for others to trace without extra tooling.

---

## 🗺️ Possible Next Steps

- Message read receipts
- Group chat support
- Message search
- Push notifications for offline users

---

