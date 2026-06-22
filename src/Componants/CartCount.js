import { Badge, Box } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context/ApiContext";
export default function CartCount() {

    const {count,FetechCountOfCart}=useContext(DataContext);

    useEffect(()=>{
        if(FetechCountOfCart){
            FetechCountOfCart()
        }
    },[count])

  return (
    <Box sx={{ padding: "10px", display: "inline-flex", alignItems: "center" }}>
      <Badge 
        badgeContent={count} 
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
        
        <ShoppingCartIcon sx={{ fontSize: 30 }} />
      </Badge>
    </Box>
  );
}