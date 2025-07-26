import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyOrders.scss";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("helmer_token");

  useEffect(() => {
    axios
      .get("/api/order/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">جارٍ تحميل الطلبات...</div>;

  if (orders.length === 0)
    return <div className="no-orders">لا يوجد طلبات لعرضها.</div>;

  return (
    <div className="my-orders container">
      <h2>طلباتي</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h4>رقم الطلب: {order._id}</h4>
            <p>
              🧾 <strong>الإجمالي:</strong> {order.totalPrice} جنيه
            </p>
            <p>
              🚚 <strong>الحالة:</strong> {order.status}
            </p>
            <p>
              🕐 <strong>تاريخ الإنشاء:</strong>{" "}
              {new Date(order.createdAt).toLocaleString("ar-EG")}
            </p>
            <h5>📦 المنتجات:</h5>
            <ul>
              {order.products.map((item, index) => (
                <li key={index}>
                  {item.product?.name} × {item.quantity}
                </li>
              ))}
            </ul>
            <p>
              📍 <strong>العنوان:</strong> {order.shippingInfo?.address}
            </p>
            <p>
              ☎️ <strong>رقم الهاتف:</strong> {order.shippingInfo?.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
