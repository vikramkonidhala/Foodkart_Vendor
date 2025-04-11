import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Signin from "./components/Signin";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import AddFirm from "./components/AddFirm";
import AddProduct from "./components/AddProduct";
import Products from "./components/Products";
import NotFound from "./components/NotFound";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<ProtectedRoute component={Home} />} />
        <Route
          path="/add-firm"
          element={<ProtectedRoute component={AddFirm} />}
        />
        <Route
          path="/add-product"
          element={<ProtectedRoute component={AddProduct} />}
        />
        <Route
          path="/products"
          element={<ProtectedRoute component={Products} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster
        position="bottom-center"
        reverseOrder={true}
        toastOptions={{
          duration: 2500,
          removeDelay: 1000,
          className: "shadow-2xl border-1 border-gray-200",
        }}
      />
    </>
  );
};

export default App;
