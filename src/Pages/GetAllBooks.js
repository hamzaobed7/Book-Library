import { DataContext } from "../Context/ApiContext";
import OutlinedCard from "../Componants/Card";
import { useContext, useState } from "react";
import "../Css/Cards.css";
import Aside from "../Componants/Aside";
import { Skeleton } from "@mui/material";
import Stack from '@mui/material/Stack';
import api from "../api/axios";
import SimpleSnackbar from './../Componants/Snakbar';
import { fi } from "zod/v4/locales";

export default function GetAllBooks() {
  const { books, loading,bookCount,fetchBooks } = useContext(DataContext);
  const [Snak,setSnak]=useState(false);
  const [category, SetCategory] = useState("All");
const handleClickOpen=async(id)=>{
try{
const responce=await api.delete(`/books/${id}`);
fetchBooks()
setSnak(true)
}catch(error){
  console.log(error)
}

  }
  const filterBook = books.filter((book) => {
    if (category === "" || category === "All") {
      return true;
    }
    return book ? book.category_id == category : books;
  });
  const skeletonArray = Array(bookCount).fill(0);

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
            : filterBook?.map((book, index) => {
                return (
                  <div className="book-animated-card" key={book.id || index} style={{ "--delay": index }}>
                    <OutlinedCard handleClickOpen={handleClickOpen} book={book} />
                  </div>
                );
              })}
        </div>
      </main>
    </div>
    <SimpleSnackbar open={Snak} message={"Delete is Successful"} />
    </>
  );
}
