import { DataContext } from "../Context/ApiContext";
import OutlinedCard from "../Componants/Card";
import { useContext, useState } from "react";
import "../Css/Cards.css";
import Aside from "../Componants/Aside";
import { Skeleton } from "@mui/material";
import Stack from '@mui/material/Stack';
import api from "../api/axios";
import SimpleSnackbar from './../Componants/Snakbar';


export default function GetAllBooks({delet,rent}) {
  const { books, loading,bookCount,fetchBooks } = useContext(DataContext);
  const [Snak,setSnak]=useState(false);
  const [type,setType]=useState("")
  const [category, SetCategory] = useState("All");
const handleClickOpen=async(id)=>{
try{
const responce=await api.delete(`/books/${id}`);
const user=localStorage.getItem('user')
setType(user)
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
                    {(type==='admin'?<OutlinedCard delet={delet} rent={rent} handleClickOpen={handleClickOpen} book={book} />:<OutlinedCard delet={delet} rent={rent} handleClickOpen={handleClickOpen} book={book} />)}
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
