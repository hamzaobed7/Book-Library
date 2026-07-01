import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ItemPaper } from "./themItem";
import { DataContext } from "../Context/ApiContext";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useContext, useEffect } from "react";
import { BookContext } from "../Context/BookContext";

export default function TableStock() {
  const { books, Stock,fetchStocks } = useContext(BookContext);
  const stockList = Stock ? (Array.isArray(Stock) ? Stock : (Stock.data ?? [])) : [];
  const recentStockLogs = stockList.slice(-5).reverse();
  useEffect(()=>{fetchStocks()},[fetchStocks])
  return (
    <>
      <ItemPaper
        sx={{
          width: "100%",
          p: { xs: 2, md: 3 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "#1e293b",
              }}
            >
              Recent Stock Movements Log
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#64748b",
                mt: 0.5,
              }}
            >
              Real-time history of inventory additions and destructions
            </Typography>
          </Box>

          <Chip
            label={`Total Logs: ${stockList.length}`}
            color="primary"
            sx={{
              fontWeight: 700,
              borderRadius: 2,
            }}
          />
        </Box>

        <TableContainer
          sx={{
            maxHeight: 500,
            overflowX: "auto",
            borderRadius: 2,
            border: "1px solid #e2e8f0",
          }}
        >
          <Table
            stickyHeader
            aria-label="stock logs table"
            sx={{
              minWidth: {
                xs: 700,
                sm: 900,
                md: 1200,
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    backgroundColor: "#f8fafc",
                  }}
                >
                  Book
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: 700,
                    backgroundColor: "#f8fafc",
                  }}
                >
                  Transaction Type
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 700,
                    backgroundColor: "#f8fafc",
                  }}
                >
                  Quantity
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: 700,
                    backgroundColor: "#f8fafc",
                  }}
                >
                  Inventory Target
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {recentStockLogs.length > 0 ? (
                recentStockLogs.map((log, index) => {
                  const targetBook = books?.find((b) => String(b.id) === String(log.book_id));

                  return (
                    <TableRow
                      key={log.id || index}
                      hover
                      sx={{
                        transition: "0.2s",
                      }}
                    >
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          color: "#1e293b",
                        }}
                      >
                        {targetBook ? targetBook.title : `Book ID: ${log.book_id}`}
                      </TableCell>

                      <TableCell>
                        <Chip
                          size="small"
                          label={log.type === "add" ? "Stock Addition" : "Stock Destruction"}
                          color={log.type === "add" ? "success" : "error"}
                          sx={{
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>

                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: 800,
                          color: log.type === "add" ? "#10b981" : "#ef4444",
                        }}
                      >
                        {log.type === "add" ? `+${log.quantity}` : `-${log.quantity}`}
                      </TableCell>

                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            color: String(log.remove_from_remaining) === "1" ? "#4f46e5" : "#64748b",
                          }}
                        >
                          {String(log.remove_from_remaining) === "1" ? "Direct Remaining Inventory" : "General Log Records"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    align="center"
                    sx={{
                      py: 5,
                      color: "#94a3b8",
                    }}
                  >
                    No stock mutation data records available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </ItemPaper>
    </>
  );
}
