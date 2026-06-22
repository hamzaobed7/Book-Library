import React, { useContext, useEffect, useState } from "react";
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
  TextField, 
  InputAdornment 
} from "@mui/material";

import SimpleSnackbar from "../Componants/Snakbar";

import EmailIcon from "@mui/icons-material/Email";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search"; 
import { AuthonticationContext } from "../Context/AuthonticationContext";

export default function GetAllCustomer() {
  const { customer } = useContext(AuthonticationContext);
  const [opens, setOpens] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  const imageBaseUrl = "http://127.0.0.1:8000/storage/customer_images";

  const filteredCustomers = customer?.filter((c) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      c.name?.toLowerCase().includes(searchLower) ||
      c.user?.email?.toLowerCase().includes(searchLower) ||
      c.phone?.toString().includes(searchLower)
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
          </Typography>

          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by name, email, or phone..."
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
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Phone</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Gender</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>DOB</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers && filteredCustomers.length > 0 ? (
                filteredCustomers.map((c) => (
                  <TableRow key={c.id} hover sx={{ "&:nth-of-type(even)": { backgroundColor: "#f8fafc" }, transition: "0.3s" }}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ bgcolor: "#4a90e2", mr: 2 }} src={`${imageBaseUrl}/${c.cover}`} >
                          {c.name ? c.name.charAt(0).toUpperCase() : "C"}
                        </Avatar>
                        <Typography sx={{ fontWeight: "500" }}>{c.name}</Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", color: "#4a5568" }}>
                        {c.phone}
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", color: "#4a5568" }}>
                        <EmailIcon fontSize="small" sx={{ mr: 1, color: "#94a3b8" }} />
                        {c.user?.email}
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip label={c.gender} color={c.gender === "Male" ? "primary" : "secondary"} variant="outlined" size="small" />
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", color: "#4a5568" }}>
                        <CalendarMonthIcon fontSize="small" sx={{ mr: 1, color: "#94a3b8" }} />
                        {c.DOB}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4, color: "#64748b", fontStyle: "italic" }}>
                    No results found matching "{searchTerm}"
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <SimpleSnackbar message="Delete is success" open={opens} handleClose={() => setOpens(false)} />
    </>
  );
}