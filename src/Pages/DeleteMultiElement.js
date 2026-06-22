import { useState, useContext } from "react";
import { DataContext } from "../Context/ApiContext";
import api from "../api/axios";
import { CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SimpleSnackbar from "../Componants/Snakbar";
import SelectionItem from "../Componants/SelectionItem";
import AutoComplete from './../Componants/AutoComplete';
import { BookContext } from "../Context/BookContext";

export default function DeleteMultiElement() {
  const [selection, setSelection] = useState("Author");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [open, setOpen] = useState(false);

  const { books = [], authors = [], fetchBooks, fetchAuthors, fetchCategories } = useContext(BookContext);

  const handleClick = () => setOpen(true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };
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
      let element = selection === "Author" ? "/deletemulti/author" : "/deletemulti/books";

      await api.delete(element, {
        data: { ids: idsToDelete },
      });

      if (selection === "Author" && fetchAuthors) fetchAuthors();
      if (selection === "Book" && fetchBooks) fetchBooks();
      if (selection === "Category" && fetchCategories) fetchCategories();

      setSnackbarMessage(`${selection}(s) Deleted Successfully ${<DeleteIcon/>} `);
      setOpen(true);
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

          <SelectionItem selection={selection} handleSelectionChange={handleSelectionChange} isDeleting={isDeleting} />

          <AutoComplete
            placeholderText={placeholderText}
            isDeleting={isDeleting}
            options={options}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems} 
            getOptionLabelFunc={getOptionLabelFunc}
          />

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

      <SimpleSnackbar message={snackbarMessage} color={"error"} handleClick={handleClick} handleClose={handleClose} open={open} />
    </>
  );
}
