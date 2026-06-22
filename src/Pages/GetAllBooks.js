import { DataContext } from "../Context/ApiContext";
import OutlinedCard from "../Componants/Card";
import { useContext, useState, useEffect } from "react";
import "../Css/Cards.css";
import Aside from "../Componants/Aside";
import { Skeleton } from "@mui/material";
import Stack from "@mui/material/Stack";
import api from "../api/axios";
import SimpleSnackbar from "./../Componants/Snakbar";
import SendRequest from "../Componants/SendRequest";
import { BookContext } from "../Context/BookContext";

export default function GetAllBooks({ delet, rent }) {
  const {FetechCountOfCart } = useContext(DataContext);
  const { books, loading, bookCount, fetchBooks}=useContext(BookContext);
  const [userType, setUserType] = useState("");
  const [category, SetCategory] = useState("All");
  const [request, setRequest] = useState(false);
  const [bookId, setBookId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", color: "success" });

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUserType(user);
  }, []);

  const handleClose = () => setRequest(false);

  const handleRequest = async () => {
    try {
      const res = await api.post(`/request-list`, { book_id: bookId });     
      showSnackbar(res.data?.message || "تم إرسال الطلب بنجاح", "success");
      handleClose();
    } catch (error) {
      console.log(error);
      const errorMsg = error.response?.data?.message || error.message;
      showSnackbar(errorMsg, "error");
      handleClose()
    }
  };

  const showSnackbar = (message, color = "success") => {
    setSnackbar({ open: true, message, color });
  };

  const handleClickOpen = async (id) => {
    try {
      const res = await api.delete(`/books/${id}`);
      showSnackbar(res.data?.message || "تم حذف الكتاب بنجاح");
      if(FetechCountOfCart){
        FetechCountOfCart()
      }
      if(fetchBooks){
        fetchBooks()
      }
    } catch (error) {
      console.log(error);
      showSnackbar("فشلت عملية الحذف المحددة", "error");
    }
  };

  const filterBook = books.filter((book) => {
    if (category === "" || category === "All") return true;
    return book ? book.category_id == category : false;
  });

  const skeletonArray = Array(bookCount || 6).fill(0);

  return (
    <>
      <div className="page-container">
        <Aside SetCategory={SetCategory} category={category} />

        <main className="main-content">
          <header className="content-header">
            <h1 className="title">Book Collection</h1>
            <p className="books-count">{loading ? "Loading books..." : `Showing ${filterBook.length} books`}</p>
          </header>

          <div className="books-grid">
            {loading
              ? skeletonArray.map((_, index) => (
                  <div className="book-animated-card" key={`skeleton-${index}`}>
                    <Stack spacing={1}>
                      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="rectangular" width={210} height={60} />
                      <Skeleton variant="rounded" width={210} height={60} />
                    </Stack>
                  </div>
                ))
              : filterBook?.map((book, index) => (
                  <div className="book-animated-card" key={book.id || index} style={{ "--delay": index }}>
                    <OutlinedCard 
                      canDelete={delet} 
                      rent={rent} 
                      handleClickOpen={handleClickOpen} 
                      book={book} 
                      showSnackbar={userType !== "admin" ? showSnackbar : undefined}
                      setBookId={userType !== "admin" ? setBookId : undefined}
                      setRequest={userType !== "admin" ? setRequest : undefined}
                    />
                  </div>
                ))}
          </div>
        </main>
      </div>

      <SimpleSnackbar
        open={snackbar.open}
        message={snackbar.message}
        color={snackbar.color}
        handleClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />

      <SendRequest open={request} handleClose={handleClose} handleRequest={handleRequest} />
    </>
  );
}