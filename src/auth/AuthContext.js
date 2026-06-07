import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
    const navigate = useNavigate();
  
    const login = (data) => {
    console.log(data)
    const accessToken = data.access_token || data.token;
    const userData = data.user || null;
    const expiryTime = Date.now() + 60*60*1000;
    localStorage.setItem("token_expiry", expiryTime);
    if (!accessToken) {
      console.error("Token not found");
      return;
    }
    localStorage.setItem("token", accessToken);
    setToken(accessToken);
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    }
  };

   
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("token_expiry")
    setToken(null);
    setUser(null);
    navigate("/login");
  };

useEffect(() => {
  const expiry = localStorage.getItem("token_expiry");
  if (!expiry) return;
  if (Date.now() > expiry) {
    logout();
    return;
  }
  const remainingTime = expiry - Date.now();
  const timer = setTimeout(() => {
    logout();
  }, remainingTime);
  return () => clearTimeout(timer);

}, [token]);



  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
