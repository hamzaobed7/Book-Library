import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../auth/AuthContext";
export const DataContext = createContext();
export default function DataProvider({ children }) {
  const [StockCount, setStockCount] = useState([]);
  const [users, setUsers] = useState();
  const [count, Setcount] = useState(null);
  const [hasNoBook, setHasNoBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const { type } = useContext(AuthContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token ) return;

    const loadData = async () => {
      setLoading(true);
      try {
        if (type === "customer") {
          await FetechCountOfCart();
        } else {
          await Promise.all([FetechAuthorHasNoBook(), FetechUsersCount(), FetechStockCount()]);
        }

    
      } catch (error) {
        console.log("Error data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [ type]);

  const FetechAuthorHasNoBook = async () => {
    try {
      const responce = await api.get("/Counts/hasNobook");
      setHasNoBook(responce.data);
    } catch (err) {
      console.log(err);
    }
  };

  const FetechUsersCount = async () => {
    try {
      const responce = await api.get("/Counts/users");
      setUsers(responce.data);
    } catch (err) {
      console.log(err);
    }
  };

  const FetechStockCount = async () => {
    try {
      const responce = await api.get("/Counts/AddStock");
      setStockCount(responce.data);
    } catch (err) {
      console.log(err);
    }
  };

  const FetechCountOfCart = async () => {
    try {
      const response = await api.get("/cart/count");
      Setcount(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        StockCount,
        users,
        hasNoBook,
        FetechCountOfCart,
        count,
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
