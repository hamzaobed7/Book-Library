import { Box, Button, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import SimpleSnackbar from "../Componants/Snakbar";
import api from "../api/axios";

const schema = z.object({
  book_title: z.string().min(3, "Must be Greater than 3").max(50, "Must be smaller than 50"),
  author_name: z.string().min(3, "Must be Greater than 3").max(30, "Must be smaller than 30"),
});

export default function RequestBook() {
  const [open, setOpen] = useState(false);
  const [mes, setMes] = useState("");
  const [color, setcolor] = useState("");
  const handleClick = () => setOpen(true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const inputStyle = {
    width: "70%",
    "& .MuiInputBase-input": {
      fontSize: "26px",
      padding: "14px 20px",
    },
    "& .MuiInputBase-input::placeholder": {
      fontSize: "22px",
      opacity: 0.7,
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      transition: "all 0.3s ease-in-out",
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "primary.main",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "2px solid #1976d2",
      },
      "&.Mui-focused": {
        boxShadow: "0px 10px 40px rgba(25, 118, 210, 0.25)",
      },
    },
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      book_title: "",
      author_name: "",
    },
  });

  const onFormSubmit = async (data) => {
    try {
      const res = await api.post("/book_request", data);
      setMes(res.data.message);
      setOpen(true);
      setcolor("success");
      handleClick();

      reset();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      handleClick();
      setOpen(true);
      setMes(errorMessage);
      setcolor("error");
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onFormSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "95%",
          maxWidth: "1000px",
          margin: "40px auto",
          padding: "40px 20px",
          borderRadius: "16px",
          boxShadow: "0px 20px 50px rgba(0, 0, 0, 0.15)",
          bgcolor: "background.paper",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "800",
            backgroundImage: "linear-gradient(45deg, #1a73e8, #00e0ff)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 5,
          }}
        >
          Add Your Desired Book
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            gap: 3,
          }}
        >
          <TextField {...register("book_title")} placeholder="Book Name" sx={inputStyle} error={!!errors.book_title} />
          {errors.book_title && <Typography sx={{ color: "error.main", fontSize: "16px", mt: -2, width: "70%", textAlign: "left" }}>{errors.book_title.message}</Typography>}

          <TextField {...register("author_name")} placeholder="Author Name" sx={inputStyle} error={!!errors.author_name} />
          {errors.author_name && <Typography sx={{ color: "error.main", fontSize: "16px", mt: -2, width: "70%", textAlign: "left" }}>{errors.author_name.message}</Typography>}

          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon sx={{ fontSize: "24px !important" }} />}
            sx={{
              width: "35%",
              mt: 2,
              py: 1.8,
              borderRadius: "12px",
              backgroundImage: "linear-gradient(45deg, #1a73e8, #00e0ff)",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "700",
              textTransform: "none",
              boxShadow: "0px 8px 20px rgba(26, 115, 232, 0.3)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-3px) scale(1.03)",
                boxShadow: "0px 12px 28px rgba(26, 115, 232, 0.45)",
              },
            }}
          >
            Send Request
          </Button>
        </Box>
      </Box>

      <SimpleSnackbar message={mes} handleClose={handleClose} open={open} color={color} />
    </>
  );
}
