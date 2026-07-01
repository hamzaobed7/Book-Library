import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import api from "../api/axios";
import { AuthContext } from "../auth/AuthContext";

export const BookContext = createContext();

export default function BookProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [books, setBook] = useState([]);
  const [Stock, setStock] = useState([]);
  const [trendBook, SetTrendBook] = useState([]);
  const [hasBook, setHasBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const { type } = useContext(AuthContext);

  
  const FetechTake = useCallback(async () => {
    try {
      const response = await api.get("/treandBook");
      SetTrendBook(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const FetechCategoryHasBook = useCallback(async () => {
    try {
      const responce = await api.get("/categoryhasbooks");
      setHasBook(responce.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  
  const fetchBooks = useCallback(async () => {
    try {
      const response = await api.get("/books");
      setBook(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  
  const fetchAuthors = useCallback(async () => {
    try {
      const response = await api.get("/authors");
      setAuthors(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

 
  const fetchStocks = useCallback(async () => {
    try {
      const response = await api.get("/remove_frome_remaining");
      setStock(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

 
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await FetechTake();
      } catch (error) {
        console.log("Error data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [type, FetechTake]); 

  const bookCount = useMemo(() => books.length, [books]);
  const AuthorCount = useMemo(() => authors.length, [authors]);
  const CategoryCount = useMemo(() => categories.length, [categories]);

  const value = useMemo(
    () => ({
      trendBook,
      hasBook,
      AuthorCount,
      CategoryCount,
      FetechTake,
      categories,
      FetechCategoryHasBook,
      Stock,
      authors,
      fetchStocks,
      books,
      loading,
      bookCount,
      fetchAuthors,
      fetchCategories,
      fetchBooks,
    }),
    [AuthorCount, CategoryCount, categories, Stock, authors, books, loading, bookCount, FetechTake, FetechCategoryHasBook, fetchCategories, fetchBooks, fetchAuthors, fetchStocks, trendBook, hasBook],
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}
