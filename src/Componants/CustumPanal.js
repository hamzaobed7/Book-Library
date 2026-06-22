import { Box, Fade } from "@mui/material";

export default function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} {...other}>
      {value === index && (
        <Fade in={value === index} timeout={400}>
          <Box sx={{ p: { xs: 3, sm: 4 } }}>{children}</Box>
        </Fade>
      )}
    </div>
  );
}
