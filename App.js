import { useContext } from "react";
import "./App.css";
import Home from "./Pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Footer from "./Container/Footer/Footer";
import Header from "./Container/Header/Header";
import Register from "./Pages/Auth/Register";
import Cart from "./Pages/Cart/Cart";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Checkout from "./Pages/Checkout/Checkout";
import OrderSummary from "./Pages/OrderSummary.jsx/OrderSummary";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import OrdersPage from "./Pages/AdminDashboard/OrdersPage";
import UsersPage from "./Pages/AdminDashboard/UsersPage";
import ContactPage from "./Pages/Contact/Contact";
import ProductList from "./Pages/ProductList/ProductList";
import Login from "./Pages/Auth/Login";
import OffersPage from "./Pages/OffersPage/OffersPage.jsx";
import Account from "./Pages/Account/Account";
import MyOrders from "./Pages/MyOrders/MyOrders";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import EditUser from "./Pages/EditUser/EditUser"
function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        {user?.isAdmin && (
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="orders" element={<OrdersPage />} />
            <Route path="users" element={<UsersPage />} />
          </Route>
        )}
        {!user?.isAdmin && (
          <Route path="/admin/*" element={<Navigate to="/" />} />
        )}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product" element={<ProductList />} />
        <Route path="/offer" element={<OffersPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/myorders" element={<MyOrders />} />

        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/edituser" element={<EditUser />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
