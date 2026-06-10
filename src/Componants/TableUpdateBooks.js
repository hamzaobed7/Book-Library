
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { ItemPaper } from "./themItem";
import { useContext } from "react";
import { DataContext } from "../Context/ApiContext";
export default function TableBooks(){
     const { books} = useContext(DataContext);
      const recentBooks = books ? books.slice(-4).reverse() : [];
return(<>
 <ItemPaper>
              <Typography variant="h6" sx={{ fontWeight: "700", color: "#333", mb: 2 }}>
                Recent Added Books
              </Typography>

              <TableContainer>
                <Table sx={{ minWidth: "600px" }} aria-label="recent books table">
                  <TableHead sx={{ backgroundColor: "#f5f7fa" }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "600" }}>Book Title</TableCell>
                      <TableCell sx={{ fontWeight: "600" }}>Category</TableCell>
                      <TableCell sx={{ fontWeight: "600" }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentBooks.length > 0 ? (
                      recentBooks.map((book) => (
                        <TableRow key={book.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                          <TableCell component="th" scope="row" sx={{ fontWeight: "500" }}>
                            {book.title || book.name || "Unknown Book"}
                          </TableCell>
                          <TableCell>{book.category?.description || "General"}</TableCell>
                          <TableCell>
                            <Chip label="Active" color="success" size="small" />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "500" }}>The Great Gatsby</TableCell>
                          <TableCell>Classic Novel</TableCell>
                          <TableCell>
                            <Chip label="Active" color="success" size="small" />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "500" }}>Atomic Habits</TableCell>
                          <TableCell>Self-Development</TableCell>
                          <TableCell>
                            <Chip label="Active" color="success" size="small" />
                          </TableCell>
                        </TableRow>
                      </>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </ItemPaper>



</>)

}