import { useState, useContext } from "react";
import { DataContext } from "../Context/ApiContext";
import SimpleSnackbar from "../Componants/Snakbar";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api/axios"; 
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Select, 
  FormHelperText, 
  FormControlLabel, 
  Checkbox, 
  Button, 
  CircularProgress 
} from "@mui/material";

const schema = z.object({
  quantity: z.coerce
    .number({ invalid_type_error: "Quantity must be a valid number" })
    .positive("Quantity must be greater than zero"),  
  remove_from_remaining: z.boolean().default(false),
  type: z.enum(["add", "destroy"], { errorMap: () => ({ message: "Please select an operation type" }) }),
  book_id: z.string().min(1, "Please select a target book"), 
});

export default function EditeIncreamntal() {
  const [open, setOpen] = useState(false);
  const [mes, setmes] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);

  const { books,fetchStocks } = useContext(DataContext);
  const bookList = books?.data ?? books ?? []; 

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      quantity: "",
      remove_from_remaining: false,
      type: "",
      book_id: ""
    }
  });

  const currentType = watch("type");
  const isDestroy = currentType === "destroy";
  const primaryColor = isDestroy ? "#f43f5e" : currentType === "add" ? "#10b981" : "#667eea";

  const onSubmit = async (data) => {
    setLoading(true);
    
    const formattedData = {
      quantity: data.quantity.toString(),
      type: data.type,
      remove_from_remaining: data.remove_from_remaining ? "1" : "0",
      book_id: data.book_id.toString(),
    };

    try {
      const response = await api.post(`/remove_frome_remaining`, formattedData);      
      setColor("success");
      setmes(response.data.message || "Stock updated successfully");
      setOpen(true);
      if(fetchStocks){
        fetchStocks();
      }
      reset();
    } catch (error) {
      console.error("ERROR:", error.response?.data || error.message);
      setColor("error");
      setmes(error.response?.data?.message || "Failed to update stock");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", padding: 3 }}>
        <Card sx={{ width: "100%", maxWidth: "550px", borderRadius: "24px", boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)", border: "1px solid #f1f5f9", padding: 2 }}>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              
              <Typography variant="h5" component="h1" sx={{ color: primaryColor, marginBottom: "30px", fontWeight: "700", textAlign: "center", transition: "color 0.3s ease" }}>
                {isDestroy ? "Destroy / Reduce Stock" : currentType === "add" ? "Add Stock Quantity" : "Stock Inventory Movement"}
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                
                <Controller
                  name="book_id"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.book_id}>
                      <InputLabel id="target-book-label">Target Book</InputLabel>
                      <Select
                        labelId="target-book-label"
                        label="Target Book"
                        {...field}
                      >
                        <MenuItem value=""><em>-- Select a book from the list --</em></MenuItem>
                        {bookList.map((book) => (
                          <MenuItem key={book.id} value={String(book.id)}>
                            {book.title} ({book.ISBN || `ID: ${book.id}`})
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.book_id && <FormHelperText>{errors.book_id.message}</FormHelperText>}
                    </FormControl>
                  )}
                />

                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.type}>
                      <InputLabel id="action-type-label">Action Type</InputLabel>
                      <Select
                        labelId="action-type-label"
                        label="Action Type"
                        {...field}
                      >
                        <MenuItem value=""><em>-- Select operation type --</em></MenuItem>
                        <MenuItem value="add">Add to Stock</MenuItem>
                        <MenuItem value="destroy">Destroy / Remove from Stock</MenuItem>
                      </Select>
                      {errors.type && <FormHelperText>{errors.type.message}</FormHelperText>}
                    </FormControl>
                  )}
                />

                <Controller
                  name="quantity"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      label="Required Quantity"
                      placeholder="Enter number of copies (e.g., 23)"
                      fullWidth
                      error={!!errors.quantity}
                      helperText={errors.quantity?.message}
                    />
                  )}
                />

                <Box sx={{ display: "flex", alignItems: "center", background: "#f8fafc", padding: "12px 16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                  <Controller
                    name="remove_from_remaining"
                    control={control}
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox 
                            checked={!!value} 
                            onChange={onChange} 
                            {...field} 
                            sx={{ color: primaryColor, '&.Mui-checked': { color: primaryColor } }}
                          />
                        }
                        label={
                          <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#334155" }}>
                            Apply adjustments immediately to remaining inventory
                          </Typography>
                        }
                      />
                    )}
                  />
                </Box>

                <Button 
                  type="submit" 
                  variant="contained" 
                  disabled={loading}
                  size="large"
                  sx={{ 
                    background: primaryColor, 
                    color: "#fff", 
                    padding: "14px", 
                    borderRadius: "12px", 
                    fontWeight: "600", 
                    fontSize: "16px",
                    textTransform: "none",
                    boxShadow: `0 4px 14px 0 ${primaryColor}40`,
                    transition: "all 0.3s ease",
                    '&:hover': {
                      background: primaryColor,
                      boxShadow: `0 6px 20px 0 ${primaryColor}60`,
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Execute Stock Transactions"}
                </Button>

              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>

      <SimpleSnackbar 
        message={mes} 
        color={color} 
        handleClick={() => setOpen(true)} 
        handleClose={(e, reason) => { if(reason !== "clickaway") setOpen(false); }} 
        open={open} 
      />
    </>
  );
}