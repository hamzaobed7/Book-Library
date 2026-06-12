import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DevicesIcon from "@mui/icons-material/Devices";
import LockIcon from "@mui/icons-material/Lock";
import UpdateIcon from "@mui/icons-material/Update";

export default function SectionFour() {
  const features = [
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40, color: "white" }} />,
      title: "Fast Delivery",
      description: "We provide fast and secure shipping for physical books right to your doorstep at the best prices.",
    },
    {
      icon: <DevicesIcon sx={{ fontSize: 40, color: "white"  }} />,
      title: "Read Anywhere",
      description: "Our platform is fully responsive, allowing you to enjoy your favorite books on mobile, tablet, or desktop.",
    },
    {
      icon: <LockIcon sx={{ fontSize: 40, color: "white"  }} />,
      title: "Secure Payment",
      description: "All financial transactions are fully encrypted to ensure a 100% safe and reliable shopping experience.",
    },
    {
      icon: <UpdateIcon sx={{ fontSize: 40, color: "white" }} />,
      title: "Daily Updates",
      description: "We add new titles and releases daily to ensure you always have access to the latest books and novels.",
    },
  ];

  return (
    <Box id="wish-section" sx={{ width: "100%", bgcolor: "#f8fafc", py: 8, my: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h2" sx={{ color: "#0f172a", fontWeight: "700", mb: 2 }}>
            Why choose our platform?
          </Typography>
          <Typography variant="body1" sx={{ color: "#64748b", maxWidth: "600px", margin: "0 auto" }}>
            We strive to provide the best experience for reading enthusiasts through integrated services and features that make it easier for you to access your passion.
          </Typography>
        </Box>

       
        <Grid container spacing={4} justifyContent="center">
          {features.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  bgcolor: "white",
                  p: 3,
                  width:"400px",
                  position:"relative",
                  left:'70px',
                  margin:"50px",
                  borderRadius: "16px",
                  textAlign: "center",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
                  height: "100%",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                  },
                  cursor: "pointer"
                }}
              >
               
                <Box
                  sx={{
                    display: "inline-flex",
                    p: 2,
                    color:'white',
                    borderRadius: "50%",
                    bgcolor: "#0f172a", 
                    mb: 2,
                  }}
                >
                  {item.icon}
                </Box>

                <Typography variant="h6" sx={{ color: "#0f172a", fontWeight: "600", mb: 1.5 }}>
                  {item.title}
                </Typography>

                <Typography variant="body2" sx={{ color: "#64748b", lineHeight: 1.6 }}>
                  {item.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}