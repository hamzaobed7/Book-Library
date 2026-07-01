import { useState, useEffect, createContext, useCallback, useMemo } from "react";
import api from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export const AuthonticationContext = createContext();

export default function AuthonticationProvider({ children }) {
  const [customer, SetCustomer] = useState([]);
  const [Profile, SetProfile] = useState(null);
  const [currntUser, SetCurrntUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token, type } = useContext(AuthContext);

  const FetechcurrntUser = useCallback(async () => {
    try {
      const response = await api.get("/user");
      SetCurrntUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const FetechAllCustomer = useCallback(async () => {
    try {
      const response = await api.get("/customers");
      SetCustomer(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const FetechProfile = useCallback(async () => {
    try {
      const response = await api.get("/MyProfile");
      SetProfile(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      SetCurrntUser(null);
      setLoading(false);
      return;
    }

    const loadData = async () => {
      setLoading(true);
      try {
        await FetechcurrntUser();
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [token, type, FetechcurrntUser]);

  const contextValue = useMemo(
    () => ({
      currntUser,
      FetechcurrntUser,
      FetechProfile,
      Profile,
      loading,
      customer,
      FetechAllCustomer,
    }),
    [currntUser, FetechcurrntUser, FetechProfile, Profile, loading, customer, FetechAllCustomer],
  );

  return <AuthonticationContext.Provider value={contextValue}>{children}</AuthonticationContext.Provider>;
}
