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
} from "@mui/material";


import DeleteIcon from "@mui/icons-material/Delete";
import DraggableDialog from "../Componants/Contest";
import api from "../api/axios";
import SimpleSnackbar from "../Componants/Snakbar";
import { BookContext } from "../Context/BookContext";

export default function GetAllCategory() {
  const { categories,fetchCategories } = useContext(BookContext);

  const [color, setColor] = useState("");
  const [mess, SetMes] = useState("");
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
      await api.delete(`categories/${selectedId}`);
      setOpen(false);
      setOpens(true);
      SetMes("the Category is Deleted")
      setColor("success")
      if(fetchCategories){
        fetchCategories()
      }
      console.log("Deleted Successfully");
    } catch (error) {
      setOpens(true);
      SetMes("errors")
      setColor("error")
      console.log(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          p: 4,
          backgroundColor: "#f5f7fa",
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: "#1a202c",
          }}
        >
          Categories Management
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#4a90e2" }}>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Type
                </TableCell>

                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Description
                </TableCell>

                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {categories?.map((category) => (
                <TableRow
                  key={category.id}
                  hover
                  sx={{
                    "&:nth-of-type(even)": {
                      backgroundColor: "#f8fafc",
                    },
                    transition: "0.3s",
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        sx={{
                          bgcolor: "#4a90e2",
                          mr: 2,
                        }}
                      >
                        {category.name.charAt(0).toUpperCase()}
                      </Avatar>

                      <Typography sx={{ fontWeight: "500" }}>
                        {category.name}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography sx={{ fontWeight: "500" }}>
                      {category.description}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <button
                      style={{
                        backgroundColor: "white",
                        fontSize: "20px",
                        color: "red",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleClickOpen(category.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <DraggableDialog
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
        message="this Category"
      />

      <SimpleSnackbar
        message={mess}
        color={color}
        open={opens}
        handleClose={() => setOpens(false)}
      />
    </>
  );
}