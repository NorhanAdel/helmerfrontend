import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { navLink } from "../../Constants/nav";
import cartIcon from "../../Assets/cart_icon.png";
import { AuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useCart();
  const isAdmin = user?.isAdmin;  

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="site-header">
      <div className="container">
        <div className="logo">
          <h1>
            <Link to="/">هيلمر</Link>
          </h1>
        </div>

        <nav className="nav-links">
          {navLink.map((item, i) => (
            <Link to={item.link} key={i}>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="login">
          {user ? (
            <div className="user-dropdown" ref={dropdownRef}>
              <div
                className="avatar"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user.name?.charAt(0).toUpperCase()}
              </div>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/account">حسابي</Link>
                  <button onClick={handleLogout}>تسجيل الخروج</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button>تسجيل دخول</button>
            </Link>
          )}
 
          {isAdmin ? (
            <Link to="/admin" className="admin-link">
              لوحة التحكم
            </Link>
          ) : (
            <Link to="/cart" className="cart-link">
              <img src={cartIcon} alt="cart" />
              <div className="count">{cartItems.length}</div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;