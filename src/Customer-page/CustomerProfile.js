import React, { useState, useEffect, useContext } from "react";
import { Box, Container, Paper, Typography, Avatar, TextField, Button, Grid, Tabs, Tab, IconButton, InputAdornment, Divider, CircularProgress, MenuItem } from "@mui/material";
import { Person as PersonIcon, Lock as LockIcon, Visibility, VisibilityOff, PhotoCamera, Save as SaveIcon, VpnKey as KeyIcon } from "@mui/icons-material";
import api from "../api/axios";
import SimpleSnackbar from "../Componants/Snakbar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { stringToColor } from "../Componants/backColor";
import CustomTabPanel from "../Componants/CustumPanal";
import { AuthonticationContext } from "../Context/AuthonticationContext";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const imageBaseUrl = "http://127.0.0.1:8000/storage/customer_images/";

const schema = z.object({
  name: z.string().min(3, "Must be greater than 3").max(30, "Must be lower than 30"),
  phone: z.string().min(10, "Must be at least 10 digits").max(15, "Too long"),
  gender: z.string().min(1, "Gender is required"),
  lang: z.string().min(1, "Language is required"),
  DOB: z.coerce.date().refine((date) => date < new Date(), "The date should be earlier than today."),
  cover: z
    .any()
    .optional()
    .refine((files) => !files || files.length === 0 || files[0]?.size <= 2 * 1024 * 1024, "Max image size is 2MB.")
    .refine((files) => !files || files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files[0]?.type), "Only .jpg, .jpeg, .png and .webp formats are supported."),
});

export default function CustomerProfile() {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [opens, setOpens] = useState(false);
  const [mess, SetMes] = useState("");
  const [color, setColor] = useState("success");
  const [avatarPreview, setAvatarPreview] = useState("");

  const { FetechProfile, Profile, currntUser } = useContext(AuthonticationContext);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const coverFile = watch("cover");
  useEffect(() => {
    if (!coverFile?.length) return;
    const url = URL.createObjectURL(coverFile[0]);
    setAvatarPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [coverFile]);

  

useEffect(() => {
  if (FetechProfile) {
    FetechProfile();
  }
}, []);


useEffect(() => {
  if (Profile) {
    setValue("name", Profile.name || "");
    setValue("email", Profile.email || "");
    setValue("phone", Profile.phone || "");
    setValue("gender", Profile.gender || "");
    setValue("lang", Profile.lang || "");
    
    if (Profile.DOB) {
      setValue("DOB", Profile.DOB);
    }

    if (Profile.cover) {
      const fullImageUrl = `${imageBaseUrl}/${Profile.cover}`;
      setAvatarPreview(fullImageUrl);
    }
  }
}, [Profile, setValue]); 

  const showToast = (message, severity) => {
    SetMes(message);
    setColor(severity);
    setOpens(true);
  };

  const handleUpdateProfile = async (data) => {
    console.log("SUBMIT DATA", data.DOB);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("gender", data.gender);
      formData.append("lang", data.lang);
      const formattedDOB = data.DOB.toISOString().split("T")[0];

      formData.append("DOB", formattedDOB);

      if (data.cover && data.cover[0]) {
        formData.append("cover", data.cover[0]);
      }

      const res = await api.put(`/UpdateProfile`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showToast(res.data?.message || "Profile updated successfully", "success");
      if (FetechProfile) FetechProfile();
    } catch (err) {
      showToast(err.response?.data?.message || "Error updating profile", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
        <CircularProgress size={45} thickness={4} sx={{ color: "#4a90e2" }} />
      </Box>
    );
  }

  const currentUserName = watch("name") || "User";
  const currentUserEmail = currntUser?.user?.email || "";

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: "24px",
          overflow: "hidden",
          border: "1px solid #e2e8f0",
          boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05)",
        }}
      >
        <Box
          sx={{
            background: `linear-gradient(135deg, ${stringToColor(currentUserName)} 0%, #1e293b 140%)`,
            padding: "45px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "white",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={avatarPreview}
              sx={{
                width: 100,
                height: 100,
                fontSize: "36px",
                fontWeight: "700",
                bgcolor: "white",
                color: stringToColor(currentUserName),
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                border: "3px solid rgba(255,255,255,0.8)",
              }}
            >
              {currentUserName.charAt(0).toUpperCase()}
            </Avatar>

            <input type="file" accept="image/*" id="avatar-upload" style={{ display: "none" }} {...register("cover")} />
            <label htmlFor="avatar-upload">
              <IconButton
                component="span"
                sx={{
                  position: "absolute",
                  bottom: -2,
                  right: -2,
                  backgroundColor: "white",
                  color: "#1e293b",
                  "&:hover": { backgroundColor: "#f1f5f9" },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  padding: "7px",
                }}
                size="small"
              >
                <PhotoCamera sx={{ fontSize: 18 }} />
              </IconButton>
            </label>
          </Box>

          <Typography variant="h5" sx={{ mt: 2.5, fontWeight: "700", letterSpacing: "-0.5px" }}>
            {currentUserName}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.75, mt: 0.5, fontWeight: "400" }}>
            {currentUserEmail || "No Email Provided"}
          </Typography>
        </Box>

        {/* Account Panel */}
        <CustomTabPanel value={activeTab} index={0}>
          <Box component="form" onSubmit={handleSubmit(handleUpdateProfile, (errors) => console.log(errors))}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: "700", color: "#0f172a", display: "flex", alignItems: "center", gap: 1 }}>
              <PersonIcon sx={{ color: "#4a90e2" }} /> Personal Details
            </Typography>

            <Grid container direction="column" spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...register("name")}
                  InputLabelProps={{ shrink: true }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  {...register("phone")}
                  InputLabelProps={{ shrink: true }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField select fullWidth label="Gender" defaultValue="" error={!!errors.gender} helperText={errors.gender?.message} InputLabelProps={{ shrink: true }} {...register("gender")}>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField select fullWidth label="Language" defaultValue="" error={!!errors.lang} helperText={errors.lang?.message} InputLabelProps={{ shrink: true }} {...register("lang")}>
                  <MenuItem value="ar">العربية</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  error={!!errors.DOB}
                  helperText={errors.DOB?.message}
                  {...register("DOB")}
                  InputLabelProps={{ shrink: true }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
                {errors.cover && (
                  <Typography variant="caption" color="error" sx={{ display: "block", mt: 1, ml: 1 }}>
                    {errors.cover.message}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={<SaveIcon />}
                  sx={{
                    background: "linear-gradient(135deg, #4a90e2 0%, #357abd 100%)",
                    padding: "10px 24px",
                    borderRadius: "12px",
                    fontWeight: "600",
                    textTransform: "none",
                    boxShadow: "0 8px 20px -6px rgba(74, 144, 226, 0.4)",
                    width: "100%",
                    "&:hover": { background: "#357abd" },
                  }}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CustomTabPanel>
      </Paper>

      <SimpleSnackbar message={mess} color={color} open={opens} handleClose={() => setOpens(false)} />
    </Container>
  );
}
