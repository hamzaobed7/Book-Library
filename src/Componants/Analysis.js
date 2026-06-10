import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { ItemPaper } from "./themItem"
export default function Analysis(){
    return(
         <ItemPaper className="curve" sx={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
              <Typography variant="h6" sx={{ fontWeight: "700", color: "#333", mb: 1 }}>
                Library Analytics
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                Weekly distribution of resources
              </Typography>

              <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: "150px", mt: "auto", px: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: "35px", height: "120px", background: "linear-gradient(to top, #7b1fa2, #9c27b0)", borderRadius: "6px 6px 0 0" }} />
                  <Typography variant="caption" sx={{ fontWeight: "600" }}>
                    Books
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: "35px", height: "80px", background: "linear-gradient(to top, #1976d2, #2196f3)", borderRadius: "6px 6px 0 0" }} />
                  <Typography variant="caption" sx={{ fontWeight: "600" }}>
                    Authors
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: "35px", height: "50px", background: "linear-gradient(to top, #388e3c, #4caf50)", borderRadius: "6px 6px 0 0" }} />
                  <Typography variant="caption" sx={{ fontWeight: "600" }}>
                    Cats
                  </Typography>
                </Box>
              </Box>
            </ItemPaper>
    )
}