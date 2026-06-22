import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import * as z from "zod";
import { useState } from "react";
import api from "../api/axios";
import SimpleSnackbar from "../Componants/Snakbar";
import "../Css/Login.css";
import { 
  TextField, 
  Button, 
  MenuItem, 
  Box, 
  Typography, 
  Avatar, 
  FormHelperText,
  CircularProgress,
  Container,
  Paper
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const MAX_FILE_SIZE = 2 * 1024 * 1024; 

const signupSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^[0-9]{10}$/, "Phone must be exactly 10 digits"),
    gender: z.enum(["Male", "Female"], { errorMap: () => ({ message: "Gender is required" }) }),
    DOB: z.string().min(1, "Date of birth is required"),
    lang: z.string().min(1, "Language is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    cover: z
      .any()
      .refine((files) => files && files.length === 1, "Profile image is required")
      .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Max image size is 2MB"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function Signup() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [mess, setMess] = useState("");
  const [color, setColor] = useState("success");
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const { onChange, ...coverRegister } = register("cover");

  const handleImageChange = (e) => {
    onChange(e); 
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  async function onSubmit(data) {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("gender", data.gender);
      formData.append("DOB", data.DOB);
      formData.append("lang", data.lang);
      formData.append("password", data.password);
      formData.append("cover", data.cover[0]);

      const res = await api.post("/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMess("Registration successful!");
      setColor("success");
      setOpen(true);

      setTimeout(() => {
        navigate("/verify-otp", {
          state: { user_id: res.data.data.user_id },
        });
      }, 1500);

    } catch (err) {
      console.error(err);
      setMess(err.response?.data?.message || "Something went wrong. Please try again.");
      setColor("error");
      setOpen(true);
    }
  }

  return (
    <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">
        <Box 
          sx={{ 
            textTransform: "none", 
            background: "linear-gradient(135deg, #1565c0 0%, #1e88e5 100%)",
            color: "#fff",
            p: 5, 
            borderRadius: "16px 16px 0 0", 
            textAlign: "center",
            boxShadow: "0px 4px 20px rgba(21, 101, 192, 0.15)"
          }}
        >
          <Typography variant="h3" fontWeight="800" mb={1}>
            Welcome to Our Platform!
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: "400" }}>
            Create your account now by filling out the form below
          </Typography>
        </Box>

     
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 3, sm: 6 }, 
            borderRadius: "0 0 16px 16px", 
            border: "1px solid #e0e0e0",
            borderTop: "none"
          }}
        >
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            
          
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              
              <TextField fullWidth label="Full Name" {...register("name")} error={!!errors.name} helperText={errors.name?.message} />

              <TextField fullWidth label="Email Address" type="email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />

              <TextField fullWidth label="Phone Number" {...register("phone")} error={!!errors.phone} helperText={errors.phone?.message} />

              <TextField select fullWidth label="Gender" defaultValue="" {...register("gender")} error={!!errors.gender} helperText={errors.gender?.message}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>

              <TextField fullWidth type="date" label="Date of Birth" {...register("DOB")} error={!!errors.DOB} helperText={errors.DOB?.message} InputLabelProps={{ shrink: true }} />

              <TextField fullWidth label="Preferred Language" {...register("lang")} error={!!errors.lang} helperText={errors.lang?.message} />

              <TextField fullWidth type="password" label="Password" {...register("password")} error={!!errors.password} helperText={errors.password?.message} />

              <TextField fullWidth type="password" label="Confirm Password" {...register("confirmPassword")} error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message} />

             
              <Box>
                <Box 
                  sx={{ 
                    border: "2px dashed #b0bec5", 
                    borderRadius: 3, 
                    p: 4, 
                    textAlign: "center",
                    backgroundColor: "#fafafa",
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": { borderColor: "primary.main", backgroundColor: "#f0f7ff" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1
                  }}
                  component="label"
                >
                  <CloudUploadIcon color="primary" sx={{ fontSize: 48 }} />
                  <Typography variant="h6" fontWeight="600" color="text.primary">
                    Upload Profile Image
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Click to browse your files (Max size: 2MB)
                  </Typography>
                  
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={coverRegister.ref}
                    name={coverRegister.name}
                  />
                </Box>
                
                {errors.cover && (
                  <FormHelperText error sx={{ mt: 1, textAlign: "center", fontSize: "0.9rem" }}>
                    {errors.cover.message}
                  </FormHelperText>
                )}

                {preview && (
                  <Box display="flex" justifyContent="center" mt={3}>
                    <Avatar
                      src={preview}
                      alt="preview"
                      sx={{ width: 120, height: 120, boxShadow: 3, border: "4px solid #fff" }}
                    />
                  </Box>
                )}
              </Box>

             
              <Button 
                fullWidth 
                variant="contained" 
                type="submit" 
                size="large"
                sx={{ 
                  py: 2, 
                  mt: 2,
                  borderRadius: 2, 
                  fontWeight: 'bold', 
                  fontSize: '1.1rem',
                  textTransform: 'none', 
                  boxShadow: "0px 4px 12px rgba(25, 118, 210, 0.3)" 
                }} 
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={26} color="inherit" /> : "Create Account"}
              </Button>

            </Box>
          </Box>

        
          <Typography mt={4} textAlign="center" variant="body1" color="text.secondary">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#1976d2", textDecoration: "none", fontWeight: "600" }}>
              Login
            </Link>
          </Typography>

        </Paper>
      </Container>

      <SimpleSnackbar message={mess} color={color} open={open} handleClose={() => setOpen(false)} />
    </Box>
  );
}
