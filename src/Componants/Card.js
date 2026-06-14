import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../Css/Cards.css";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function OutlinedCard({delet,rent,book, handleClickOpen}) {

  const imageBaseUrl = "http://127.0.0.1:8000/storage/book_image/";
  const defaultImage = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000&auto=format&fit=crop";

  return (
    <Box className="card-wrapper">
      <Card className="card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <CardMedia className="images" component="img" height="320" image={book.cover ? `${imageBaseUrl}${book.cover}` : defaultImage} alt={book.title} className="book-cover-media" />

        <CardContent className="card-content" style={{ flexGrow: 1 }}>
          <Typography className="book-title" variant="h6" sx={{ textWrap: "wrap" }} component="div">
            {book.title}
          </Typography>

          <Typography className="book-isbn">ISBN: {book.ISBN}</Typography>

          <Typography className="book-price">Price: {book.rental_price} $</Typography>

          <Typography className="book-date">Publication Date : {book.publication_date}</Typography>

          <Typography className="book-available">Total Copy: {book.total_copies}</Typography>
        </CardContent>

        <CardActions className="card-actions">
          <Button className="btn-more">
            <Link to={`/BookDetiles/${book.id}`} style={{ textDecoration: "none", color: "wheat" }}>
              View Details
            </Link>
          </Button>

          {rent && (
            <Button
              onClick={() => {
                alert("عم امزح مو هلق ");
              }}
              className="btn-more"
            >
              Rente Now!
            </Button>
          )}

          {delet && (
            <IconButton sx={{ color: "red" }} aria-label="delete" onClick={() => handleClickOpen(book.id)}>
              <DeleteIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </Box>
  );
}
