import { Box, Typography, Button, Container } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import mainphoto from "../photos/library.png";
export default function SectionOne() {
  return (
    <>
      <Box
      id="home-section"
        sx={{
          position: "relative",
          backgroundImage: `url('${mainphoto}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "18px",

          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.55)",
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
          <Box
            sx={{
              backdropFilter: "blur(4px)",
              backgroundColor: "rgba(255, 255, 255, 0.07)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "16px",
              padding: { xs: "32px 16px", md: "48px" },
              textAlign: "center",
              color: "#fff",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: "bold",
                fontFamily: "'Cairo', 'Roboto', sans-serif",
                fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3.5rem" },
                mb: 2,
              }}
            >
              Your Comming Book Waiting you
            </Typography>

            <Typography
              variant="h6"
              component="p"
              sx={{
                fontFamily: "'Cairo', 'Roboto', sans-serif",
                fontSize: { xs: "1rem", md: "1.25rem" },
                opacity: 0.9,
                mb: 4,
                maxWidth: "600px",
                margin: "0 auto 32px auto",
              }}
            >
              Your preferred tenant code will be easily accessible. Your personal library is now at your fingertips as a visitor!{" "}
            </Typography>

            <Button
              variant="contained"
              size="large"
              startIcon={<AutoStoriesIcon />}
              sx={{
                backgroundColor: "red",
                color: "#fff",
                padding: "12px 36px",
                fontSize: "1.1rem",
                fontFamily: "'Cairo', sans-serif",
                fontWeight: "bold",
                borderRadius: "8px",
                textTransform: "none",
                boxShadow: "0 4px 14px rgba(230, 126, 34, 0.4)",
                "&:hover": {
                  backgroundColor: "#d35400",
                  boxShadow: "0 6px 20px rgba(211, 84, 0, 0.6)",
                },
              }}
            >
             Browse The Available Books
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}


