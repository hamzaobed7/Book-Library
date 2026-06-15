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
import DeleteMultiElement from "../Pages/DeleteMultiElement";
import StockManagement from "../Pages/EditeIncreamntal";
import SearchPage from "../Pages/Search";
import MainEnd from "../Page-forGust/MainEnd";
import MainPage from "./../Page-forGust/MainPage";

import GuestSearchPage from "../Page-forGust/SearchForUesrs.js";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Route>

<Route element={<ProtectedRoute />}>
        <Route element={<Home />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="UpdateBook" element={<UpdateBook />} />
          <Route path="GetBooksS" element={<GetAllBooks delet={true}rent={false} />} />
          <Route path="AddBook" element={<AddBook />} />
          <Route path="AddCategory" element={<AddCategory />} />
          <Route path="GetAuthor" element={<GetAllAuthors />} />
          <Route path="AddAuthor" element={<AddAuthor />} />
          <Route path="UpdateAuthor" element={<UpdateAuthor />} />
          <Route path="GetAllCategory" element={<GetAllCategory />} />
          <Route path="DeleteMulti" element={<DeleteMultiElement />} />
          <Route path="MyProfile" element={<Profile />} />
          <Route path="Stock" element={<StockManagement />} />
          <Route path="/MyProfile" element={<Profile />} />
          <Route path="search" element={<SearchPage />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
      </Route>




      <Route element={<MainEnd />}>
        <Route path="/HomePage" element={<MainPage />} />
        <Route path="/searchG" element={<GuestSearchPage />} />
      </Route>
      <Route path="/BookDetiles/:id" element={<BookDetiles />} /> 



      <Route path="/" element={<Navigate to="/HomePage" replace />} />
      <Route path="*" element={<Navigate to="/HomePage" replace />} />
    </Routes>
  );
}
