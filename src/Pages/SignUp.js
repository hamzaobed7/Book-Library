import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as z from "zod";
import "../Css/Login.css";
import api from "../api/axios";
import { AuthContext } from "../auth/AuthContext";
import SimpleSnackbar from "../Componants/Snakbar";

const signupSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Signup() {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("");
  const [mess, SetMes] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

 
  async function onSubmit(data) {
    try {
     
      const res = await api.post("/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      await api.post("/send-otp", { 
        email: data.email 
      });

      navigate("/verify-otp", {
        state: { email: data.email },
      });

    } catch (err) {
      console.error(err.response?.data);
      SetMes(err.response?.data?.message || "Signup failed");
      setColor("error");
      setOpen(true);
    }
  }

  return (
    <>
      <div className="Main-Form">
        <div className="Upper-section">
          <h1>SignUp</h1>
        </div>

        <form className="body-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && (
              <span style={{ color: 'red' }} className="error-text">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="email@gmail.com"
              {...register("email")}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && (
              <span style={{ color: 'red' }} className="error-text">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && (
              <span style={{ color: 'red' }} className="error-text">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className={errors.confirmPassword ? "input-error" : ""}
            />
            {errors.confirmPassword && (
              <span style={{ color: 'red' }} className="error-text">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button className="btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "SignUp"}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      <SimpleSnackbar message={mess} color={color} open={open} handleClose={handleClose} />
    </>
  );
}