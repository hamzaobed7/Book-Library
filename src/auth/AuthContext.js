import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();
    


    const login = (data) => {
    const accessToken = data.access_token || data.token;
    const expiryTime = Date.now() + 60*60*1000;
    localStorage.setItem("token_expiry", expiryTime);
    if (!accessToken) {
      console.error("Token not found");
      return;
    }
    localStorage.setItem("token", accessToken);
    setToken(accessToken);
  };


  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_expiry")
    setToken(null);
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
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
