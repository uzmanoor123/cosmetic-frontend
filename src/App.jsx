import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/protectedRoutes";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
         <Route path="/admin" element={<AdminDashboard />} />
         <Route path="/admin/add-product" element={<AddProduct />} />
         <Route path="/admin/edit-product/:id" element={<AddProduct />} />
          <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;