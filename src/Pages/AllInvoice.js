import { useEffect, useState } from "react";
import api from "../api/axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import ItemsDetails from "../Componants/ItemsDetiles";


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

export default function AllInvoice() {
  const [bills, setBills] = useState([]);
  
  // 💡 حالات التحكم بالـ Modal والعنصر المختار
  const [openModal, setOpenModal] = useState(false);
  const [selectedBillId, setSelectedBillId] = useState(null);

  useEffect(() => {
    getbills();
  }, []);

  const getbills = async () => {
    try {
      const res = await api.get("/bill");
      setBills(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenItems = (id) => {
    setSelectedBillId(id);
    setOpenModal(true);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: "12px", boxShadow: "0px 10px 30px rgba(0,0,0,0.1)", mt: 4 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Bills Id #</StyledTableCell>
              <StyledTableCell align="right">Customer Name</StyledTableCell>
              <StyledTableCell align="right">Total Amount</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Items</StyledTableCell>
              <StyledTableCell align="center">Customer Profile</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.map((bill) => (
              <StyledTableRow key={bill.id}>
                <StyledTableCell component="th" scope="row" style={{ fontWeight: "600" }}>
                  #{bill.id}
                </StyledTableCell>
                <StyledTableCell align="right">{bill.customer?.name || "N/A"}</StyledTableCell>
                <StyledTableCell align="right">$ {parseFloat(bill.total_amount).toFixed(2)}</StyledTableCell>
                <StyledTableCell align="right">{bill.created_at ? new Date(bill.created_at).toLocaleDateString() : "N/A"}</StyledTableCell>
                <StyledTableCell align="center">
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "700",
                      backgroundColor: bill.status === "pinding_payment" ? "#fff3e0" : bill.status === "canceled" ? "#ffebee" : "#e8f5e9",
                      color: bill.status === "pinding_payment" ? "#b76100" : bill.status === "canceled" ? "#c62828" : "#2e7d32",
                    }}
                  >
                    {bill.status === "pinding_payment" ? "Pending" : bill.status}
                  </span>
                </StyledTableCell>
                
                <StyledTableCell align="center">
                  <IconButton onClick={() => handleOpenItems(bill.id)} sx={{ color: "#1a73e8" }}>
                    <AttachFileIcon />
                  </IconButton>
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Link to={`/requstCustomer/${bill.customer?.id}`} style={{ fontSize: "24px", color: "#1a73e8", display: "inline-flex", alignItems: "center" }}>
                    <PersonIcon />
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ItemsDetails 
        openViewModal={openModal} 
        handleCloseModal={() => setOpenModal(false)} 
        billId={selectedBillId} 
      />
    </>
  );
}