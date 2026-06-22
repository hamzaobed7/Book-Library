import React from 'react';
import { Box, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function NotificationIconWithBadge() {
  return (
    <Box sx={{ padding: "10px", display: "inline-flex", alignItems: "center" }}>
      <Badge 
        badgeContent={2} 
        color="error"
        sx={{
          '& .MuiBadge-badge': {
            fontSize: '12px',    
            fontWeight: '700',
            height: '20px',        
            minWidth: '20px',
          }
        }}
      >
        
        <NotificationsIcon sx={{ fontSize: 30 }} />
      </Badge>
    </Box>
  );
}


