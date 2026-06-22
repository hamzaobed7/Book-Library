import { ArrowForward, CheckCircleOutlineOutlined, LocalShippingOutlined } from "@mui/icons-material";
import { Box, Button, Divider, Paper, Stack, Typography, LinearProgress, CircularProgress } from "@mui/material";

export const OrderSummary = ({ subtotal, totalItems, onCheckout, isCheckingOut }) => {
  const numericSubtotal = Number(subtotal) || 0; 
  
  const shippingThreshold = 50;
  const shippingCost = 4.99;
  
  const isFreeShipping = numericSubtotal >= shippingThreshold;
  const shipping = isFreeShipping ? 0 : shippingCost;
  const total = numericSubtotal + shipping;
  
  const progressToFreeShipping = Math.min((numericSubtotal / shippingThreshold) * 100, 100);
  const amountLeftForFreeShipping = (shippingThreshold - numericSubtotal).toFixed(2);

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 4, sm: 5 }, // زيادة المساحة الداخلية (Padding) لتبدو فخمة وواسعة
        borderRadius: "32px", // زوايا دائرية أكبر وأكثر نعومة وتماشياً مع تصاميم العصر الحالي
        border: "1px solid",
        borderColor: "grey.100",
        bgcolor: "background.paper",
        // نظام ظلال خفيف، طبقي، ومعقد يعطي إيحاءً بالعمق الحقيقي ثنائي الأبعاد
        boxShadow: "0px 24px 48px rgba(0, 0, 0, 0.04), 0px 4px 12px rgba(0, 0, 0, 0.01)",
        position: "sticky",
        top: 32,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "&:hover": {
          boxShadow: "0px 36px 72px rgba(0, 0, 0, 0.08)",
          transform: "translateY(-2px)",
        }
      }}
    >
      {/* عنوان الكارد الرئيسي الجريء */}
      <Typography 
        variant="h5" 
        sx={{ fontWeight: 900, mb: 4, color: "text.primary", letterSpacing: "-0.8px", fontSize: "1.4rem" }}
      >
        Order Summary
      </Typography>

      {/* تفاصيل الحسابات - خطوط أكبر وأوضح */}
      <Stack spacing={3} sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500, fontSize: "1rem" }}>
            Items count
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 700, color: "text.primary", fontSize: "1.05rem" }}>
            {totalItems} {totalItems === 1 ? "book" : "books"}
          </Typography>
        </Box>
        
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500, fontSize: "1rem" }}>
            Subtotal
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 700, color: "text.primary", fontSize: "1.05rem" }}>
            ${numericSubtotal.toFixed(2)}
          </Typography>
        </Box>
        
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500, fontSize: "1rem" }}>
            Shipping
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 800, 
              fontSize: "0.85rem",
              letterSpacing: "0.8px",
              textTransform: "uppercase",
              color: isFreeShipping ? "success.main" : "text.primary",
              bgcolor: isFreeShipping ? "#e8f5e9" : "#f1f3f5", 
              px: 2,
              py: 0.8,
              borderRadius: "10px"
            }}
          >
            {isFreeShipping ? "Free" : `$${shipping.toFixed(2)}`}
          </Typography>
        </Box>
      </Stack>

      {/* صندوق الشحن المجاني التفاعلي المميز */}
      <Box 
        sx={{ 
          mb: 4.5, 
          p: 3, 
          bgcolor: isFreeShipping ? "#f3fbf6" : "#fafdff", 
          borderRadius: "20px", 
          border: "1px solid", 
          borderColor: isFreeShipping ? "#b2ebd2" : "#e1f0fa",
          boxShadow: isFreeShipping ? "none" : "0px 4px 12px rgba(25, 118, 210, 0.02)",
          transition: "all 0.4s ease"
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
          {isFreeShipping ? (
            <CheckCircleOutlineOutlined sx={{ color: "success.main", fontSize: "1.4rem" }} />
          ) : (
            <LocalShippingOutlined sx={{ color: "primary.main", fontSize: "1.4rem" }} />
          )}
          <Typography variant="body2" sx={{ fontWeight: 700, color: isFreeShipping ? "success.dark" : "text.primary", fontSize: "0.9rem" }}>
            {isFreeShipping ? (
              "Excellent! You've unlocked FREE SHIPPING!"
            ) : (
              <>Add <span style={{ color: "#1976d2", fontWeight: 800 }}>${amountLeftForFreeShipping}</span> more for FREE SHIPPING!</>
            )}
          </Typography>
        </Stack>
        <LinearProgress 
          variant="determinate" 
          value={progressToFreeShipping} 
          color={isFreeShipping ? "success" : "primary"}
          sx={{ 
            height: 10, // شريط تقدم أسمك وأسهل للرؤية
            borderRadius: 5, 
            bgcolor: isFreeShipping ? "#e1f5e8" : "#eef2f6",
            "& .MuiLinearProgress-bar": {
              borderRadius: 5,
              transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)" 
            }
          }}
        />
      </Box>

      <Divider sx={{ my: 4, borderStyle: "dashed", borderColor: "grey.300" }} /> 

      {/* المجموع الكلي النهائي - ضخم وملفت للإنتباه */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4.5 }}>
        <Typography variant="body1" sx={{ fontWeight: 800, color: "text.secondary", fontSize: "1.1rem" }}>
          Total Amount
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 950, color: "text.primary", letterSpacing: "-1.8px", fontSize: "2.5rem" }}>
          ${total.toFixed(2)}
        </Typography>
      </Box>

      {/* زر الـ Checkout الفاخر بتصميم جذاب وحجم عريض يبعث على الراحة أثناء الإتمام */}
      <Button 
        variant="contained" 
        size="large" 
        fullWidth 
        disabled={isCheckingOut}
        onClick={onCheckout}
        endIcon={isCheckingOut ? <CircularProgress size={22} color="inherit" /> : <ArrowForward className="arrow-icon" />} 
        sx={{ 
          borderRadius: "18px", 
          py: 2.4, // حجم أضخم للضغط المباشر والمريح
          textTransform: "none", 
          fontWeight: 800, 
          fontSize: "1.1rem",
          letterSpacing: "0.5px",
          bgcolor: "primary.main",
          boxShadow: "0px 12px 28px rgba(25, 118, 210, 0.25)", 
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          overflow: "hidden",
          "&:hover": {
            bgcolor: "primary.dark",
            boxShadow: "0px 16px 36px rgba(25, 118, 210, 0.45)",
            transform: "translateY(-4px)", 
            "& .arrow-icon": {
              transform: "translateX(8px)", 
            }
          },
          "&:active": {
            transform: "translateY(-1px)",
          }
        }}
      >
        {isCheckingOut ? "Securing Order..." : "Proceed to Checkout"}
      </Button>
    </Paper>
  );
};