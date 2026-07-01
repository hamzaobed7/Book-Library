import { useState, useContext, useEffect } from "react";
import "../Css/AddBook.css";
import SimpleSnackbar from "../Componants/Snakbar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api/axios";
import { BookContext } from "../Context/BookContext";

const schema = z.object({
  id: z.coerce.number(),
  ISBN: z.string().length(13, "The ISBN must be exactly 13 characters"),
  title: z.string().min(3, "The title is too short").max(50, "The title is too long"),
  rental_price: z.coerce.number().positive("Must be a positive number"),
  published_at: z.coerce.date().refine((date) => date <= new Date(), {
    message: "The date cannot be in the future",
  }),
  deposit: z.coerce.number().positive("Must be positive"),
  total_copies: z.coerce.number().int().positive("Must be a positive integer"),
  pages: z.coerce.number().int().positive("Must be a positive integer"),
  default_borrow_days: z.coerce.number().int().positive("Must be a positive integer"),
  category_id: z.coerce.number().min(1, "Category is required"),
  authors: z.array(z.number()).min(1, "Select at least one author"),
});

export default function UpdateBook() {
  const [open, setOpen] = useState(false);
  const [mes, setmes] = useState("");
  const [color, setColor] = useState("");
  const [selectedIsbnState, setSelectedIsbnState] = useState("");
  const { categories = [], authors = [], books = [], fetchBooks, fetchAuthors, fetchCategories } = useContext(BookContext);
  useEffect(() => {
    fetchBooks();
    fetchCategories();
    fetchAuthors();
  }, [fetchBooks, fetchCategories, fetchAuthors]);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      authors: [],
      ISBN: "",
      title: "",
      rental_price: "",
      deposit: "",
      total_copies: "",
      pages: "",
      default_borrow_days: "",
    },
  });

  const handleBookChange = (e) => {
    const SelectedISBN = e.target.value;
    setSelectedIsbnState(SelectedISBN);

    const bookList = books.data ?? books;
    const selectedBook = bookList.find((book) => book.ISBN === SelectedISBN);

    if (selectedBook) {
      setValue("id", selectedBook.id);
      setValue("ISBN", selectedBook.ISBN);
      setValue("title", selectedBook.title ?? "");
      setValue("rental_price", selectedBook.rental_price ?? "");
      setValue("deposit", selectedBook.deposit ?? "");
      setValue("total_copies", selectedBook.total_copies ?? "");
      setValue("pages", selectedBook.pages ?? "");
      setValue("default_borrow_days", selectedBook.default_borrow_days ?? "");
      setValue("category_id", selectedBook.category_id);

      if (selectedBook.published_at) {
        const formattedDate = new Date(selectedBook.published_at).toISOString().split("T")[0];
        setValue("published_at", formattedDate);
      }

      if (selectedBook.authors) {
        const authorIds = selectedBook.authors.map((auth) => auth.id ?? auth);
        setValue("authors", authorIds, { shouldValidate: true });
      } else {
        setValue("authors", [], { shouldValidate: true });
      }
    }
  };

  const handleAuthorsChange = (e) => {
    const selectedAuthors = Array.from(e.target.selectedOptions, (option) => Number(option.value));
    setValue("authors", selectedAuthors, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      published_at: data.published_at.toISOString().split("T")[0],
    };

    try {
      const response = await api.put(`/books/${formattedData.id}`, formattedData);
      setColor("success");
      setmes(response.data.message || "Book Updated Successfully");
      setOpen(true);
      if (fetchBooks) {
        fetchBooks();
      }
      reset();
      setSelectedIsbnState("");
    } catch (error) {
      console.log("ERROR:", error.response?.data || error.message);
      setColor("error");
      setmes(error.response?.data?.message || "Failed to update book");
      setOpen(true);
    }
  };

  return (
    <>
      <div className="parent-div" style={{ fontFamily: "'Inter', sans-serif" }}>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h1 style={{ color: "#667eea", marginBottom: "20px" }}>Update Book Record</h1>
          <select value={selectedIsbnState} onChange={handleBookChange} className="Select-form">
            <option value="">-- Choose a Book to Update --</option>
            {(books.data ?? books).map((book) => (
              <option key={book.id} value={book.ISBN}>
                {book.title} ({book.ISBN})
              </option>
            ))}
          </select>
          <br />

          <input placeholder="ISBN" {...register("ISBN")} className="input-form" />
          <p style={{ color: "red", fontSize: "13px" }}>{errors.ISBN?.message}</p>

          <input placeholder="Book Title" {...register("title")} className="input-form" />
          <p style={{ color: "red", fontSize: "13px" }}>{errors.title?.message}</p>

          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <input type="number" step="0.01" placeholder="Rental Price ($)" {...register("rental_price")} className="input-form" />
              <p style={{ color: "red", fontSize: "13px" }}>{errors.rental_price?.message}</p>
            </div>

            <div style={{ flex: 1 }}>
              <input type="number" step="0.01" placeholder="Deposit ($)" {...register("deposit")} className="input-form" />
              <p style={{ color: "red", fontSize: "13px" }}>{errors.deposit?.message}</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <input type="number" placeholder="Total Copies" {...register("total_copies")} className="input-form" />
              <p style={{ color: "red", fontSize: "13px" }}>{errors.total_copies?.message}</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <input type="number" placeholder="Pages" {...register("pages")} className="input-form" />
              <p style={{ color: "red", fontSize: "13px" }}>{errors.pages?.message}</p>
            </div>

            <div style={{ flex: 1 }}>
              <input type="number" placeholder="Default Borrow Days" {...register("default_borrow_days")} className="input-form" />
              <p style={{ color: "red", fontSize: "13px" }}>{errors.default_borrow_days?.message}</p>
            </div>
          </div>

          <label style={{ display: "block", fontSize: "14px", color: "#4a5568", marginBottom: "5px", textAlign: "left" }}>Publication Date:</label>
          <input type="date" {...register("published_at")} className="input-form-date" />
          <p style={{ color: "red", fontSize: "13px" }}>{errors.published_at?.message}</p>

          <select {...register("category_id")} className="Select-form">
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name || category.type}
              </option>
            ))}
          </select>
          <p style={{ color: "red", fontSize: "13px" }}>{errors.category_id?.message}</p>

          <label style={{ display: "block", fontSize: "14px", color: "#4a5568", marginBottom: "5px", textAlign: "left" }}>Authors (Hold Ctrl to select multiple):</label>
          <select multiple onChange={handleAuthorsChange} className="select-form-author" style={{ height: "100px", width: "100%", padding: "8px" }}>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.first_name ? `${author.first_name} ${author.last_name || ""}` : author.name}
              </option>
            ))}
          </select>
          <p style={{ color: "red", fontSize: "13px" }}>{errors.authors?.message}</p>

          <br />
          <button type="submit" style={{ cursor: "pointer", background: "#667eea", color: "#fff", border: "none", padding: "12px", width: "100%", borderRadius: "6px", fontWeight: "600" }}>
            Save Updates
          </button>
        </form>
      </div>

      <SimpleSnackbar
        message={mes}
        color={color}
        handleClick={() => setOpen(true)}
        handleClose={(e, reason) => {
          if (reason !== "clickaway") setOpen(false);
        }}
        open={open}
      />
    </>
  );
}
