/*
Submitted By :
  Ajay Shrestha (C0885384)  
  Gaurab Pokharel (C0886046)
  Nirajan Karki (C0885390)
  Sakar Thapa (C0890972)
*/

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Login from "./pages/Login";
import UserDetails from "./pages/UserDetails";
import Error from "./pages/Error";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import SearchProduct from "./pages/SearchProduct";
import AuthLayout from "./pages/AuthLayout";
import AdminDashboard from "./pages/AdminDashboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./features/user/userSlice";
import AddAdmin from "./pages/AddAdmin";
import AdminOrders from "./pages/AdminOrders";
import SearchScreen from "./components/SearchScreen";
import AdminAddProduct from "./pages/AdminAddProduct";
import Checkout from "./pages/Checkout";
import UserOrder from "./pages/UserOrder";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    if (tokenString) {
      dispatch(fetchUser(JSON.parse(tokenString)));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<SingleProduct />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="user" element={<UserDetails />} />
          <Route path="user/orders" element={<UserOrder />} />
          <Route path="search" element={<SearchProduct />} />
          <Route path="/admindashboard" element={<AdminDashboard />}>
            <Route index element={<AddAdmin />} />
            <Route path="our-products" element={<SearchScreen />} />
            <Route path="admin-add-product" element={<AdminAddProduct />} />
            <Route path="admin-orders" element={<AdminOrders />} />
          </Route>

          <Route path="*" element={<Error />} />
        </Route>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
