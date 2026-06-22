import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import api from './../api/axios';
import DeleteIcon from "@mui/icons-material/Delete";
import SimpleSnackbar from './../Componants/Snakbar';
import { IconButton, Typography } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1a73e8',
    color: theme.palette.common.white,
    fontSize: '16px',
    fontWeight: '700',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function MyRequest() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);


  const handleGetRequest = async () => {
    try {
      const res = await api.get('/requsts');
      console.log(res)
      setRows(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  const handleDelete = async (id) => {
    try {
      await api.delete(`/book_request/${id}`);
      handleGetRequest(); 
      setOpen(true);    
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetRequest();
  }, []);

  return (
    <>
    <Typography variant='h3'>My Request</Typography>
      <TableContainer component={Paper} sx={{ borderRadius: "12px", boxShadow: "0px 10px 30px rgba(0,0,0,0.1)", mt: 4 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Book Title</StyledTableCell>
              <StyledTableCell align="right">Author Name</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ width: "100%" }}>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
          
                <StyledTableCell component="th" scope="row" style={{ fontWeight: '600' }}>
                  {row.book_title}
                </StyledTableCell>
                <StyledTableCell align="right">{row.author_name}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.created_at ? row.created_at : 'N/A'}
                </StyledTableCell>
             
                <StyledTableCell align="right">
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '700',
                    backgroundColor: row.status === 'read' ? '#e8f5e9' : '#e3f2fd',
                    color: row.status === 'read' ? '#2e7d32' : '#1565c0'
                  }}>
                    {row.status}
                  </span>
                </StyledTableCell>
               
                <StyledTableCell align="right">
                  <IconButton sx={{ color: "error.main" }} aria-label="delete" onClick={() => handleDelete(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <SimpleSnackbar 
        open={open} 
        message={"Deleted Successfully"} 
        color={"error"}  
        handleClose={() => setOpen(false)}  
      />
    </>
  );
}