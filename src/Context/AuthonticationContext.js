import { useState, useEffect, createContext } from "react";
import api from "../api/axios";

export const AuthonticationContext = createContext();
export default function AuthonticationProvider({ children }) {
  const [customer, SetCustomer] = useState([]);
  const [Profile, SetProfile] = useState(null);
  const [currntUser, SetCurrntUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([FetechcurrntUser(), FetechAllCustomer(), FetechProfile()]);
      } catch (error) {
        console.log("Error data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const FetechcurrntUser = async () => {
    try {
      const response = await api.get("/user");
      SetCurrntUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const FetechAllCustomer = async () => {
    try {
      const response = await api.get("/customers");
      SetCustomer(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const FetechProfile = async () => {
    try {
      const response = await api.get("/MyProfile");
      SetProfile(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthonticationContext.Provider
      value={{
        currntUser,
        FetechcurrntUser,
        FetechProfile,
        Profile,
        loading,
        customer,
        FetechAllCustomer,
      }}
    >
      {children}
    </AuthonticationContext.Provider>
  );
}
