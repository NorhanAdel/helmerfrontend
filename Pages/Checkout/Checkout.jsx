import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Checkout.scss";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const [shippingName, setShippingName] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [shippingGovernorate, setShippingGovernorate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");  
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("helmer_token");

  useEffect(() => {
    if (!token) return navigate("/login");

    axios.get(`${process.env.REACT_APP_API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data && Array.isArray(res.data.items)) {
          setCartItems(res.data.items);
        }
      })
      .catch((err) => console.log(err));
  }, [token, navigate]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleSubmit = async () => {
    try {
      const formattedItems = cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      const res = await axios.post(
        "/api/order",
        {
          products: formattedItems,
          shippingInfo: {
            name: shippingName,
            phone: shippingPhone,
            address,
            governorate: shippingGovernorate,
          },
          totalPrice,
          paymentMethod,   
          notes,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.setItem("lastOrder", JSON.stringify(res.data.order));
      navigate("/order-summary", { state: { order: res.data.order } });
    } catch (err) {
      console.error("Order error:", err?.response?.data || err.message);
      alert("حدث خطأ أثناء تنفيذ الطلب");
    }
  };

  return (
    <div className="checkout-page container">
      <h2>إتمام الطلب</h2>

      <div className="checkout-content">
        <div className="left">
          <h3>المنتجات</h3>
          {cartItems.map((item) => (
            <div className="checkout-item" key={item.product._id}>
              <img src={item.product.image} alt={item.product.name} />
              <div>
                <p>{item.product.name}</p>
                <p>
                  الكمية: {item.quantity} × {item.product.price} ={" "}
                  {item.quantity * item.product.price} جنيه
                </p>
              </div>
            </div>
          ))}

          <div className="form-group">
            <label>اسم المستلم:</label>
            <input
              type="text"
              placeholder="الاسم"
              value={shippingName}
              onChange={(e) => setShippingName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>رقم الهاتف:</label>
            <input
              type="text"
              placeholder="رقم الهاتف"
              value={shippingPhone}
              onChange={(e) => setShippingPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>المحافظة:</label>
            <select
              value={shippingGovernorate}
              onChange={(e) => setShippingGovernorate(e.target.value)}
              required
            >
              <option value="">اختر المحافظة</option>
              <option value="القاهرة">القاهرة</option>
              <option value="الجيزة">الجيزة</option>
              <option value="الإسكندرية">الإسكندرية</option>
              <option value="الدقهلية">الدقهلية</option>
            
            </select>
          </div>

          <div className="form-group">
            <label>العنوان:</label>
            <textarea
              placeholder="اكتب عنوان التوصيل بالتفصيل"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>طريقة الدفع:</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="cod">الدفع عند الاستلام</option>
              <option value="card">بطاقة إلكترونية</option>
            </select>
          </div>

          <div className="form-group">
            <label>ملاحظات:</label>
            <textarea
              placeholder="هل عندك ملاحظات بخصوص الطلب؟"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="right">
          <h3>الملخص</h3>
          <p>عدد المنتجات: {cartItems.length}</p>
          <p className="total">الإجمالي: {totalPrice} جنيه</p>
          <button className="confirm-btn" onClick={handleSubmit}>
            تأكيد الطلب
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
