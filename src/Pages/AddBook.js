import { useState, useContext } from "react";
import { DataContext } from "../Context/ApiContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "../Css/AddBook.css";
import SimpleSnackbar from "../Componants/Snakbar";
import api from "../api/axios";

const MAX_FILE_SIZE = 2 * 1024 * 1024; 
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const schema = z.object({
  ISBN: z.string().length(13, "The ISBN must be exactly 13 characters"),
  title: z.string().min(3, "The title is too short").max(50, "The title is too long"),
  rental_price: z.coerce.number().positive("Must be a positive number"),  
  published_at: z.coerce.date().refine((date) => date <= new Date(), {
    message: "The date cannot be in the future"
  }),
  deposit: z.coerce.number().positive("Must be positive"),
  total_copies: z.coerce.number().int().positive("Must be a positive integer"),
  pages: z.coerce.number().int().positive("Must be a positive integer"),
  default_borrow_days: z.coerce.number().int().positive("Must be a positive integer"),
  stock: z.coerce.number().int().nonnegative("Stock cannot be negative"),
  category_id: z.coerce.number().min(1, "Category is required"),
  authors: z.array(z.number()).min(1, "Select at least one author"),
  
  cover: z
    .any()
    .refine((files) => files?.length === 1, "Book cover image is required")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Max image size is 2MB.")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
});

export default function AddBook() {
  const [open, setOpen] = useState(false);
  const { categories = [], authors = [], fetchBooks } = useContext(DataContext); 

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
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
      stock: "",
      cover: null
    }
  });

  const handleClick = () => setOpen(true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleAuthorsChange = (e) => {
    const selectedAuthors = Array.from(
      e.target.selectedOptions,
      (option) => Number(option.value)
    );
    setValue("authors", selectedAuthors, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("ISBN", data.ISBN);
    formData.append("title", data.title);
    formData.append("rental_price", data.rental_price);
    formData.append("deposit", data.deposit);
    formData.append("total_copies", data.total_copies);
    formData.append("stock", data.stock);
    formData.append("pages", data.pages);
    formData.append("default_borrow_days", data.default_borrow_days);
    formData.append("category_id", data.category_id);
    const formattedDate = data.published_at.toISOString().split("T")[0];
    formData.append("published_at", formattedDate);

    if (data.cover && data.cover[0]) {
      formData.append("cover", data.cover[0]);
    }
    data.authors.forEach((authorId) => {
      formData.append("authors[]", authorId);
    });

    try {
      const response = await api.post("/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log("SERVER RESPONSE:", response.data);
      setOpen(true); 
      reset(); 
      if(fetchBooks){
        fetchBooks();
      }
    } catch (error) {
      console.log("ERROR:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <div className="parent-div" style={{ fontFamily: "'Inter', sans-serif" }}>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h1 style={{ color: "#667eea", marginBottom: "20px" }}>Add New Book</h1>

          <input type="text" placeholder="ISBN (13 digits)" {...register("ISBN")} className="input-form" />
          <p style={{ color: "red", fontSize: "13px", marginTop: "2px" }}>{errors.ISBN?.message}</p>

          <input type="text" placeholder="Book Title" {...register("title")} className="input-form" />
          <p style={{ color: "red", fontSize: "13px", marginTop: "2px" }}>{errors.title?.message}</p>

          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <input type="number" step="0.01" {...register('rental_price')} placeholder="Rental Price ($)" className="input-form" />
              <p style={{ color: "red", fontSize: "13px" }}>{errors.rental_price?.message}</p>
            </div>

            <div style={{ flex: 1 }}>
              <input type="number" step="0.01" {...register('deposit')} placeholder="Deposit ($)" className="input-form" />
              <p style={{ color: "red", fontSize: "13px" }}>{errors.deposit?.message}</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <input type="number" {...register('total_copies')} placeholder="Total Copies" className="input-form" />
              <p style={{ color: "red", fontSize: "13px" }}>{errors.total_copies?.message}</p>
            </div>

            <div style={{ flex: 1 }}>
              <input type="number" {...register('stock')} placeholder="Current Stock" className="input-form" />
              <p style={{ color: "red", fontSize: "13px" }}>{errors.stock?.message}</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <input type="number" {...register('pages')} placeholder="Pages Count" className="input-form" />
              <p style={{ color: "red", fontSize: "13px" }}>{errors.pages?.message}</p>
            </div>

            <div style={{ flex: 1 }}>
              <input type="number" {...register('default_borrow_days')} placeholder="Default Borrow Days" className="input-form" />
              <p style={{ color: "red", fontSize: "13px" }}>{errors.default_borrow_days?.message}</p>
            </div>
          </div>

          <label style={{ display: "block", fontSize: "14px", color: "#4a5568", marginBottom: "5px", textAlign: "left" }}>Publication Date:</label>
          <input type="date" {...register("published_at")} className="input-form-date" />
          <p style={{ color: "red", fontSize: "13px" }}>{errors.published_at?.message}</p>

          
          <label style={{ display: "block", fontSize: "14px", color: "#4a5568", marginBottom: "5px", textAlign: "left" }}>Book Cover Image:</label>
          <input type="file" accept="image/*" {...register("cover")} className="input-form" style={{ padding: '8px' }} />
          <p style={{ color: "red", fontSize: "13px" }}>{errors.cover?.message}</p>

          <select {...register("category_id")} className="Select-form">
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name || category.type} 
              </option>
            ))}
          </select>
          <p style={{ color: "red", fontSize: "13px" }}>{errors.category_id?.message}</p>

          <label style={{ display: "block", fontSize: "14px", color: "#4a5568", marginBottom: "5px", textAlign: "left" }}>Select Authors (Hold Ctrl to select multiple):</label>
          <select multiple onChange={handleAuthorsChange} className="select-form-author" style={{ height: '100px', width: '100%', padding: '8px' }}>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.first_name ? `${author.first_name} ${author.last_name || ''}` : author.name}
              </option>
            ))}
          </select>
          <p style={{ color: "red", fontSize: "13px" }}>{errors.authors?.message}</p>

          <br />
          <button type="submit" style={{ cursor: "pointer", background: "#667eea", color: "#fff", border: "none", padding: "12px", width: "100%", borderRadius: "6px", fontWeight: "600" }}>
            Add Book
          </button>
        </form>
      </div>

      <SimpleSnackbar message={"Book Added Successfully"} handleClick={handleClick} handleClose={handleClose} open={open} />
    </>
  );
}