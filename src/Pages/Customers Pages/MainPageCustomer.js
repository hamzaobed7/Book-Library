import { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper, Button, Container, Divider } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import OutlinedCard from "../../Componants/Card";
import api from "../../api/axios";
import { Link } from 'react-router-dom';
import { Skeleton } from "@mui/material";
export default function MainPageCustomer() {
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const tr=await api.get("/treandBook")
        setTrendingBooks(tr);
        const res = await api.get("/book-search"); 
        setTrendingBooks(res.data?.data || res.data || []);
      } catch (error) {
        console.error("Error loading customer home:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);



if (loading) {
  return (
    <Grid container spacing={3}>
      {[1, 2, 3].map((n) => (
        <Grid item xs={12} sm={6} md={4} key={n}>
          <Skeleton variant="rectangular" height={260} sx={{ borderRadius: "12px" }} />
          <Skeleton variant="text" sx={{ mt: 1, fontSize: "1.5rem" }} />
          <Skeleton variant="text" width="60%" />
        </Grid>
      ))}
    </Grid>
  );
}


  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
     
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          borderRadius: "16px", 
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", 
          color: "#ffffff",
          mb: 4
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "700", mb: 1 }}>
          Welcome back! ✨
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.8, mb: 3 }}>
          Discover thousands of books, tracks your reading history, and find your next favorite author.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<LocalLibraryIcon />}
          sx={{ borderRadius: "8px", textTransform: "none", backgroundColor: "#3b82f6" }}
        >
         <Link style={{textDecoration:"none", color:"white",fontWeight:'600' }} to="/GetBooksGust" > Explore All Books</Link>
        </Button>
      </Paper>

  
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" sx={{ fontWeight: "700", color: "#1e293b", mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <MenuBookIcon color="primary" /> Trending Books
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          The most read and discussed books this week.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        
        <Grid container spacing={3}>
          {trendingBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <Box sx={{maxWidth:'340px',width:'100%'}} >
                <OutlinedCard state={false} book={book} />
              </Box>
            </Grid>
          ))}
          
          {!loading && trendingBooks.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ py: 4 }}>
                No books available at the moment. Check back later!
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}