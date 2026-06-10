import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
export const ItemPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  borderRadius: "16px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
  color: theme.palette.text.secondary,
}));