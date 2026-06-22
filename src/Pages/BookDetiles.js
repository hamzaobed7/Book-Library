import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useState, useEffect } from "react";

import {
  Box,
  Card,
  Typography,
  Button,
  Grid,
  Avatar,
  Stack,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrintIcon from "@mui/icons-material/Print";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StorageIcon from "@mui/icons-material/Storage";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

export default function BookDetiles() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const getBookdetails = async () => {
    try {
      setLoading(true);
      const [bookRes] = await Promise.all([
        api.get(`books/${id}`),
      ]);

      setData(bookRes.data?.data ?? bookRes.data);
      setCategory(bookRes.data?.data?.category ?? bookRes.data?.category ?? null);
    } catch (error) {
      console.log("Error fetching book components:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) getBookdetails();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress size={50} thickness={4} sx={{ color: "#6366f1" }} />
      </Box>
    );
  }

  if (!data) {
    return (
      <Box sx={{ textAlign: "center", mt: 16, p: 3, fontFamily: "'Inter', 'Roboto', sans-serif" }}>
        <Typography variant="h5" color="error" fontWeight="700" mb={1}>
          Book Record Not Found
        </Typography>
        <Typography color="text.secondary" mb={3}>
          Sorry, we couldn't find any book matching the provided identifier.
        </Typography>
        <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ bgcolor: "#6366f1", textTransform: "none", fontFamily: "inherit" }}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        p: { xs: 2, md: 4 }, 
        background: "#f8fafc", 
        minHeight: "100vh",
        fontFamily: "'Inter', 'Roboto', 'Segoe UI', sans-serif",
        "@media print": {
          p: 0,
          background: "#fff",
          "nav, .sidebar, aside, header, .no-print": { display: "none !important" },
          "body, html, #root, main": { background: "#fff !important", p: 0, m: 0, width: "100%" }
        }
      }}
    >
      <Card 
        className="no-print"
        sx={{ 
          mb: 4, 
          borderRadius: "16px", 
          boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
          border: "1px solid #e2e8f0"
        }}
      >
        <Box sx={{ p: 3, display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, gap: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight="700" sx={{ color: "#0f172a", letterSpacing: "-0.5px", fontFamily: "inherit" }}>
              {data.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: "14px", fontFamily: "inherit" }}>
              Comprehensive overview of book specifications, categories, and contributing authors
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5} sx={{ width: { xs: "100%", sm: "auto" } }}>
            <Button
              startIcon={<ArrowBackIcon />}
              variant="outlined"
              onClick={() => navigate(-1)}
              sx={{ borderRadius: "10px", borderColor: "#cbd5e1", color: "#64748b", textTransform: "none", fontWeight: "600", fontFamily: "inherit", "&:hover": { borderColor: "#94a3b8", bgcolor: "#f8fafc" } }}
            >
              Back
            </Button>

            <Button
              startIcon={<PrintIcon />}
              variant="contained"
              onClick={() => window.print()}
              sx={{ borderRadius: "10px", bgcolor: "#6366f1", textTransform: "none", fontWeight: "600", fontFamily: "inherit", boxShadow: "0 4px 12px rgba(99,102,241,0.2)", "&:hover": { bgcolor: "#4f46e5" } }}
            >
              Print PDF
            </Button>
          </Stack>
        </Box>
      </Card>

      <Grid container spacing={3} sx={{ "@media print": { display: "block" } }}>
        <Grid item xs={12} md={7} lg={8} sx={{ "@media print": { width: "100%", mb: 4 } }}>
          <Card sx={{ borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
            <Box sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight="700" color="#0f172a" mb={3} sx={{ fontFamily: "inherit" }}>
                Book Specifications & Core Data
              </Typography>

              <List disablePadding>
                <ListItem sx={{ px: 0, py: 2 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}><MenuBookIcon sx={{ color: "#6366f1" }} /></ListItemIcon>
                  <ListItemText 
                    primary={<Typography variant="body2" color="text.secondary" fontWeight="500" sx={{ fontFamily: "inherit" }}>International Standard Book Number (ISBN)</Typography>}
                    secondary={<Typography variant="body1" component="span" fontWeight="600" color="#1e293b" sx={{ mt: 0.5, display: "block", fontFamily: "inherit" }}>{data.ISBN}</Typography>}
                  />
                </ListItem>
                <Divider component="li" />

                {/* 1. تم تعديل المكون هنا ليتحول إلى div بدلاً من إحداث تداخل li معقد */}
                <Box sx={{ listStyleType: "none", py: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", alignItems: "center", py: 2 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}><FolderOpenIcon sx={{ color: "#3b82f6" }} /></ListItemIcon>
                        <ListItemText 
                          primary={<Typography variant="body2" color="text.secondary" fontWeight="500" sx={{ fontFamily: "inherit" }}>Category</Typography>}
                          secondary={
                            <Typography variant="body1" component="span" fontWeight="700" color="#3b82f6" sx={{ mt: 0.5, display: "block", fontFamily: "inherit" }}>
                              {category ? category.name : `Category #${data.category_id}`}
                            </Typography>
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", alignItems: "center", py: 2 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}><LocalOfferIcon sx={{ color: "#10b981" }} /></ListItemIcon>
                        <ListItemText 
                          primary={<Typography variant="body2" color="text.secondary" fontWeight="500" sx={{ fontFamily: "inherit" }}>Retail Price</Typography>}
                          secondary={<Typography variant="h6" component="span" fontWeight="700" color="#10b981" sx={{ mt: 0.5, display: "block", fontFamily: "inherit" }}>${data.rental_price}</Typography>}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Divider component="li" />

                <ListItem sx={{ px: 0, py: 2 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}><StorageIcon sx={{ color: "#f59e0b" }} /></ListItemIcon>
                  <ListItemText 
                    // 2. تم إضافة السطر التالي لمنع تداخل div بداخل p في التنسيق الداخلي
                    secondaryTypographyProps={{ component: "div" }}
                    primary={<Typography variant="body2" color="text.secondary" fontWeight="500" sx={{ fontFamily: "inherit" }}>Stock Availability Status</Typography>}
                    secondary={
                      <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 0.5 }}>
                        <Typography variant="body1" component="span" fontWeight="600" color="#1e293b" sx={{ fontFamily: "inherit" }}>
                          {data.total_copies} Total Copies 
                        </Typography>
                        <Typography variant="body1" component="span" fontWeight="600" color="#475569" sx={{ fontFamily: "inherit" }}>
                          {data.stock} Stock Copies 
                        </Typography>
                      </Stack>
                    }
                  />
                </ListItem>
                <Divider component="li" />

                <ListItem sx={{ px: 0, py: 2 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}><CalendarMonthIcon sx={{ color: "#ec4899" }} /></ListItemIcon>
                  <ListItemText 
                    primary={<Typography variant="body2" color="text.secondary" fontWeight="500" sx={{ fontFamily: "inherit" }}>Publication Date</Typography>}
                    secondary={<Typography variant="body1" component="span" fontWeight="600" color="#1e293b" sx={{ mt: 0.5, display: "block", fontFamily: "inherit" }}>{data.published_at}</Typography>}
                  />
                </ListItem>
              </List>

              <Stack direction="row" spacing={3} sx={{ mt: 4, pt: 2, borderTop: "1px dashed #e2e8f0" }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "inherit" }}>
                  Pages: {data.pages}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "inherit" }}>
                  Default Borrow Days: {data.default_borrow_days}
                </Typography>
              </Stack>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={5} lg={4} sx={{ "@media print": { width: "100%" } }}>
          <Card sx={{ borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.02)", height: "100%" }}>
            <Box sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight="700" color="#0f172a" mb={3} sx={{ fontFamily: "inherit" }}>
                Author Details ({data.authors?.length || 0})
              </Typography>

              <Stack spacing={3}>
                {data.authors?.length ? (
                  data.authors.map((author) => (
                    <Box 
                      key={author.id} 
                      sx={{ 
                        p: 2.5, 
                        borderRadius: "12px", 
                        backgroundColor: "#f8fafc", 
                        border: "1px solid #f1f5f9",
                        transition: "all 0.2s",
                        "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.01)" }
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center" mb={1.5}>
                        <Avatar sx={{ bgcolor: "#6366f1", width: 42, height: 42, fontWeight: "700", fontSize: "15px", fontFamily: "inherit" }}>
                          {author.first_name ? author.first_name[0].toUpperCase() : "A"}
                        </Avatar>
                        <Box>
                          <Typography fontWeight="700" color="#0f172a" variant="body1" sx={{ fontFamily: "inherit" }}>
                            {author.first_name} {author.last_name || ""}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "text.secondary", mt: 0.2 }}>
                            <AlternateEmailIcon sx={{ fontSize: "13px" }} />
                            <Typography variant="caption" sx={{ fontFamily: "inherit" }}>{author.email}</Typography>
                          </Stack>
                        </Box>
                      </Stack>
                      
                      {author.bio && (
                        <>
                          <Divider sx={{ my: 1, borderStyle: "dashed" }} />
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "13px", lineHeight: "1.5", fontStyle: "italic", fontFamily: "inherit" }}>
                            "{author.bio}"
                          </Typography>
                        </>
                      )}
                    </Box>
                  ))
                ) : (
                  <Typography color="text.secondary" variant="body2" sx={{ fontStyle: "italic", textAlign: "center", py: 4, fontFamily: "inherit" }}>
                    No authors assigned to this book.
                  </Typography>
                )}
              </Stack>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}