import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { DataContext } from "../Context/ApiContext";
import OutlinedCard from "../Componants/Card";
import { BookContext } from "../Context/BookContext";
export default function SectoinThree() {
  const { trendBook } = useContext(BookContext);
  return (
    <>
      <Box
        Container
        id="trending-section"
        sx={{ width: "100%", padding: "30px", boxSizing: "border-box", boxShadow: "0px 40px 40px 0px rgb(0,0,0,0.3)", padding: "50px", width: "100%", borderRadius: "6px" }}
      >
        <Typography variant="h3" sx={{ width: "100%", color: "#0f172a", fontWeight: "600", borderLeft: "7px solid red", padding: "50px" }}>
          Trending Book
        </Typography>

        <Grid container justifyContent="center" sx={{ maxWidth: "1200px", margin: "0 auto", marginTop: "20px" }}>
          {trendBook.map((e, inc) => {
            return (
              <Grid key={inc} size={{ xs: 4, md: 4, sm: 12 }}>
                <Box sx={{ width: "100%" }}>
                  <OutlinedCard state={false} book={e} />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}
