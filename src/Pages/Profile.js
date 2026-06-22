import React, { useState, useEffect, useContext } from "react";
import { Box, Container, Paper, Typography, Avatar, TextField, Button, Grid, Tabs, Tab, IconButton, InputAdornment, Divider, CircularProgress } from "@mui/material";
import { Person as PersonIcon, Lock as LockIcon, Visibility, VisibilityOff, PhotoCamera, Save as SaveIcon, VpnKey as KeyIcon } from "@mui/icons-material";
import api from "../api/axios";
import SimpleSnackbar from "../Componants/Snakbar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { stringToColor } from "../Componants/backColor";
import CustomTabPanel from "../Componants/CustumPanal";
import { AuthonticationContext } from "../Context/AuthonticationContext";
const schema = z.object({
  name: z.string().min(3, "must be greater than 3").max(30, "must be lower than 30"),
  email: z.string().email("Invalid email address"),
});

export default function Profile() {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [opens, setOpens] = useState(false);
  const [mess, SetMes] = useState("");
  const [color, setColor] = useState("success");

  const [profileData, setProfileData] = useState({ name: "", email: "" });
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  const { currntUser, FetechcurrntUser } = useContext(AuthonticationContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (FetechcurrntUser) {
      FetechcurrntUser();
    }
  }, []);

  useEffect(() => {
    if (currntUser?.user) {
      const uName = currntUser.user.name || "";
      const uEmail = currntUser.user.email || "";

      setProfileData({ name: uName, email: uEmail });

      setValue("name", uName);
      setValue("email", uEmail);
    }
  }, [currntUser, setValue]);

  const showToast = (message, severity) => {
    SetMes(message);
    setColor(severity);
    setOpens(true);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // تحديث بيانات الحساب
  const handleUpdateProfile = async (data) => {
    try {
      setLoading(true);
      const res = await api.patch("/admin/profile", data);
      showToast(res.data?.message || "Profile updated successfully", "success");

      setProfileData({ name: data.name, email: data.email });
      if (FetechcurrntUser) FetechcurrntUser();
    } catch (err) {
      showToast(err.response?.data?.message || "Error updating profile", "error");
    } finally {
      setLoading(false);
    }
  };

  // تحديث كلمة المرور
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.new_password_confirmation) {
      showToast("New passwords do not match", "error");
      return;
    }
    try {
      setLoading(true);
      const res = await api.put("/password/update", passwordData);
      showToast(res.data?.message || "Password changed successfully", "success");
      setPasswordData({ current_password: "", new_password: "", new_password_confirmation: "" });
    } catch (err) {
      showToast(err.response?.data?.message || "Error changing password", "error");
    } finally {
      setLoading(false);
    }
  };

  // حماية من الـ Crash في حال كانت البيانات لم تـُجلب بعد
  if (!currntUser?.user && loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
        <CircularProgress size={45} thickness={4} sx={{ color: "#4a90e2" }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
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
            background: `linear-gradient(135deg, ${stringToColor(profileData.name)} 0%, #1e293b 140%)`,
            padding: "45px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "white",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                fontSize: "36px",
                fontWeight: "700",
                bgcolor: "white",
                color: stringToColor(profileData.name),
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                border: "3px solid rgba(255,255,255,0.8)",
              }}
            >
              {profileData.name ? profileData.name.charAt(0).toUpperCase() : "U"}
            </Avatar>
            <IconButton
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
          </Box>

          <Typography variant="h5" sx={{ mt: 2.5, fontWeight: "700", letterSpacing: "-0.5px" }}>
            {profileData.name || "User Profile"}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.75, mt: 0.5, fontWeight: "400" }}>
            {profileData.email || "Loading email..."}
          </Typography>
        </Box>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            borderBottom: "1px solid #e2e8f0",
            backgroundColor: "#f8fafc",
            "& .MuiTabs-indicator": { height: "3px", borderRadius: "3px" },
          }}
        >
          <Tab icon={<PersonIcon sx={{ fontSize: 20 }} />} iconPosition="start" label="Account" sx={{ fontWeight: "600", py: 2 }} />
          <Tab icon={<LockIcon sx={{ fontSize: 20 }} />} iconPosition="start" label="Security" sx={{ fontWeight: "600", py: 2 }} />
        </Tabs>

        {/* Account Panel */}
        <CustomTabPanel value={activeTab} index={0}>
          <Box component="form" onSubmit={handleSubmit(handleUpdateProfile)}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: "700", color: "#0f172a", display: "flex", alignItems: "center", gap: 1 }}>
              <PersonIcon sx={{ color: "#4a90e2" }} /> Personal Details
            </Typography>
            <Grid container direction="column" spacing={2.5}>
              <Grid item>
                <TextField
                  fullWidth
                  label="Full Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...register("name")}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register("email")}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
              </Grid>

              <Grid item sx={{ mt: 1 }}>
                <Divider sx={{ mb: 2.5 }} />
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
                    width: { xs: "100%", sm: "auto" },
                    float: { sm: "right" },
                    "&:hover": { background: "#357abd" },
                  }}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CustomTabPanel>

        {/* Security Panel */}
        <CustomTabPanel value={activeTab} index={1}>
          <Box component="form" onSubmit={handleUpdatePassword}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: "700", color: "#0f172a", display: "flex", alignItems: "center", gap: 1 }}>
              <KeyIcon sx={{ color: "#1e293b" }} /> Update Password
            </Typography>
            <Grid container direction="column" spacing={2.5}>
              <Grid item>
                <TextField
                  fullWidth
                  label="Current Password"
                  name="current_password"
                  type={showCurrent ? "text" : "password"}
                  value={passwordData.current_password}
                  onChange={handlePasswordChange}
                  required
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowCurrent(!showCurrent)} edge="end">
                          {showCurrent ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item>
                <TextField
                  fullWidth
                  label="New Password"
                  name="new_password"
                  type={showNew ? "text" : "password"}
                  value={passwordData.new_password}
                  onChange={handlePasswordChange}
                  required
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowNew(!showNew)} edge="end">
                          {showNew ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  name="new_password_confirmation"
                  type={showConfirm ? "text" : "password"}
                  value={passwordData.new_password_confirmation}
                  onChange={handlePasswordChange}
                  required
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                          {showConfirm ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item sx={{ mt: 1 }}>
                <Divider sx={{ mb: 2.5 }} />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    background: "#1e293b",
                    padding: "10px 24px",
                    borderRadius: "12px",
                    fontWeight: "600",
                    textTransform: "none",
                    width: { xs: "100%", sm: "auto" },
                    float: { sm: "right" },
                    "&:hover": { background: "#0f172a" },
                  }}
                >
                  {loading ? "Updating..." : "Change Password"}
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
