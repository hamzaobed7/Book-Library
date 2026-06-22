import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "./../api/axios";
import { Card, CardContent, Typography, Avatar, Grid, Box, Button, CircularProgress, Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function RequsetOfCustomer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const imageBaseUrl = "http://127.0.0.1:8000/storage/customer_images";

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const res = await api.get(`/customers/${id}`);
        setCustomer(res.data.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCustomerData();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress size={50} />
      </Box>
    );
  }

  if (!customer) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="error">
          Customer not found!
        </Typography>
        <Button component={Link} to="allRequest" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
          Back to Table
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5, px: 2 }}>
      <Button component={Link} to="/all-requests" startIcon={<ArrowBackIcon />} sx={{ mb: 3, textTransform: "none", fontWeight: "600" }}>
        Back to All Requests
      </Button>

      <Card
        sx={{
          borderRadius: "16px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.08)",
          overflow: "hidden",
          background: "linear-gradient(to bottom, #1a73e8 12px, #ffffff 12px)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center" }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  backgroundColor: "#e8f0fe",
                  color: "#1a73e8",
                  boxShadow: "0 4px 14px rgba(26, 115, 232, 0.2)",
                }}
                src={`${imageBaseUrl}/${customer.cover}`}
              >
                <PersonIcon sx={{ fontSize: 50 }} />
              </Avatar>
            </Grid>

            <Grid item xs={12} sm={8} sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <Typography variant="h5" sx={{ fontWeight: "700", color: "#202124", mb: 0.5 }}>
                {customer.name || "Unknown Customer"}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2, fontWeight: "500" }}>
                Customer Profile & Request Details
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <EmailIcon sx={{ color: "#5f6368" }} />
              <Box>
                <Typography variant="caption" color="textSecondary" display="block">
                  Email Address
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "500", color: "#3c4043" }}>
                  {customer.user.email || "N/A"}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <PhoneIcon sx={{ color: "#5f6368" }} />
              <Box>
                <Typography variant="caption" color="textSecondary" display="block">
                  Phone Number
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "500", color: "#3c4043" }}>
                  {customer.phone || "N/A"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
