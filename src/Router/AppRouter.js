import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Pages/Login";
import Signup from "../Pages/SignUp";
import Home from "../Pages/Home";
import AddBook from "../Pages/AddBook";
import GetAllBooks from "../Pages/GetAllBooks";
import GetAllAuthors from "../Pages/GetAllAuthors";
import AddAuthor from "../Pages/AddAuthor";
import UpdateAuthor from "../Pages/UpdateAuthor";
import ProtectedRoute from "./ProtectedRoute";
import UpdateBook from "./../Pages/UpdateBook";
import PublicRoute from "./PublicRoute";
import Dashboard from "../Pages/DashBoard";
import VerifyOtp from "../Pages/VerifiyOtp";
import AddCategory from "../Pages/AddCategory";
import GetAllCategory from "../Pages/GetAllCategory";
import BookDetiles from "../Pages/BookDetiles";
import Profile from "../Pages/Profile";
import StockManagement from "../Pages/EditeIncreamntal";
export default function AppRoutes() {
  return (
    <Routes>
        <Route element={<PublicRoute />}>
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
       <Route path="/verify-otp" element={<VerifyOtp/>}/>
       </Route>
       <Route element={<ProtectedRoute />}>  
         <Route element={<Home />}>
         <Route path="/dashboard" element={<Dashboard/>} /> 
           <Route path="/GetBooks" element={<GetAllBooks   />} />
           <Route path="/UpdateBook" element={<UpdateBook />} />
           <Route path="/AddBook" element={<AddBook />} />
           <Route path="/AddCategory" element={<AddCategory/>} />
           <Route path="/GetAuthor" element={<GetAllAuthors />} />
           <Route path="/AddAuthor" element={<AddAuthor />} />
           <Route path="/UpdateAuthor" element={<UpdateAuthor />} />
           <Route path="/GetAllCategory" element={<GetAllCategory/>} />
            <Route path="/MyProfile" element={<Profile/>} />
              <Route path="/Stock" element={<StockManagement/>}/>
           <Route path="/" element={<Navigate to="/dashboard" replace />} />
         </Route>
        
         <Route path="/BookDetiles/:id" element={<BookDetiles/>}/> 
       </Route>
     
       <Route path="*" element={<Navigate to="/" replace />} />             
    </Routes>
  );
}
