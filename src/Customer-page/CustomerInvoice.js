import React, { useEffect, useState } from 'react';
import {
  Box, Container, Paper, Typography, Grid, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Button, Divider, Chip, CircularProgress
} from '@mui/material';
import { Print, Cancel, CheckCircle, Receipt, ArrowBack, Payment } from '@mui/icons-material';
import { invoiceStyles } from '../Css/invoiceStayle';
import api from './../api/axios';
import { useParams, useNavigate } from 'react-router-dom'; 

const company = {
  name: "Al Ahlam library",
  address: "Syria, Damascus, Midan",
  phone: "+963 930-515-201",
  taxId: "TX-7788776" 
};

export default function CustomerInvoice() {
  const [invoiceInfo, setInvoiceInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  
 
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    handleInvoice();
  }, [id]); 

  const handleInvoice = async () => {
    try {
      setLoading(true);
     
      const res = await api.get(`/showinvoice/${id}`);
      
      if (res.data?.data && res.data.data.length > 0) {
        setInvoiceInfo(res.data.data[0]);
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCancelInvoice = async () => {
    try{
    const res=await api.delete(`/deleteBill/${id}`);
    navigate(-1);
    }
    catch(error){
      console.log(error)
    }
  };

  if (loading || !invoiceInfo) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
        <CircularProgress size={45} thickness={4} />
      </Box>
    );
  }


  const bill = invoiceInfo.bill?.[0];
  const billItems = bill?.bill_items || [];
  const totalAmount = parseFloat(bill?.total_amount || 0);

  return (
    <Container maxWidth="md" sx={invoiceStyles.container}>
      
      <Box sx={{ ...invoiceStyles.actionBox, display: 'flex', gap: 2, justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Typography variant="h5" fontWeight="700" color="text.primary">
          Invoice Details
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button 
            variant="outlined" 
            startIcon={<ArrowBack />} 
            onClick={() => navigate(-1)} 
            sx={{ borderRadius: 2 }}
          >
            Go Back
          </Button>
          <Button 
            variant="contained" 
            disableElevation
            startIcon={<Print />} 
            onClick={handlePrint}
            sx={{ borderRadius: 2 }}
          >
            Print Invoice
          </Button>
        </Box>
      </Box>

      <Paper elevation={0} sx={invoiceStyles.paperBorder}>
        <Paper sx={invoiceStyles.paper}>
        
          <Chip 
            label={bill?.status === "canceled" ? "Canceled" : (bill?.status === "pinding_payment" ? "Pending Payment" : "Paid")} 
            color={bill?.status === "canceled" ? "error" : (bill?.status === "pinding_payment" ? "warning" : "success")} 
            icon={bill?.status === "canceled" ? <Cancel /> : <CheckCircle />}
            variant="flat"
            sx={invoiceStyles.statusChip}
          />

          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Receipt color="primary" sx={{ fontSize: 32 }} />
                <Typography variant="h5" fontWeight="800" color="primary.main">
                  {company.name}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">{company.address}</Typography>
              <Typography variant="body2" color="text.secondary">Phone: {company.phone}</Typography>
              <Typography variant="body2" color="text.secondary">Tax ID: {company.taxId}</Typography>
            </Grid>
            
            <Grid item xs={12} sm={6} sx={{ textAlign: { sm: 'right' }, mt: { xs: 2, sm: 0 } }}>
              <Typography variant="h4" fontWeight="300" color="text.secondary" sx={{ letterSpacing: 2 }}>INVOICE</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}><strong>Invoice No:</strong> #{bill?.id || id}</Typography>
              <Typography variant="body2"><strong>Date:</strong> {new Date().toLocaleDateString()}</Typography>
              <Typography variant="body2"><strong>Due Date:</strong> {bill?.date ? new Date(bill.date).toLocaleDateString() : 'N/A'}</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mb: 5 }}>
            <Grid item xs={12}>
              <Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }} display="block" gutterBottom>
                Bill To
              </Typography>
              <Typography variant="subtitle1" fontWeight="700">{invoiceInfo.name}</Typography>
              <Typography variant="body2" color="text.secondary">Phone: {invoiceInfo.phone}</Typography>
              <Typography variant="body2" color="text.secondary">Email: {invoiceInfo.email}</Typography>
            </Grid>
          </Grid>

          <TableContainer>
            <Table>
              <TableHead sx={invoiceStyles.tableHead}>
                <TableRow>
                  <TableCell sx={invoiceStyles.tableHeaderCell}>#</TableCell>
                  <TableCell sx={invoiceStyles.tableHeaderCell}>Book Name</TableCell>
                  <TableCell align="center" sx={invoiceStyles.tableHeaderCell}>Rental Price</TableCell>
                  <TableCell align="right" sx={invoiceStyles.tableHeaderCell}>Deposit</TableCell>
                  <TableCell align="right" sx={invoiceStyles.tableHeaderCell}>Fine Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {billItems.map((item, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{item.book_name}</TableCell>
                    <TableCell align="center">${item.rental_price}</TableCell>
                    <TableCell align="right">${item.deposit_amount}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>${item.fine_amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={invoiceStyles.summaryWrapper}>
            <Box sx={invoiceStyles.summaryBox}>
              <Box sx={invoiceStyles.summaryRow}>
                <Typography color="text.secondary">Subtotal:</Typography>
                <Typography fontWeight="600">${totalAmount.toFixed(2)}</Typography>
              </Box>
              <Box sx={invoiceStyles.summaryRow}>
                <Typography color="text.secondary">Tax (0%):</Typography>
                <Typography fontWeight="600">$0.00</Typography>
              </Box>
              <Divider sx={{ my: 1.5 }} />
              <Box sx={invoiceStyles.summaryRow}>
                <Typography variant="subtitle1" fontWeight="700">Total Amount:</Typography>
                <Typography variant="subtitle1" fontWeight="800" color="primary.main">
                  ${totalAmount.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Typography variant="caption" sx={invoiceStyles.footerText} display="block">
            Thank you for your business. This is a system-generated invoice valid without physical signature.
          </Typography>
        </Paper>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3, mb: 5 }}>
        {bill?.status !== "canceled" && (
          <>
            <Button 
              variant="outlined" 
              color="error" 
              size="large"
              startIcon={<Cancel />}
              onClick={handleCancelInvoice}
              sx={{ px: 4, borderRadius: 2, fontWeight: 'bold', textTransform: 'none' }}
            >
              Cancel Invoice
            </Button>
            <Button 
              variant="contained" 
              color="success" 
              size="large"
              disableElevation
              startIcon={<Payment />}
              sx={{ px: 5, borderRadius: 2, fontWeight: 'bold', textTransform: 'none' }}
            >
              Proceed to Payment
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
}