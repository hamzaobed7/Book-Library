import React from "react";
import { Container, Box, Grid, Typography, Button, List, ListItem, ListItemText, ListItemIcon, Paper } from "@mui/material";
import { MenuBook, LocalOffer, HeadsetMic, ArrowForward, Star } from "@mui/icons-material";

const FEATURES_DATA = [
  {
    title: "All Library Books",
    desc: "Explore our massive, handpicked collection of books curated just for you.",
    icon: <MenuBook sx={{ fontSize: 32, color: "primary.main" }} />,
  },
  {
    title: "Personalized Offers",
    desc: "Enjoy special discounts and exclusive privileges on your dashboard.",
    icon: <LocalOffer sx={{ fontSize: 32, color: "primary.main" }} />,
  },
  {
    title: "24/7 Support",
    desc: "Our dedicated support team is always here to guide your reading journey.",
    icon: <HeadsetMic sx={{ fontSize: 32, color: "primary.main" }} />,
  },
];

const POPULAR_BOOKS_DATA = [
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", rating: "4.8" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", rating: "4.9" },
  { title: "1984", author: "George Orwell", rating: "4.7" },
];


const HeroSection = () => (
  <Box
    sx={{
      p: { xs: 4, md: 6 },
      mb: 6,
      borderRadius: 4,
      backgroundColor: "action.hover",
      textAlign: "center",
      border: "1px solid",
      borderColor: "divider",
    }}
  >
    <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "text.primary", mb: 2 }}>
      Welcome Back, Reader! ✨
    </Typography>
    <Typography variant="body1" sx={{ mb: 4, maxWidth: "600px", mx: "auto", color: "text.secondary", lineHeight: 1.6 }}>
      Your personal library gateway is ready. Discover newly arrived masterpieces, track your readings, and explore your exclusive dashboard.
    </Typography>
    <Button
      variant="contained"
      size="large"
      endIcon={<ArrowForward />}
      sx={{
        borderRadius: 2,
        px: 3.5,
        py: 1.2,
        textTransform: "none",
        fontWeight: 600,
        boxShadow: "none",
        "&:hover": { boxShadow: "none" },
      }}
    >
      Start Exploring Now
    </Button>
  </Box>
);

const FeatureCard = ({ title, desc, icon }) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      borderRadius: 3,
      backgroundColor: "background.default",
      border: "1px solid",
      borderColor: "divider",
      transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      },
    }}
  >
    <Box sx={{ mb: 2 }}>{icon}</Box>
    <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary", mb: 1 }}>
      {title}
    </Typography>
    <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
      {desc}
    </Typography>
  </Paper>
);

const TrendingBooksList = ({ books }) => (
  <Box sx={{ p: 1 }}>
    <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary", mb: 2 }}>
      Trending Books
    </Typography>
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {books.map((book, idx) => (
        <ListItem
          key={idx}
          sx={{
            px: 2,
            py: 1.5,
            mb: 1,
            borderRadius: 2,
            backgroundColor: "background.default",
            border: "1px solid",
            borderColor: "divider",
            transition: "background-color 0.2s",
            "&:hover": { backgroundColor: "action.hover" },
          }}
          secondaryAction={
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Star sx={{ color: "warning.main", fontSize: 18 }} />
              <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                {book.rating}
              </Typography>
            </Box>
          }
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "primary.main" }} />
          </ListItemIcon>
          <ListItemText primary={book.title} secondary={`by ${book.author}`} primaryTypographyProps={{ sx: { fontWeight: 600, color: "text.primary" } }} />
        </ListItem>
      ))}
    </List>
  </Box>
);

export default function HomePageCustomer() {
  return (
    <Box sx={{ width: "100%", py: 4, px: 2, bgcolor: "background.paper", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <HeroSection />

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {FEATURES_DATA.map((feature, index) => (
            <Grid item key={index} xs={12} sm={4}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>

        <TrendingBooksList books={POPULAR_BOOKS_DATA} />
      </Container>
    </Box>
  );
}
