import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles }) {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");


  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let user = null;
  try {
    user = userString ? JSON.parse(userString) : null;
  } catch (e) {
    console.error("Error parsing user from localStorage", e);
  }


  if (!user) {
    return <Navigate to="/login" replace />;
  }

  
  if (allowedRoles && !allowedRoles.includes(user.type)) {

    if (user.type === "customer") {
      return <Navigate to="/cust" replace />;
    }
   
    return <Navigate to="/unauthorized" replace />; 
  }

  
  return <Outlet />;
}