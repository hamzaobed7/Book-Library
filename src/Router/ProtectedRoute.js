import { useContext} from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthonticationContext } from './../Context/AuthonticationContext';

export default function ProtectedRoute({ allowedRoles }) {
  const token = localStorage.getItem("token");
  const { currntUser} = useContext(AuthonticationContext);
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!currntUser || !currntUser.user) {
    return <div>Loading...</div>;
  }

const userType = currntUser.user.type;
console.log(currntUser.user.type)

  if (allowedRoles && !allowedRoles.includes(userType)) {
    return <Navigate to="/HomePage" replace />;
  }

  return <Outlet />;
}
