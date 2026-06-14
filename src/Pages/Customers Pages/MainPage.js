

import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppBarsCustomer from "../../Layout/AppBarsForCustomer";
import Drawers from "../../Layout/DrawerCustomer";
export default function MainPageCustomers(){
    return(<>
     <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarsCustomer />
      <Drawers/>
      <Box
        component="main"
        sx={{
            flexGrow: 1,
          p: 3,
          backgroundColor: "#f1f5f9",
          minHeight: "100vh",
          width: { sm: `calc(100% - 260px)` },
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            marginTop: "80px",
            borderRadius: "12px",
            p: 4,
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
    
    </>)
}