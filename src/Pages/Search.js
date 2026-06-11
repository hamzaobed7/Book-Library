import { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Paper,
  Typography,
  Divider,
  CircularProgress,
  Stack,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import api from "../api/axios";

export default function SearchPage() {
  const initialFilters = {
    title: "",
    author: "",
    category: "",
    from_date: "",
    to_date: "",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async () => {
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await api.get("/book-search", {
        params: filters,
      });
      setResults(res.data?.data || res.data || []);
    } catch (error) {
      console.error("Search Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFilters(initialFilters);
    setResults([]);
    setHasSearched(false);
  };

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", p: { xs: 2, md: 4 } }}>
      
      {/* لوحة الفلاتر */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: "12px", mb: 4, backgroundColor: "#fafafa" }}>
        <Typography variant="h5" sx={{ fontWeight: "700", color: "#2d3748", mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
          <SearchIcon color="primary" /> Advanced Book Search
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Book Title"
              name="title"
              value={filters.title}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Author Name"
              name="author"
              value={filters.author}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Category"
              name="category"
              value={filters.category}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              type="date"
              name="from_date"
              value={filters.from_date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              label="Published From"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              type="date"
              name="to_date"
              value={filters.to_date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              label="Published To"
            />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<RestartAltIcon />}
            onClick={handleReset}
            disabled={loading}
            sx={{ borderRadius: "6px", textTransform: "none" }}
          >
            Clear Filters
          </Button>
          <Button
            variant="contained"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
            onClick={handleSearch}
            disabled={loading}
            sx={{ borderRadius: "6px", px: 4, textTransform: "none", fontWeight: "600" }}
          >
            {loading ? "Searching..." : "Search"}
          </Button>
        </Stack>
      </Paper>

     
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "600", mb: 2, color: "#4a5568" }}>
          Search Results {hasSearched && !loading && `(${results.length})`}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {hasSearched && !loading && results.length === 0 && (
          <Paper sx={{ p: 5, textAlign: "center", borderRadius: "12px" }}>
            <Typography variant="body1" color="textSecondary">
              No books found matching your search criteria. Try adjusting your filters.
            </Typography>
          </Paper>
        )}

      
        {!hasSearched && !loading && (
          <Paper sx={{ p: 4, textAlign: "center", borderRadius: "12px", border: "1px dashed #cbd5e0", backgroundColor: "transparent" }}>
            <Typography variant="body1" color="textSecondary">
              Fill in any filters above and click Search to discover books.
            </Typography>
          </Paper>
        )}

    
        {!loading && results.length > 0 && (
          <TableContainer component={Paper} elevation={2} sx={{ borderRadius: "10px", overflow: "hidden" }}>
            <Table sx={{ minWidth: 650 }} aria-label="books table">
              <TableHead sx={{ backgroundColor: "#f1f5f9" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "#334155" }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#334155" }}>Book Title</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#334155" }}>Author</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#334155" }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#334155" }}>Published Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((book) => {
                  
                  let authorName = "Unknown";
                  if (Array.isArray(book.author)) {
                    authorName = book.author.map((e) => e.first_name).join(", ");
                  } else if (book.author?.first_name) {
                    authorName = `${book.author.first_name} ${book.author.last_name || ""}`;
                  }

                  return (
                    <TableRow 
                      key={book.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: "#f8fafc" } }}
                    >
                      <TableCell component="th" scope="row" sx={{ color: "#64748b" }}>
                        {book.id}
                      </TableCell>
                      <TableCell sx={{ fontWeight: "600", color: "#0f172a" }}>
                        {book.title}
                      </TableCell>
                      <TableCell sx={{ color: "#334155" }}>
                        {authorName}
                      </TableCell>
                      <TableCell>
                        {book.category ? (
                          <Chip 
                            label={book.category.name || book.category} 
                            size="small" 
                            variant="outlined" 
                            color="primary"
                            sx={{ borderRadius: "6px" }}
                          />
                        ) : (
                          <Typography variant="caption" color="textSecondary">-</Typography>
                        )}
                      </TableCell>
                      <TableCell sx={{ color: "#64748b" }}>
                        {book.created_at ? new Date(book.created_at).toLocaleDateString() : "-"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}