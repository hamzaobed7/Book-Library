import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import api from "./../api/axios";
import { Button, MenuItem, Select } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import SimpleSnackbar from "./../Componants/Snakbar";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1a73e8",
    color: theme.palette.common.white,
    fontSize: "16px",
    fontWeight: "700",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AllRequest() {
  const [rows, setRows] = useState([]);
  const [mes, setMes] = useState("");
  const [open, setOpen] = useState(false);
  const noLabelId = React.useId();

  const handleGetRequest = async () => {
    try {
      const res = await api.get("book_request");
      setRows(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChangeLocal = (id, newStatus) => {
    setRows((prevRows) => prevRows.map((row) => (row.id === id ? { ...row, status: newStatus } : row)));
  };

  const handleUpdate = async (id, currentStatus) => {
    try {
      await api.patch(`/upstatus/${id}`, { status: currentStatus });
      setOpen(true);
      setMes("تم ارسال الرد بنجاح");
      handleGetRequest();
    } catch (error) {
      console.log(error);
      setOpen(true);
      setMes(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    handleGetRequest();
  }, []);

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: "12px", boxShadow: "0px 10px 30px rgba(0,0,0,0.1)", mt: 4 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Book Title</StyledTableCell>
              <StyledTableCell align="right">Author Name</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Current Status</StyledTableCell>
              <StyledTableCell align="right">Change Status</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
              <StyledTableCell align="center">Customer Profile</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ width: "100%" }}>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row" style={{ fontWeight: "600" }}>
                  {row.book_title}
                </StyledTableCell>
                <StyledTableCell align="right">{row.author_name}</StyledTableCell>
                <StyledTableCell align="right">{row.created_at ? new Date(row.created_at).toLocaleDateString() : "N/A"}</StyledTableCell>

                <StyledTableCell align="right">
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "700",
                      backgroundColor: row.status === "processed" ? "#e8f5e9" : row.status === "rejected" ? "#ffebee" : "#e3f2fd",
                      color: row.status === "processed" ? "#2e7d32" : row.status === "rejected" ? "#c62828" : "#1565c0",
                    }}
                  >
                    {row.status}
                  </span>
                </StyledTableCell>

                <StyledTableCell align="right">
                  <Select
                    aria-describedby={`${noLabelId}-helper-text`}
                    value={row.status || "new"}
                    onChange={(e) => handleStatusChangeLocal(row.id, e.target.value)}
                    inputProps={{ "aria-label": "Status" }}
                    size="small"
                  >
                    <MenuItem value="processed">Processed</MenuItem>
                    <MenuItem value="new">New</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  </Select>
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Button variant="contained" color="primary" size="small" startIcon={<SaveIcon />} onClick={() => handleUpdate(row.id, row.status)}>
                    Save
                  </Button>
                </StyledTableCell>

                <StyledTableCell align="center">
                  
                  <Link to={`/requstCustomer/${row.customer_id}`} style={{ fontSize: "24px", color: "#1a73e8", display: "inline-flex", alignItems: "center" }}>
                    <PersonIcon />
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SimpleSnackbar
        message={mes}
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
}