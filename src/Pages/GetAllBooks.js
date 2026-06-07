import { DataContext } from "../Context/ApiContext";
import OutlinedCard from "../Componants/Card";
import Loadi from "../Componants/LoadingP";
import { useContext, useState } from "react";
import "../Css/Cards.css";
import Aside from "../Componants/Aside";

export default function GetAllBooks() {
  const { books, loading, categories } = useContext(DataContext);
  const [category, SetCategory] = useState("All");
  if (loading) {
    return <div style={{marginLeft:"50%"}}><Loadi /></div>;
  }
  const filterBook = books.filter((book) => {
    if (category === "" || category === "All") {
      return true;
    }
    return book ? book.category_id == category : books;
  });
  
  
  return (
    <div className="page-container">
     
<Aside  SetCategory={SetCategory} category={category} />
     
      <main className="main-content">
        <header className="content-header">
          <h1 className="title">Book Collection</h1>
          <p className="books-count">Showing {filterBook.length} books</p>
        </header>

        <div className="books-grid">
          {filterBook?.map((book, index) => {
            return (
              <div 
                className="book-animated-card" 
                key={book.id || index}
                style={{ "--delay": index }} 
              >
                <OutlinedCard book={book} />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}