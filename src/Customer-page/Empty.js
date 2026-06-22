import { ShoppingBagOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

export const EmptyCart = () => (
  <Box sx={{ textAlign: "center", py: 8, px: 2 }}>
    <ShoppingBagOutlined sx={{ fontSize: 70, color: "text.disabled", mb: 2 }} />
    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Your cart is empty</Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: "auto" }}>
      Looks like you haven't added any books to your cart yet. Explore our library to find your next masterpiece.
    </Typography>
    <Button variant="outlined" sx={{ borderRadius: 2, textTransform: "none" }}>Go Back To Library</Button>
  </Box>
);