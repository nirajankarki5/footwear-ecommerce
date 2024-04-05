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
          <Route path="user" element={<UserDetails />} />
          <Route path="search" element={<SearchProduct />} />
          <Route path="/admindashboard" element={<AdminDashboard />}>
            <Route path="add-admin" element={<AddAdmin />} />
            <Route path="our-products" element={<SearchScreen />} />
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
