import * as React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import api from "./../api/axios";
import { DataContext } from "../Context/ApiContext";
import "../Css/Cards.css";
import { AuthonticationContext } from "../Context/AuthonticationContext";
import Rating from "@mui/material/Rating";
export default function OutlinedCard({ canDelete, rent, book, handleClickOpen, showSnackbar, setBookId, setRequest }) {
  const { FetechCountOfCart } = useContext(DataContext);
  const { Profile } = useContext(AuthonticationContext);
  const imageBaseUrl = "http://127.0.0.1:8000/storage/book_image/";
  const defaultImage = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000&auto=format&fit=crop";
  const [value, setValue] = React.useState(2);
  const AddtoCart = async (id) => {
    try {
      await api.post("/cart", { book_id: id, customer_id: Profile?.id });
      if (FetechCountOfCart) FetechCountOfCart();
      showSnackbar("تمت إضافة الكتاب للسلة", "success");
    } catch (error) {
      const fallbackError = "حدث خطأ أثناء إضافة الكتاب للسلة";
      showSnackbar(error.response?.data?.message || fallbackError, "error");
      if (!(error.response?.data?.message === "هذا الكتاب موجود بالفعل في سلة الشراء.")) {
        if (setRequest) setRequest(true);
        if (setBookId) setBookId(id);
      }
    }
  };

  return (
    <Box className="card-wrapper">
      <Card className="card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <CardMedia className="images book-cover-media" component="img" height="320" image={book.cover ? `${imageBaseUrl}${book.cover}` : defaultImage} alt={book.title} />
        <CardContent className="card-content" style={{ flexGrow: 1 }}>
          <Typography className="book-title" variant="h6" component="div">
            {book.title}
          </Typography>
          <Typography className="book-isbn">ISBN: {book.ISBN}</Typography>
          <Typography className="book-price">Price: {book.rental_price} $</Typography>
          <Typography className="book-date">Publication Date: {book.publication_date}</Typography>
          <Typography className="book-available">Total Copy: {book.total_copies}</Typography>
          <Typography>
            Rating:
            <Rating
              name="simple-controlled"
              value={value}
              sx={{ fontSize: "30px" }}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </Typography>
        </CardContent>

        <CardActions className="card-actions" sx={{ display: "flex" ,justifyItems:"center",alignContent:"space-between"}}>
          <Button className="btn-more">
            <Link to={`/BookDetiles/${book.id}`} style={{ textDecoration: "none", color: "wheat" }}>
              View Details
            </Link>
          </Button>
          
          {rent && (
            <Box sx={{ width: "50%" }}>
              <ShoppingCartCheckoutIcon sx={{ cursor: "pointer", fontSize: "40px", color: book.stock > 0 ? "green" : "red" }} onClick={() => AddtoCart(book.id)} />
            </Box>
          )}
          {canDelete && (
            <IconButton sx={{ color: "red" }} aria-label="delete" onClick={() => handleClickOpen(book.id)}>
              <DeleteIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </Box>
  );
}
