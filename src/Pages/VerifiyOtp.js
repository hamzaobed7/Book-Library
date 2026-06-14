import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const signupData = location.state?.signupData;
  const email = signupData?.email;
  
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const resendOtp = async () => {
    try {
      setLoading(true);
      setError("");
      await api.post("/signup", { email });
      alert("A new OTP has been sent.");
      setOtp(new Array(6).fill(""));
      setTimeLeft(300);
      inputRefs.current[0]?.focus();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, "");
    if (!value) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (index < 5 && element.value) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (!otp[index] && index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      } else {
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const verifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length < 6) {
      setError("Please enter all 6 digits");
      return;
    }

    try {
      setLoading(true);
      setError("");

     
      const formData = new FormData();
      formData.append("otp_code", otpString);
      formData.append("email", signupData.email);
      formData.append("name", signupData.name);
      formData.append("password", signupData.password);
      formData.append("phone", signupData.phone);
      formData.append("gender", signupData.gender);
      formData.append("DOB", signupData.DOB);
      formData.append("lang", signupData.lang);
      
      if (signupData.cover && signupData.cover[0]) {
        formData.append("cover", signupData.cover[0]);
      }

      const response = await api.post("/verify-otp", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Invalid OTP or Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Verify OTP</h1>
        <p style={styles.subtitle}>Verification code sent to:</p>
        <p style={styles.email}>{email}</p>
        
        <div style={styles.otpContainer}>
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={data}
              disabled={timeLeft === 0} 
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              style={styles.inputBox}
            />
          ))}
        </div>

        <div style={styles.timerContainer}>
          {timeLeft > 0 ? (
            <p style={styles.timerText}>Code expires in: <span>{formatTime(timeLeft)}</span></p>
          ) : (
            <p style={styles.resendText}>
              Didn't receive code?{" "}
              <button onClick={resendOtp} disabled={loading} style={styles.resendBtn}>Resend OTP</button>
            </p>
          )}
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button 
          onClick={verifyOtp} 
          disabled={loading || timeLeft === 0} 
          style={{...styles.button, background: timeLeft === 0 ? '#cccccc' : 'black', cursor: timeLeft === 0 ? 'not-allowed' : 'pointer'}}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f8f9fa", fontFamily: "system-ui, sans-serif" },
  card: { width: "400px", background: "white", padding: "40px 30px", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: "20px", textAlign: "center" },
  title: { margin: 0, fontSize: "24px", fontWeight: "700", color: "#1a1a1a" },
  subtitle: { color: "#6c757d", fontSize: "14px", margin: 0 },
  email: { fontWeight: "600", color: "#495057", margin: "-10px 0 10px 0", fontSize: "15px" },
  otpContainer: { display: "flex", justifyContent: "space-between", gap: "10px", margin: "10px 0", direction: "ltr" },
  inputBox: { width: "45px", height: "50px", borderRadius: "10px", border: "2px solid #dee2e6", fontSize: "20px", fontWeight: "bold", textAlign: "center", outline: "none", transition: "all 0.2s ease", background: "#f8f9fa" },
  timerContainer: { margin: "5px 0" },
  timerText: { fontSize: "14px", color: "#6c757d", margin: 0 },
  resendText: { fontSize: "14px", color: "#6c757d", margin: 0 },
  resendBtn: { background: "none", border: "none", color: "#007bff", fontWeight: "600", cursor: "pointer", textDecoration: "underline", padding: 0 },
  button: { padding: "14px", border: "none", borderRadius: "10px", color: "white", fontSize: "16px", fontWeight: "600", marginTop: "10px" },
  error: { color: "#dc3545", fontSize: "14px", margin: 0, fontWeight: "500" },
};

export default VerifyOtp;