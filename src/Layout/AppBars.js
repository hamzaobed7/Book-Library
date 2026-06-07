import { AppBar, Toolbar, Typography, Button, Box, Avatar } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import NotificationIconWithBadge from "../Componants/Notifications"
import { AuthContext } from "../auth/AuthContext";
export default function AppBars() {
  const [activat, SetActivat] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#1e293b",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <DashboardIcon sx={{ mr: 2 }} />

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: "bold",
              }}
            >
              Admin Dashboard
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <NotificationIconWithBadge/>

            <Avatar
              onClick={() => SetActivat(!activat)}
              sx={{
                bgcolor: "#2563eb",
                width: 50,
                height: 50,
                fontWeight: "bold",
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": {
                  bgcolor: "#1d4ed8",
                },
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase()}
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {activat && (
        <Box
          sx={{
            width: "220px",

            position: "fixed",
            top: "80px",
            right: "20px",
            backgroundColor: "white",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              padding: "15px",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <PersonIcon
              sx={{
                color: "#64748b",
              }}
            />

            <Link
              style={{
                color: "#1e293b",
                fontWeight: "600",
                textDecoration:'none',
                color:"black"
                
              }}
              to="/MyProfile"
            >
              {user?.name || "Unknown User"}
            </Link>
          </Box>
          <Button
            fullWidth
            color="error"
            variant="contained"
            onClick={handleLogout}
            sx={{
              borderRadius: 0,

              height: "50px",

              fontWeight: "bold",

              textTransform: "none",
            }}
          >
            Logout
          </Button>
        </Box>
      )}
    </>
  );
}
