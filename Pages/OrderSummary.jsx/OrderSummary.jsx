import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderSummary.scss";

function OrderSummary() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  if (!order)
    return (
      <div className="order-summary container">
        <p>لا يوجد طلب لعرضه.</p>
      </div>
    );

  const total = order.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="order-summary container">
      <div className="summary-card">
        <h2>✅ تم تأكيد طلبك بنجاح</h2>
        <p className="order-id">رقم الطلب: {order._id}</p>

        <h3>📦 المنتجات:</h3>
        {order.items.map((item, i) => (
          <div key={i} className="order-item">
            <p>
              <strong>{item.product.name}</strong>
            </p>
            <p>
              {item.quantity} × {item.product.price} ={" "}
              {item.quantity * item.product.price} جنيه
            </p>
          </div>
        ))}

        <div className="details">
          <p>
            <strong>العنوان:</strong> {order.address}
          </p>
          <p className={`payment-method ${order.paymentMethod}`}>
            <strong>طريقة الدفع:</strong>{" "}
            {order.paymentMethod === "cod"
              ? "🏠 الدفع عند الاستلام"
              : "💳 بطاقة إلكترونية"}
          </p>
          {order.notes && (
            <p>
              <strong>ملاحظات:</strong> {order.notes}
            </p>
          )}
        </div>

        <h3 className="total">الإجمالي: {total} جنيه</h3>

        <button className="back-btn" onClick={() => navigate("/")}>
          العودة للصفحة الرئيسية
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;
