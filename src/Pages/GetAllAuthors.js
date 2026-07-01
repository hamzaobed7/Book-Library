import React, { useContext, useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Avatar, 
  Typography, 
  Box, 
  Chip, 
  IconButton, 
  TextField, 
  InputAdornment 
} from "@mui/material";
import api from "../api/axios";
import SimpleSnackbar from "../Componants/Snakbar";
import EmailIcon from "@mui/icons-material/Email";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import DraggableDialog from "../Componants/Contest";
import { BookContext } from "../Context/BookContext";

export default function GetAllAuthors() {
  const { authors, fetchAuthors } = useContext(BookContext);
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`authors/${selectedId}`);
      setOpen(false);
      setOpens(true);
      console.log("Deleted Successfully");
      
      if (fetchAuthors) {
        fetchAuthors();
      } 
    } catch (error) {
      console.log(error);
    }
  };
console.log(authors)
  const filteredAuthors = authors?.filter((author) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      author.first_name?.toLowerCase().includes(searchLower) ||
      author.last_name?.toLowerCase().includes(searchLower) ||
      author.email?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <Box sx={{ p: { xs: 2, sm: 4 }, backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
        
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, mb: 3, gap: 2 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#1a202c",
              fontSize: { xs: "1.8rem", sm: "2.125rem" },
            }}
          >
            Authors Management
          </Typography>

          {/* 3. حقل إدخال البحث */}
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: { xs: "100%", sm: "320px" },
              backgroundColor: "#fff",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#94a3b8" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
            overflowX: "auto",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#4a90e2" }}>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>First Name</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Last Name</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Gender</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Bio</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Birth Date</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* 4. رندرة المصفوفة المفلترة بدلاً من الأصلية */}
              {filteredAuthors && filteredAuthors.length > 0 ? (
                filteredAuthors.map((author) => (
                  <TableRow key={author.id} hover sx={{ "&:nth-of-type(even)": { backgroundColor: "#f8fafc" }, transition: "0.3s" }}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ bgcolor: "#4a90e2", mr: 2 }}>
                          {author.first_name ? author.first_name.charAt(0).toUpperCase() : "A"}
                        </Avatar>
                        <Typography sx={{ fontWeight: "500" }}>{author.first_name}</Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", color: "#4a5568" }}>
                        {author.last_name}
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", color: "#4a5568" }}>
                        <EmailIcon fontSize="small" sx={{ mr: 1, color: "#94a3b8" }} />
                        {author.email}
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip label={author.gender} color={author.gender === "Male" ? "primary" : "secondary"} variant="outlined" size="small" />
                    </TableCell>

                    <TableCell sx={{ maxWidth: 200, color: "#718096" }}>
                      <Typography variant="body2" noWrap title={author.bio}>
                        {author.bio}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", color: "#4a5568" }}>
                        <CalendarMonthIcon fontSize="small" sx={{ mr: 1, color: "#94a3b8" }} />
                        {author.birth_date}
                      </Box>
                    </TableCell>

                    <TableCell>
                      <IconButton sx={{ color: "red" }} aria-label="delete" onClick={() => handleClickOpen(author.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
            
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4, color: "#64748b", fontStyle: "italic" }}>
                    No authors found matching "{searchTerm}"
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <DraggableDialog open={open} handleClose={handleClose} handleDelete={handleDelete} message="this author" />

      <SimpleSnackbar message="Delete is success" open={opens} handleClose={() => setOpens(false)} />
    </>
  );
}