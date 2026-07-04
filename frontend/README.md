# Chatty — Frontend

A small React frontend for the chat backend in `../backend`. Built to be
beginner-friendly: **Context API** for global state (auth + chat/socket) and
**prop drilling** between parent/child components — no Redux, no Zustand, no
extra state libraries.

## Stack

- **React 18** + **Vite**
- **react-router-dom v6** — routing + protected routes
- **axios** — HTTP requests (with `withCredentials` so the JWT cookie is sent)
- **socket.io-client** — real-time messages
- **react-hot-toast** — tiny toast notifications

## Project structure

```
frontend/
├── package.json
├── vite.config.js          # proxies /api + /socket.io to the backend
├── index.html
└── src/
    ├── main.jsx            # entry; wraps app with AuthProvider + ChatProvider
    ├── App.jsx             # routes (public + protected)
    ├── index.css           # all styles in one file
    ├── lib/
    │   └── axios.js        # axios instance with withCredentials:true
    ├── context/
    │   ├── AuthContext.jsx # user, login, signup, logout, updateProfile
    │   └── ChatContext.jsx # socket, users, onlineUsers, messages map
    ├── components/
    │   ├── Navbar.jsx              # top bar (drills props to ProfileMenu)
    │   ├── ProfileMenu.jsx         # avatar dropdown
    │   ├── ProtectedRoute.jsx      # redirects to /login if not logged in
    │   ├── Sidebar.jsx             # list of users (drilled props)
    │   ├── ChatContainer.jsx       # message list + input (drilled props)
    │   ├── MessageBubble.jsx
    │   └── MessageInput.jsx        # text + image, calls /api/messages/send/:id
    └── pages/
        ├── LoginPage.jsx
        ├── SignupPage.jsx
        ├── ChatPage.jsx            # parent: holds selectedUser, drills it down
        └── SettingsPage.jsx        # update profile pic + name
```

### Where Context is used (and where prop drilling is used)

- **Context API** is for things that *every* component might need:
  - `authUser`, `login`, `logout`, etc. → `AuthContext`
  - `socket`, `onlineUsers`, `messages` map → `ChatContext`
- **Prop drilling** is for data that flows down a known chain:
  - `ChatPage` owns `selectedUser` and passes it as a prop to both
    `<Sidebar/>` and `<ChatContainer/>`
  - `<Navbar/>` receives `onLogout` and `authUser` and drills them into
    `<ProfileMenu/>`

## Running it

### 1. Backend first

In `backend/`:

```bash
npm install
# create a .env file with at least:
#   PORT=5000
#   MONGODB_URI=...
#   JWT_SECRET=...
#   CLOUDINARY_CLOUD_NAME=...
#   CLOUDINARY_API_KEY=...
#   CLOUDINARY_API_SECRET=...
npm run dev
```

### 2. Frontend

In this directory:

```bash
npm install
npm run dev
```

Vite starts on `http://localhost:5173`. It proxies `/api` and `/socket.io`
to `http://localhost:5000` (see `vite.config.js`), so you don't need to
configure any URLs in the React code.

### 3. Production build

```bash
npm run build
```

The backend already serves `../frontend/dist` when `NODE_ENV=production`
(see `backend/src/index.js`), so just build and point your reverse proxy at
the backend.

## Routes

| Path         | Page          | Auth? |
| ------------ | ------------- | ----- |
| `/login`     | LoginPage     | No    |
| `/signup`    | SignupPage    | No    |
| `/`          | ChatPage      | Yes   |
| `/settings`  | SettingsPage  | Yes   |

`ProtectedRoute` redirects unauthenticated users to `/login`.
If you're already logged in and visit `/login` or `/signup`, you get
redirected back to `/`.

## Talking to the backend

These are the only HTTP calls the frontend makes — they map 1-to-1 to your
backend routes:

| Action              | Request                                  |
| ------------------- | ---------------------------------------- |
| Signup              | `POST /api/auth/signup`                  |
| Login               | `POST /api/auth/login`                   |
| Logout              | `POST /api/auth/logout`                  |
| "Am I logged in?"   | `GET  /api/auth/check` (on app start)    |
| Update profile      | `PUT  /api/auth/update-profile`          |
| List other users    | `GET  /api/messages/users`               |
| Load conversation   | `GET  /api/messages/:id`                 |
| Send a message      | `POST /api/messages/send/:id`            |

The socket connects to `/socket.io` with `?userId=<authUser._id>` and
listens for `newMessage` + `getOnlineUsers`.

## Things you can try as exercises

1. Add a "last message preview" to each row in the sidebar — you'll need to
   store the last message per conversation in `ChatContext`.
2. Show a typing indicator using the `typing` / `userTyping` socket events
   your backend already supports.
3. Add an "edit name" form to the Settings page — it's already wired up,
   just try changing it and watch the navbar avatar initial update.
4. Replace the prop-drilled `selectedUser` with a context once you feel
   comfortable — see how much code changes.