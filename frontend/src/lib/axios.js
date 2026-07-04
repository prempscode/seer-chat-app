import axios from "axios";

// We use a relative base URL — the Vite dev server proxies /api and /socket.io
// to your backend (see vite.config.js). In production the backend serves the
// built frontend from the same origin, so this still works.
const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // IMPORTANT: sends the JWT cookie back to the backend
});

export default api;