import { createContext, useEffect, useMemo, useState } from "react";
import api from "../api/axios";
export const BookContext = createContext();
export default function BookProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [books, setBook] = useState([]);
  const [Stock, setStock] = useState([]);
  const [trendBook, SetTrendBook] = useState([]);
  const [hasBook, setHasBook] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchAuthors(), fetchBooks(), fetchCategories(), fetchStocks(), FetechCategoryHasBook(), FetechTake()]);
      } catch (error) {
        console.log("Error data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const FetechTake = async () => {
    try {
      const response = await api.get("/treandBook");
      SetTrendBook(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const FetechCategoryHasBook = async () => {
    try {
      const responce = await api.get("/categoryhasbooks");
      setHasBook(responce.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await api.get("/books");
      setBook(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await api.get("/authors");
      setAuthors(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStocks = async () => {
    try {
      const response = await api.get("/remove_frome_remaining");
      setStock(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };
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
    [AuthorCount, CategoryCount, categories, Stock, authors, books, loading, bookCount],
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}
