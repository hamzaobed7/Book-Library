import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react"; 

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../Pages/Login";
import Signup from "../Pages/SignUp";
import VerifyOtp from "../Pages/VerifiyOtp";

const Home = lazy(() => import("../Pages/Home"));
const Dashboard = lazy(() => import("../Pages/DashBoard"));
const GetAllBooks = lazy(() => import("../Pages/GetAllBooks"));
const AddBook = lazy(() => import("../Pages/AddBook"));
const UpdateBook = lazy(() => import("./../Pages/UpdateBook"));
const BookDetiles = lazy(() => import("../Pages/BookDetiles"));

const GetAllAuthors = lazy(() => import("../Pages/GetAllAuthors"));
const AddAuthor = lazy(() => import("../Pages/AddAuthor"));
const UpdateAuthor = lazy(() => import("../Pages/UpdateAuthor"));

const AddCategory = lazy(() => import("../Pages/AddCategory"));
const GetAllCategory = lazy(() => import("../Pages/GetAllCategory"));
const DeleteMultiElement = lazy(() => import("../Pages/DeleteMultiElement"));
const StockManagement = lazy(() => import("../Pages/EditeIncreamntal"));
const Profile = lazy(() => import("../Pages/Profile"));
const SearchPage = lazy(() => import("../Pages/Search"));


const AllRequest = lazy(() => import("../Pages/TableOfRequset.js"));
const GetAllCustomer = lazy(() => import("../Pages/AllCustomer.js"));
const AllInvoice = lazy(() => import("../Pages/AllInvoice.js"));
const RequsetOfCustomer = lazy(() => import("./../Pages/RequsetOfCustomer"));
const ItemsDetails = lazy(() => import("../Componants/ItemsDetiles.js"));


const MainPageCustomer = lazy(() => import("./../Customer-page/MainPage"));
const HomePageCustomer = lazy(() => import("../Customer-page/HomePage.js"));
const CustomerProfile = lazy(() => import("../Customer-page/CustomerProfile.js"));
const CustomerSearchPage = lazy(() => import("./../Customer-page/SearchForUesrs"));
const CartPage = lazy(() => import("../Customer-page/CartPage.js"));
const RequestBook = lazy(() => import("../Customer-page/RequestBook.js"));
const MyRequest = lazy(() => import("../Customer-page/MyRequest.js"));
const CustomerInvoices = lazy(() => import("../Customer-page/CustomerInvoice.js"));


const MainEnd = lazy(() => import("../Page-forGust/MainEnd"));
const MainPage = lazy(() => import("./../Page-forGust/MainPage"));
const GuestSearchPage = lazy(() => import("../Page-forGust/SearchForUesrs.js"));

export default function AppRoutes() {
  return (
  
    <Suspense 
      fallback={
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "1.2rem", fontFamily: "sans-serif" }}>
          جاري تحميل الصفحة...
        </div>
      }
    >
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<Home />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="UpdateBook" element={<UpdateBook />} />
            <Route path="GetBooksS" element={<GetAllBooks delet={true} rent={false} />} />
            <Route path="AddBook" element={<AddBook />} />
            <Route path="AddCategory" element={<AddCategory />} />
            <Route path="GetAuthor" element={<GetAllAuthors />} />
            <Route path="AddAuthor" element={<AddAuthor />} />
            <Route path="UpdateAuthor" element={<UpdateAuthor />} />
            <Route path="GetAllCategory" element={<GetAllCategory />} />
            <Route path="DeleteMulti" element={<DeleteMultiElement />} />
            <Route path="Stock" element={<StockManagement />} />
            <Route path="MyProfile" element={<Profile />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="/allRequest" element={<AllRequest />} />
            <Route path="/allCustomer" element={<GetAllCustomer />} />
            <Route path="/invoices" element={<AllInvoice />} />
            <Route path="/requstCustomer/:id" element={<RequsetOfCustomer />} />
            <Route path="/items/:id" element={<ItemsDetails />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
          <Route element={<MainPageCustomer />}>
            <Route path="main" element={<HomePageCustomer />} />
            <Route path="GetBooks" element={<GetAllBooks delet={false} rent={true} />} />
            <Route path="CustomerProfile" element={<CustomerProfile />} />
            <Route path="/searchCustomer" element={<CustomerSearchPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="BookRequest" element={<RequestBook />} />
            <Route path="MyRequest" element={<MyRequest />} />
          </Route>
          <Route path="customerInv/:id" element={<CustomerInvoices />} />
        </Route>

        <Route element={<MainEnd />}>
          <Route path="/HomePage" element={<MainPage />} />
          <Route path="/searchG" element={<GuestSearchPage />} />
          <Route path="GetBook" element={<GetAllBooks delet={false} rent={false} />} />
        </Route>

        <Route path="/BookDetiles/:id" element={<BookDetiles />} />

        <Route path="/" element={<Navigate to="/HomePage" replace />} />
        <Route path="*" element={<Navigate to="/HomePage" replace />} />
      </Routes>
    </Suspense>
  );
}