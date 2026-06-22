import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as z from "zod";
import "../Css/Login.css";
import api from "../api/axios";
import { AuthContext } from "../auth/AuthContext";
import SimpleSnackbar from "../Componants/Snakbar";
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const [open, setOpen] = useState(false);
  const [mm, SetMes] = useState("");
  const [color,setColor]=useState("")
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };
  
 const onSubmit = async (data) => {
  try {
    const response = await api.post("/login", data);
    login(response.data.data);
    const userData =response.data.data.type;
    if (userData && userData=== 'customer') {
      navigate("/main");
    } else {
      navigate("/dashboard", { replace: true });
    }

  } catch (error) {
    console.error("Login failed:", error);
    SetMes("Login failed. Your email or password incorrect.");
    reset({
      email: "",
      password: ""
    });
    setOpen(true);
    setColor("error");
  }
};

  return (
    <>
      <div className="Main-Form">
        <div className="Upper-section">
          <h1>Login</h1>
        </div>
        <form className="body-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <input type="email"  placeholder="email@gmail.com" {...register("email")} className={errors.email ? "input-error" : ""} />
            {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
          </div>

          <div className="input-group">
            <input type="password" placeholder="Password" {...register("password")} className={errors.password ? "input-error" : ""} />

            {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}
          </div>

          <button className="btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Login"}
          </button>
        </form>

        <p>
          Don't have an account?
          <Link to="/signup"> SignUp</Link>
        </p>
      </div>

      <SimpleSnackbar message={mm} color={color} handleClose={handleClose} open={open} />
    </>
  );
}