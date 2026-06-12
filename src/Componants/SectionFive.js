import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function SectionSix() {
  return (
    <Box sx={{ width: "100%", py: 8, bgcolor: "#ffff", color: "white", textAlign: "center" }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ color: "#0f172a", fontWeight: "700", mb: 2 }}>
          Never Miss a New Book!
        </Typography>
        <Typography variant="body1" sx={{ color: "#94a3b8", mb: 4, maxWidth: "500px", margin: "0 auto 32px" }}>
          Subscribe to our newsletter and receive updates about the latest releases, trending authors, and exclusive discounts directly in your inbox.
        </Typography>

        <Box
          component="form"
          onSubmit={(e) => e.preventDefault()}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            justifyContent: "center",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Enter your email address"
            fullWidth
            sx={{
              bgcolor: "white",
              border: "1px solid #0f172a",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { border: "none" },
              },
            }}
          />
          <br />
          <TextField
            variant="outlined"
            placeholder="Enter your Comments"
            fullWidth
            multiline
            sx={{
              bgcolor: "white",
              border: "1px solid #0f172a",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { border: "none" },
              },
            }}
          />

          <Button
            variant="contained"
            type="submit"
            sx={{
              bgcolor: "red",
              color: "white",
              fontWeight: "600",
              px: 4,
              py: { xs: 1.5, sm: 0 },
              borderRadius: "8px",
              "&:hover": { bgcolor: "#cc0000" },
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
