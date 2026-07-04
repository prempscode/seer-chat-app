import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/axios.js";

/*
 * AuthContext
 * ----------
 * Holds the logged-in user and exposes login / signup / logout / updateProfile
 * helpers. On mount we call /api/auth/check to see if the JWT cookie is still
 * valid (so refreshing the page keeps you logged in).
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Run once on app start: are we already logged in?
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/check");
        setAuthUser(res.data);
      } catch {
        setAuthUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const signup = async ({ fullName, email, password }) => {
    const res = await api.post("/auth/signup", { fullName, email, password });
    setAuthUser(res.data);
    return res.data;
  };

  const login = async ({ email, password }) => {
    const res = await api.post("/auth/login", { email, password });
    setAuthUser(res.data);
    return res.data;
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setAuthUser(null);
  };

  // Used by the Settings page after updating the profile picture/name.
  const updateProfile = async (payload) => {
    const res = await api.put("/auth/update-profile", payload);
    setAuthUser(res.data);
    return res.data;
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

// Tiny custom hook so components can do `const { authUser } = useAuth()`
// instead of `useContext(AuthContext)` everywhere.
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};

