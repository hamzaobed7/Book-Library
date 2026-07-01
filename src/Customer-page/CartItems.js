import React from "react";
import { Box, Typography, IconButton, Card, CardMedia, Tooltip, Stack, Chip, CircularProgress } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export const CartItemRow = ({ item, onRemove, isUpdating }) => {
  const imageBaseUrl = "http://127.0.0.1:8000/storage/book_image";
  const book = item.book || {};

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        width: "100%",
        minHeight: { xs: "auto", sm: 180 },
        borderRadius: "24px",
        border: "1px solid",
        borderColor: "grey.100",
        boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.02)",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        overflow: "hidden",
        "&:hover": {
          boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.06)",
          transform: "translateY(-3px)",
          "& .book-cover": {
            transform: "scale(1.04)",
          },
        },
      }}
    >
      <Box sx={{ width: { xs: "100%", sm: 140 }, height: { xs: 220, sm: "auto" }, overflow: "hidden", position: "relative" }}>
        <CardMedia
          component="img"
          className="book-cover"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
          image={`${imageBaseUrl}/${book.cover}`}
          title={book.title}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary", lineHeight: 1.3, fontSize: "1.1rem", letterSpacing: "-0.3px" }}>
            {book.title}
          </Typography>

          <Tooltip title="Remove book" arrow placement="top">
            <IconButton
              color="error"
              disabled={isUpdating}
              onClick={() => onRemove(item.id)}
              sx={{
                color: "error.main",
                bgcolor: "#ffebee",
                borderRadius: "12px",
                p: 1.2,
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "error.main",
                  color: "#fff",
                  transform: "scale(1.05)",
                },
              }}
            >
              {isUpdating ? <CircularProgress size={20} color="inherit" /> : <DeleteIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Box>

        <Stack direction="row" spacing={2} sx={{ mt: 1.5, mb: 2.5 }} flexWrap="wrap" useFlexGap>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
            <MenuBookIcon sx={{ fontSize: 16, color: "text.disabled" }} />
            <Typography variant="caption" sx={{ fontWeight: 600, color: "text.secondary", fontSize: "0.8rem" }}>
              ISBN: {book.ISBN || "N/A"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
            <CalendarMonthIcon sx={{ fontSize: 16, color: "primary.main" }} />
            <Typography variant="caption" sx={{ fontWeight: 700, color: "primary.main", fontSize: "0.8rem" }}>
              {book.default_borrow_days} Borrow Days
            </Typography>
          </Box>
        </Stack>

        <Box
          sx={{
            mt: "auto",
            pt: 2,
            borderTop: "1px dashed",
            borderColor: "grey.200",
            display: "flex",
            justify: "space-between",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Chip
            icon={<AccountBalanceWalletIcon style={{ fontSize: 14, color: "#666" }} />}
            label={
              <>
                Deposit: <b>${Number(book.deposit || 0).toFixed(2)}</b>
              </>
            }
            variant="outlined"
            size="small"
            sx={{
              borderRadius: "8px",
              borderColor: "grey.200",
              bgcolor: "#fafafa",
              px: 0.5,
              fontSize: "0.78rem",
              color: "text.secondary",
            }}
          />

          <Stack direction="row" spacing={0.3}>
            <Typography variant="caption" sx={{ fontWeight: 600, color: "text.secondary" }}>
              Rent:
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 900, color: "success.main", fontSize: "1.3rem" }}>
              ${Number(book.rental_price || 0).toFixed(2)}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Card>
  );
};
