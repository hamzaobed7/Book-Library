import { createContext, useEffect, useState } from "react";
import api from "../api/axios";
export const DataContext = createContext();
export default function DataProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
   const [Stock, setStock] = useState([]);
   const [StockCount, setStockCount] = useState([]);
   const [hasBook, setHasBook] = useState([]);
   const [users,setUsers]=useState();
   const [hasNoBook, setHasNoBook] = useState([]);
  const [books, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData=async()=>{
      setLoading(true)
    try{
      await Promise.all([fetchAuthors(),
        fetchBooks(),fetchCategories(),
        fetchStocks(),FetechCategoryHasBook()
        ,FetechAuthorHasNoBook(),FetechUsersCount(),
        FetechStockCount()
      ])
      
    }
    catch(error){
      console.log("Error data:",error)
    }
    finally{
      setTimeout(()=>{
        setLoading(false)
      },1000);
    }
    }
    loadData();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBooks=async ()=>{
    try{
   const response = await api.get("/books")
   setBook(response.data.data)
    }
    catch(error){
      console.error(error)
    }
  }

  const fetchAuthors = async () => {
    try {
      const response = await api.get("/authors");
      setAuthors(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

 const fetchStocks= async () => {
    try {
      const response = await api.get("/remove_frome_remaining");
      setStock(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const FetechCategoryHasBook=async()=>{
try{
  const responce=await api.get("/categoryhasbooks");
setHasBook(responce.data);
}
catch(err){
  console.log(err);
}

  }

 const FetechAuthorHasNoBook=async()=>{
try{
  const responce=await api.get("/Counts/hasNobook");
  setHasNoBook(responce.data);
}
catch(err){
  console.log(err);
}

  }


const FetechUsersCount=async()=>{
try{
  const responce=await api.get("/Counts/users");
  setUsers(responce.data);
}
catch(err){
  console.log(err);
}

  }

const FetechStockCount=async()=>{
try{
  const responce=await api.get("/Counts/AddStock");
  setStockCount(responce.data);
}
catch(err){
  console.log(err);
}

  }

  const bookCount = books.length;
  const AuthorCount = authors.length;
  const CategoryCount = categories.length;
  
  return <DataContext.Provider value={{ StockCount,users,hasNoBook,categories,Stock,authors, FetechCategoryHasBook,hasBook,fetchStocks ,books, loading,bookCount,AuthorCount,fetchAuthors,CategoryCount,fetchCategories,fetchBooks }}>{children}</DataContext.Provider>;
}
