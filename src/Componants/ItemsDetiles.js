import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Typography, Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ItemsDetails({ openViewModal, handleCloseModal, billId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (billId && openViewModal) {
      handleItems();
    }
  }, [billId, openViewModal]);

  const handleItems = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/ShowItems/${billId}`);
      setItems(res.data.data || []);
    } catch (error) {
      console.log("Failed to fetch items:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={openViewModal}
      onClose={handleCloseModal}
      maxWidth="sm"
      fullWidth
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(0, 0, 0, 0.4)" },
        },
      }}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#ffffff !important",
          border: "1px solid #e0e0e0 !important",
          borderRadius: "16px",
          padding: "10px",
          color: "#333333",
          boxShadow: "0px 10px 40px rgba(0,0,0,0.12)",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "800", fontSize: "1.3rem", color: "#1a73e8", textAlign: "right" }}>تفاصيل عناصر الفاتورة #{billId}</DialogTitle>
      <Divider sx={{ borderColor: "#e0e0e0", my: 1 }} />
      <DialogContent>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
            <CircularProgress sx={{ color: "#1a73e8" }} />
          </Box>
        ) : items.length === 0 ? (
          <Typography textAlign="center" color="text.secondary">
            لا توجد عناصر لعرضها
          </Typography>
        ) : (
          <Grid container spacing={2} dir="rtl">
            {items.map((item, index) => (
              <Grid item xs={12} key={item.id} sx={{ mb: index !== items.length - 1 ? 1 : 0 }}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "#f8f9fa",
                    borderRadius: 3,
                    border: "1px solid #f1f3f4",
                    transition: "0.2s",
                    "&:hover": { borderColor: "#1a73e8", bgcolor: "#f1f7fe" },
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="700" color="#202124">
                    الكتاب: {item.book?.title || item.book_name || `معرف الكتاب ${item.book_id}`}
                  </Typography>
                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        سعر الإيجار: <span style={{ color: "#1a73e8", fontWeight: "700" }}>${item.rental_price}</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        مبلغ التأمين: <span style={{ color: "#202124", fontWeight: "600" }}>${item.deposit_amount}</span>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>

      <Divider sx={{ borderColor: "#e0e0e0", mt: 2 }} />
      <DialogActions sx={{ p: 2, justifyContent: "flex-start" }}>
        <Button
          onClick={handleCloseModal}
          variant="contained"
          disableElevation
          sx={{
            backgroundColor: "#1a73e8",
            color: "#ffffff",
            fontWeight: "700",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#1557b0" },
            width: "100px",
          }}
        >
          إغلاق
        </Button>
      </DialogActions>
    </Dialog>
  );
}
