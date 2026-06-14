import { useState } from "react";
import { Box, Grid, TextField, Button, Paper, Typography, Divider, CircularProgress, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import api from "../api/axios";
import OutlinedCard from "../Componants/Card";

export default function GuestSearchPage() {
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
      
  
      <Paper elevation={2} sx={{ p: 4, borderRadius: "16px", mb: 4, backgroundColor: "#ffffff", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)" }}>
        <Typography variant="h5" sx={{ fontWeight: "700", color: "#1e293b", mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
          <SearchIcon color="primary" /> Advanced Book Search
        </Typography>
        
        <Grid container spacing={2}>
         
          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth size="small" label="Book Title" name="title" value={filters.title} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth size="small" label="Author Name" name="author" value={filters.author} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth size="small" label="Category" name="category" value={filters.category} onChange={handleChange} />
          </Grid>

          
          <Grid item xs={12} sm={6} md={3}>
            <TextField 
              fullWidth 
              size="small" 
              type="date" 
              name="from_date" 
              value={filters.from_date} 
              onChange={handleChange} 
              label="Published From" 
              InputLabelProps={{ shrink: true }} 
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
              label="Published To" 
              InputLabelProps={{ shrink: true }} 
            />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: "flex-end" }}>
          <Button variant="outlined" color="inherit" startIcon={<RestartAltIcon />} onClick={handleReset} disabled={loading} sx={{ borderRadius: "8px", textTransform: "none" }}>
            Clear Filters
          </Button>
          <Button
            variant="contained"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
            onClick={handleSearch}
            disabled={loading}
            sx={{ borderRadius: "8px", px: 4, textTransform: "none", fontWeight: "600" }}
          >
            {loading ? "Searching..." : "Search"}
          </Button>
        </Stack>
      </Paper>

      
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "600", mb: 2, color: "#334155" }}>
          Search Results {hasSearched && !loading && `(${results.length})`}
        </Typography>

        <Divider sx={{ mb: 4 }} />

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {hasSearched && !loading && results.length === 0 && (
          <Paper sx={{ p: 5, textAlign: "center", borderRadius: "12px", boxShadow: "none", border: "1px solid #e2e8f0" }}>
            <Typography variant="body1" color="textSecondary">
              No books found matching your search criteria. Try adjusting your filters.
            </Typography>
          </Paper>
        )}

        {!hasSearched && !loading && (
          <Paper sx={{ p: 5, textAlign: "center", borderRadius: "12px", border: "2px dashed #cbd5e1", backgroundColor: "transparent", boxShadow: "none" }}>
            <Typography variant="body1" color="textSecondary">
              Fill in any filters above and click Search to discover books.
            </Typography>
          </Paper>
        )}

       
        {!loading && results.length > 0 && (
          <Grid container spacing={3}>
            {results.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book.id} sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ width: "100%", maxWidth: "340px" }}>
                  <OutlinedCard state={false} book={book} />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}