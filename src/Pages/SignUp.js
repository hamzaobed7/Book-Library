import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import * as z from "zod";
import api from "../api/axios";
import SimpleSnackbar from "../Componants/Snakbar";

// استيراد مكونات Material-UI
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  FormHelperText,
  Paper,
  Link
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const signupSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    phone: z.string().min(1, "Phone is required"),
    gender: z.enum(["Male", "Female"], { errorMap: () => ({ message: "Gender is required" }) }),
    DOB: z.string().min(1, "Date of birth is required"),
    lang: z.string().min(1, "Language is required"),
    cover: z.any().refine((files) => files?.length === 1, "Cover image is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Signup() {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("");
  const [mess, SetMes] = useState("");
  const [fileName, setFileName] = useState(""); // لعرض اسم الملف المرفوع في زر الـ MUI
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      gender: "Male",
      DOB: "",
      lang: "ar",
    }
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  async function onSubmit(data) {
    try {
      await api.post("/signup", { email: data.email });
      navigate("/verify-otp", {
        state: { signupData: data },
      });
    } catch (err) {
      console.error(err.response?.data);
      SetMes(err.response?.data?.message || "Signup failed");
      setColor("error");
      setOpen(true);
    }
  }

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 35, mb: 4 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, backgroundColor: '#ffffff' }}>
       
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography component="h1" variant="h4" fontWeight="700" color="primary" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please fill in the data to secure your registration
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={3} sx={{width:"100%"}} >
            
           
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                placeholder="John Doe"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="email"
                label="Email Address"
                placeholder="example@gmail.com"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

       
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                placeholder="09xxxxxxxx"
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>

          
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Date of Birth"
                InputLabelProps={{ shrink: true }}
                {...register("DOB")}
                error={!!errors.DOB}
                helperText={errors.DOB?.message}
              />
            </Grid>

        
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.gender}>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select labelId="gender-label" label="Gender" {...field}>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  )}
                />
                {errors.gender && <FormHelperText>{errors.gender.message}</FormHelperText>}
              </FormControl>
            </Grid>

            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.lang}>
                <InputLabel id="lang-label">System Language</InputLabel>
                <Controller
                  name="lang"
                  control={control}
                  render={({ field }) => (
                    <Select labelId="lang-label" label="System Language" {...field}>
                      <MenuItem value="ar">Arabic</MenuItem>
                      <MenuItem value="en">English</MenuItem>
                    </Select>
                  )}
                />
                {errors.lang && <FormHelperText>{errors.lang.message}</FormHelperText>}
              </FormControl>
            </Grid>

           
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.cover}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: errors.cover ? 'error.main' : 'text.primary' }}>
                  Profile Cover Image
                </Typography>
                
                <Button
                  component="label"
                  variant="outlined"
                  color={fileName ? "success" : errors.cover ? "error" : "primary"}
                  startIcon={fileName ? <CheckCircleIcon /> : <CloudUploadIcon />}
                  sx={{
                    p: 2,
                    borderStyle: 'dashed',
                    borderWidth: 2,
                    '&:hover': { borderWidth: 2, borderStyle: 'dashed' },
                    backgroundColor: fileName ? '#f4fbf5' : '#fcfcfc',
                    textTransform: 'none'
                  }}
                >
                  {fileName ? `Selected: ${fileName}` : "Click to upload cover image"}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    {...register("cover")}
                    onChange={(e) => {
                      register("cover").onChange(e); 
                      handleFileChange(e); 
                    }}
                  />
                </Button>
                {errors.cover && <FormHelperText>{errors.cover.message}</FormHelperText>}
              </FormControl>
            </Grid>

           
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="password"
                label="Password"
                placeholder="••••••••"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

           
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="password"
                label="Confirm Password"
                placeholder="••••••••"
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            </Grid>

          </Grid>

       
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isSubmitting}
            sx={{ mt: 4, mb: 2, p: 1.5, fontWeight: '700', fontSize: '16px', borderRadius: 2 }}
          >
            {isSubmitting ? "Sending OTP..." : "Sign Up & Verify"}
          </Button>

         
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Link component={RouterLink} to="/login" variant="body2" fontWeight="600" underline="hover">
                Login here
              </Link>
            </Typography>
          </Box>

        </Box>
      </Paper>
      <SimpleSnackbar message={mess} color={color} open={open} handleClose={handleClose} />
    </Container>
  );
}