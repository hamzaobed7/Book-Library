import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Action from "../photos/Action.png";
import Romance from "../photos/romace.png";
import techno from "../photos/Techno.png";
import islamic from "../photos/Muslim.png";

export default function SectionTwo() {
  const categories = [
    { name: "Action", count: "+30", img: Action },
    { name: "Romance", count: "+300", img: Romance },
    { name: "Technology", count: "+400", img: techno },
    { name: "Islamic", count: "+200", img: islamic },
  ];

  return (
    <Box sx={{ width: "100%", padding: { xs: "20px 10px", md: "40px 30px" }, backgroundColor: "#ffffff" }}>
      <Typography
        variant="h3"
        sx={{
          marginTop: "20px",
          marginBottom: "40px",
          color: "#0f172a",
          fontWeight: "700",
          textAlign: "center",
         
          fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
          fontFamily: "'Cairo', sans-serif",
        }}
      >
        We Have Many Categories
      </Typography>

      <Grid container spacing={30} justifyContent="center" sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        {categories.map((cat, index) => (
          <Grid key={index} size={{ xs: 12, sm: 12, md: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px",
                width: "300px",
                marginRight: "130px",
                textAlign: "center",
                borderRadius: "16px",
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                },
              }}
            >
              <Box
                sx={{
                  width: "300px",
                  maxWidth: "200px",
                  aspectRatio: "1/1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  style={{
                    width: "300px",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontFamily: "'Cairo', sans-serif",
                  color: "#2c3e50",
                }}
              >
                {cat.name} <span style={{ color: "#7f8c8d", fontSize: "0.95rem" }}><br/>({cat.count})</span>
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
