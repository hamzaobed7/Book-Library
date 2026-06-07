import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SelectActionCard from "../Componants/Boards";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import InventoryIcon from "@mui/icons-material/Inventory";
import { DataContext } from "../Context/ApiContext";
import { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

const ItemPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  borderRadius: "16px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
  color: theme.palette.text.secondary,
}));

export default function Dashboard({ Bookc, AuthorC, user }) {
  const { books, bookCount, AuthorCount, CategoryCount, Stock} = useContext(DataContext);
  const recentBooks = books ? books.slice(-4).reverse() : [];
  const stockList = Stock ? (Array.isArray(Stock) ? Stock : Stock.data ?? []) : [];
  const recentStockLogs = stockList.slice(-5).reverse();
  const totalStockItems = stockList.reduce((acc, log) => {
    const qty = parseInt(log.quantity) || 0;
    return log.type === "add" ? acc + qty : acc - qty;
  }, 0);

  return (
    <>
      <section className="data-of-project" style={{ padding: "20px" }}>
        <Box sx={{ flexGrow: 1, marginBottom: "40px" }}>
          <Typography variant="h4" sx={{ fontWeight: "800", color: "#667eea", marginBottom: "30px" }}>
            Admin Dashboard
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <SelectActionCard name={"Total Books"} count={bookCount} icon={<MenuBookIcon sx={{ fontSize: 40 }} />} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SelectActionCard name={"Authors"} count={AuthorCount} icon={<GroupsIcon sx={{ fontSize: 40 }} />} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SelectActionCard name={"Categories"} count={CategoryCount} icon={<TrendingUpIcon sx={{ fontSize: 40 }} />} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SelectActionCard name={"Stock Balance"} count={totalStockItems} icon={<InventoryIcon sx={{ fontSize: 40 }} />} />
            </Grid>
          </Grid>
        </Box>

       <Grid container spacing={3} sx={{ mb: 4 }}>
  <Grid item xs={12}>
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
                const targetBook = books?.find(
                  (b) => String(b.id) === String(log.book_id)
                );

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
                      {targetBook
                        ? targetBook.title
                        : `Book ID: ${log.book_id}`}
                    </TableCell>

                    <TableCell>
                      <Chip
                        size="small"
                        label={
                          log.type === "add"
                            ? "Stock Addition"
                            : "Stock Destruction"
                        }
                        color={
                          log.type === "add"
                            ? "success"
                            : "error"
                        }
                        sx={{
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 800,
                        color:
                          log.type === "add"
                            ? "#10b981"
                            : "#ef4444",
                      }}
                    >
                      {log.type === "add"
                        ? `+${log.quantity}`
                        : `-${log.quantity}`}
                    </TableCell>

                    <TableCell>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color:
                            String(log.remove_from_remaining) === "1"
                              ? "#4f46e5"
                              : "#64748b",
                        }}
                      >
                        {String(log.remove_from_remaining) === "1"
                          ? "Direct Remaining Inventory"
                          : "General Log Records"}
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
  </Grid>
</Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
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
          </Grid>

          <Grid item xs={12} md={5}>
            <ItemPaper className="curve" sx={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
              <Typography variant="h6" sx={{ fontWeight: "700", color: "#333", mb: 1 }}>
                Library Analytics
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                Weekly distribution of resources
              </Typography>

              <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: "150px", mt: "auto", px: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: "35px", height: "120px", background: "linear-gradient(to top, #7b1fa2, #9c27b0)", borderRadius: "6px 6px 0 0" }} />
                  <Typography variant="caption" sx={{ fontWeight: "600" }}>
                    Books
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: "35px", height: "80px", background: "linear-gradient(to top, #1976d2, #2196f3)", borderRadius: "6px 6px 0 0" }} />
                  <Typography variant="caption" sx={{ fontWeight: "600" }}>
                    Authors
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: "35px", height: "50px", background: "linear-gradient(to top, #388e3c, #4caf50)", borderRadius: "6px 6px 0 0" }} />
                  <Typography variant="caption" sx={{ fontWeight: "600" }}>
                    Cats
                  </Typography>
                </Box>
              </Box>
            </ItemPaper>
          </Grid>
        </Grid>
      </section>
    </>
  );
}