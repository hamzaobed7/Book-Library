import { 
  Box, Drawer, List, ListItem, ListItemButton, 
  ListItemIcon, ListItemText,  Toolbar
} from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from '@mui/icons-material/Search';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SendIcon from '@mui/icons-material/Send';
import TableRowsIcon from '@mui/icons-material/TableRows';
import {Link, useLocation } from "react-router-dom";
const drawerWidth = 260;
export default function Drawers(){
    const location = useLocation();
 const menuItems = [
  { text: "DashBoard", icon: <AdminPanelSettingsIcon />, path: "/main" },
    { text: "All Books", icon: <MenuBookIcon />, path: "/GetBooks" },
    { text: "Order your not found book", icon: <SendIcon />, path: "/BookRequest" },
    { text: "Search", icon: <SearchIcon/>, path: "/searchCustomer" },
    { text: "My Request", icon: <TableRowsIcon/>, path: "/MyRequest" },
  ];
return(<>
<Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#f8fafc' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton 
                  component={Link} 
                  to={item.path}
                  selected={location.pathname === item.path}
                  sx={{
                    "&.Mui-selected": { backgroundColor: "#e2e8f0", color: "#2563eb" },
                    "&:hover": { backgroundColor: "#f1f5f9" },
                    margin: '4px 8px',
                    borderRadius: '8px'
                  }}
                >
                  <ListItemIcon sx={{ color: location.pathname === item.path ? "#2563eb" : "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

</>)

}