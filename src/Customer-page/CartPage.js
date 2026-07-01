import { useState, useEffect, useMemo, useContext } from "react";
import { Container, Box, Grid, Typography, Paper, CircularProgress, Stack } from "@mui/material";
import api from "../api/axios";
import { CartItemRow } from "./CartItems";
import { OrderSummary } from "./Summary";
import { EmptyCart } from "./Empty";
import { DataContext } from "../Context/ApiContext";
import SimpleSnackbar from "./../Componants/Snakbar";
import { useNavigate } from "react-router-dom";
export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const [color, SetColor] = useState("");
  const [open, SetOpen] = useState(false);
  const [mes, SetMes] = useState("");

  const uesnavigate = useNavigate();

  const { FetechCountOfCart } = useContext(DataContext);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await api.get("/cart");
      const items = response.data.data || [];
      setCartItems(items);
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const { subtotal, totalItems } = useMemo(() => {
    const totalItems = cartItems.length;
    const subtotal = cartItems.reduce((acc, item) => {
      const rentalPrice = Number(item.book?.rental_price) || 0;
      const deposit = Number(item.book?.deposit) || 0;
      return acc + rentalPrice + deposit;
    }, 0);

    return { subtotal, totalItems };
  }, [cartItems]);

  const handleRemoveItem = async (id) => {
    try {
      setActionLoading(true);
      const res = await api.delete(`/cart/${id}`);
      const updatedCart = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCart);
      if (FetechCountOfCart) {
        FetechCountOfCart();
      }
      SetColor("error");
      SetMes(res.data.message);
      SetOpen(true);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Failed to remove item:", error);
      SetColor("error");
      SetMes(error.response.data.message);
      SetOpen(true);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true);
      const res = await api.post("/bill");
      setCartItems([]);
      localStorage.removeItem("cart");
      if (FetechCountOfCart) {
        FetechCountOfCart();
      }
      SetColor("success");
      SetMes(res.data.message);
      SetOpen(true);
      uesnavigate(`/customerInv/${res.data.data.id}`);
      console.log(res);
    } catch (error) {
      SetColor("error");
      SetMes(error.response.data.message);
      SetOpen(true);
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
        <CircularProgress size={45} thickness={4} sx={{ color: "primary.main" }} />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: { xs: 4, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1" sx={{ fontWeight: 900, color: "text.primary", mb: 5, letterSpacing: "-0.5px" }}>
            Shopping Cart
          </Typography>

          {cartItems.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 5,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "grey.200",
                bgcolor: "background.paper",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.01)",
              }}
            >
              <EmptyCart />
            </Paper>
          ) : (
            <Grid container spacing={4} alignItems="flex-start">
              <Grid xs={12} md={7.5}>
                <Stack spacing={2.5}>
                  {cartItems.map((item) => (
                    <CartItemRow key={item.id} item={item} onRemove={handleRemoveItem} isUpdating={actionLoading} />
                  ))}
                </Stack>
              </Grid>

              <Grid xs={12} md={4.5} sx={{ position: { md: "sticky" }, top: 24 }}>
                <OrderSummary subtotal={subtotal} totalItems={totalItems} onCheckout={handleCheckout} isCheckingOut={checkoutLoading} cartItems={cartItems} />
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
      <SimpleSnackbar
        color={color}
        open={open}
        message={mes}
        handleClose={() => {
          SetOpen(false);
        }}
      />
    </>
  );
}
