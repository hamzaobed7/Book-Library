import { 
  Box, Drawer, List, ListItem, ListItemButton, 
  ListItemIcon, ListItemText,  Toolbar
} from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import InventoryIcon from '@mui/icons-material/Inventory';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {Link, useLocation } from "react-router-dom";
const drawerWidth = 260;
export default function Drawers(){
    const location = useLocation();
 const menuItems = [
  { text: "Admin DashBoard", icon: <AdminPanelSettingsIcon />, path: "/dashboard" },
    { text: "All Books", icon: <MenuBookIcon />, path: "/GetBooks" },
    { text: "Add New Book", icon: <AddCircleIcon />, path: "/AddBook" },
    { text: "Update Book", icon: <EditIcon />, path: "/updateBook" },
    { text: "All Authors", icon: <PersonIcon />, path: "/GetAuthor" },
    { text: "Add New Author", icon: <AddCircleIcon />, path: "/AddAuthor" },
    { text: "Update Author", icon: <EditIcon />, path: "/UpdateAuthor" },
    { text: "Add New Category", icon: <AddCircleIcon />, path: "/AddCategory" },
    { text: "All Category", icon: <MenuBookIcon />, path: "/GetAllCategory" },
    { text: "Update the Stock", icon: <InventoryIcon />, path: "/Stock" },
    { text: "Delete Multi", icon: <DeleteIcon />, path: "/DeleteMulti" },
    { text: "Search", icon: <SearchIcon/>, path: "/search" },
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
                  <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

</>)

}