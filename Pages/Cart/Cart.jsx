import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.scss";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("helmer_token");

  useEffect(() => {
    if (!token) return navigate("/login");

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data && Array.isArray(res.data.items)) {
          setCartItems(res.data.items);
        } else {
          setCartItems([]);
        }
      })
      .catch((err) => console.log(err));
  }, [token, navigate]);

  const handleRemove = async (productId) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/cart/${productId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setCartItems(cartItems.filter((item) => item.product._id !== productId));
    toast("تم حذف المنتج من السلة");
  };

  const handleQuantityChange = async (productId, newQty) => {
    if (newQty < 1) return;

    await axios.put(`${process.env.REACT_APP_API_URL}/api/cart/${productId}`,
      { quantity: newQty },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setCartItems(
      cartItems.map((item) =>
        item.product._id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart-page container">
      <h2>سلة التسوق</h2>

      <div className="cart-layout">
        <div className="cart-left">
          {cartItems.map((item) => (
            <div className="cart-product" key={item.product._id}>
              <img src={item.product.image} alt={item.product.name} />
              <div className="cart-info">
                <h4>{item.product.name}</h4>
                <p className="desc">{item.product.description}</p>
                <div className="price-qty">
                  <p className="price">السعر: {item.product.price} جنيه</p>
                  <p className="quantity">الكمية: {item.quantity}</p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.product._id)}
                >
                  إزالة
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>ملخص الطلب</h3>
          <p>عدد المنتجات: {cartItems.length}</p>
          <p className="total-price">الإجمالي: {totalPrice} جنيه</p>
          <p className="shipping-note">🚚 شحن مجاني للطلبات فوق 500 جنيه</p>
          <p className="cod-note">💵 الدفع عند الاستلام متاح</p>

          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            إتمام الشراء
          </button>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
}

export default Cart;
