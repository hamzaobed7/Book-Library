import { useState, useContext } from "react";
import { DataContext } from "../Context/ApiContext";
import api from "../api/axios";
import { Box, Autocomplete, TextField, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SimpleSnackbar from "../Componants/Snakbar";

export default function DeleteCollections() {
  // جعل الحالة الافتراضية تبدأ من الـ Author للتجريب فوراً
  const [selection, setSelection] = useState("Author");

  const [selectedItems, setSelectedItems] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { books = [], authors = [], categories = [], fetchBooks, fetchAuthors, fetchCategories } = useContext(DataContext);

  let options = [];
  let placeholderText = "";
  let getOptionLabelFunc = (option) => "";

  if (selection === "Book") {
    options = books;
    placeholderText = "Search and select books to delete...";
    getOptionLabelFunc = (option) => option.title || "";
  } else if (selection === "Author") {
    options = authors;
    placeholderText = "Search and select authors to delete...";
    getOptionLabelFunc = (option) => (option.first_name ? `${option.first_name} ${option.last_name || ""}` : option.name || "");
  } else if (selection === "Category") {
    options = categories;
    placeholderText = "Search and select categories to delete...";
    getOptionLabelFunc = (option) => option.name || "";
  }

  const handleSelectionChange = (e) => {
    setSelection(e.target.value);
    setSelectedItems([]);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      alert("Please select at least one item to delete.");
      return;
    }

    const confirmDelete = window.confirm(`Are you sure you want to delete the selected ${selection}(s)?`);
    if (!confirmDelete) return;

    setIsDeleting(true);

    try {
      const idsToDelete = selectedItems.map((item) => item.id);
    
      // إرسال المصفوفة عبر الـ body إلى المسار المستهدف لتجربة الـ Author
      await api.delete('/deleteMulti', {
        data: { ids: idsToDelete },
      });

      // استدعاء دالة التحديث الخاصة بالمؤلفين بناءً على اختيارك الحالي
      if (selection === "Author" && fetchAuthors) fetchAuthors();
      if (selection === "Book" && fetchBooks) fetchBooks();
      if (selection === "Category" && fetchCategories) fetchCategories();

      setSnackbarMessage(`${selection}(s) Deleted Successfully`);
      setOpenSnackbar(true);
      setSelectedItems([]);
    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
      alert("An error occurred while deleting items.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="parent-div" style={{ fontFamily: "'Inter', sans-serif" }}>
        <form className="form" onSubmit={handleDelete}>
          <h1 style={{ color: "#ef4444", marginBottom: "20px" }}>Delete Collections</h1>

          <label style={{ display: "block", fontSize: "14px", color: "#4a5568", marginBottom: "5px", textAlign: "left" }}>Select Type to Delete:</label>
          <select value={selection} onChange={handleSelectionChange} className="Select-form" disabled={isDeleting} style={{ marginBottom: "20px" }}>
            <option value="Author">Authors</option>
            <option value="Book">Books</option>
            <option value="Category">Categories</option>
          </select>

          

          <button
            type="submit"
            disabled={isDeleting || selectedItems.length === 0}
            style={{
              cursor: isDeleting || selectedItems.length === 0 ? "not-allowed" : "pointer",
              background: isDeleting || selectedItems.length === 0 ? "#fca5a5" : "#ef4444",
              color: "#fff",
              border: "none",
              padding: "12px",
              width: "100%",
              borderRadius: "6px",
              fontWeight: "600",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {isDeleting ? (
              <>
                <CircularProgress size={18} style={{ color: "#ffffff" }} />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <DeleteIcon fontSize="small" />
                <span>Delete Selected ({selectedItems.length})</span>
              </>
            )}
          </button>
        </form>
      </div>

      <SimpleSnackbar
        message={snackbarMessage}
        handleClick={() => setOpenSnackbar(true)}
        handleClose={(e, reason) => {
          if (reason !== "clickaway") setOpenSnackbar(false);
        }}
        open={openSnackbar}
      />
    </>
  );
}