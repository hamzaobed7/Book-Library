import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import "../Css/boarderCard.css";
import { useEffect, useState } from "react";

function SelectActionCard({ index, name, count,icon}) {
  const [selectedCard, setSelectedCard] = useState(0);
   const [increament,SetIncreamnt]=useState(0)

   useEffect(()=>{
    let interval=setInterval(()=>{
       SetIncreamnt((prev)=>{
        if (prev<count){
          return prev+1
        }
        else{
          clearInterval(interval)
          return prev
        }
       })
    },50)
    return ()=>{
      clearInterval(interval);
    }
   },[count])

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        mt: 5,
      }}
    >
      <Card
      className="BoarderCard"
        sx={{
          borderRadius: "25px",
          overflow: "hidden",

          background:
            "linear-gradient(135deg,rgb(27, 50, 120),rgb(68, 107, 255))",

          color: "white",

          boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",

          transition: "0.4s",

          position: "relative",

          "&:hover": {
            transform: "translateY(-10px) scale(1.03)",
            boxShadow: "0px 20px 40px rgba(0,0,0,0.5)",
          },

          "&::before": {
            content: '""',
            position: "absolute",
            width: "200px",
            height: "200px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "50%",
            top: "-80px",
            right: "-60px",
          },
        }}
      >
        <CardActionArea
          onClick={() => setSelectedCard(index)}
          sx={{
            height: "100%",
          }}
        >
          <CardContent
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
         
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                {name}
              </Typography>

              {icon}
            </Box>

          
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                }}
              >
                {increament}+
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  opacity: 0.8,
                  fontSize: "15px",
                }}
              >
                Live Statistics Dashboard
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}

export default SelectActionCard;