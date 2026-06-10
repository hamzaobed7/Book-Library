import React, { useContext, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Typography, Box, Chip, IconButton } from "@mui/material";
import api from "../api/axios";
import SimpleSnackbar from "../Componants/Snakbar";
import { DataContext } from "../Context/ApiContext";
import EmailIcon from "@mui/icons-material/Email";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteIcon from "@mui/icons-material/Delete";
import DraggableDialog from "../Componants/Contest";

export default function GetAllAuthors() {
  const { authors, fetchAuthors } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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

  return (
    <>
      <Box sx={{ p: { xs: 2, sm: 4 }, backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: "#1a202c",
            fontSize: { xs: "1.8rem", sm: "2.125rem" },
          }}
        >
          Authors Management
        </Typography>

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
              {authors?.map((author) => (
                <TableRow key={author.id} hover sx={{ "&:nth-of-type(even)": { backgroundColor: "#f8fafc" }, transition: "0.3s" }}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: "#4a90e2", mr: 2 }}>{author.first_name.charAt(0).toUpperCase()}</Avatar>
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <DraggableDialog open={open} handleClose={handleClose} handleDelete={handleDelete} message="this author" />

      <SimpleSnackbar message="Delete is success" open={opens} handleClose={() => setOpens(false)} />
    </>
  );
}