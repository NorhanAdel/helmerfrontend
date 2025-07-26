import React, { useEffect, useState } from "react";
import axios from "axios";
 import "./AdminDashboard.scss";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const token = localStorage.getItem("helmer_token");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/order/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => {
        console.error(err);
        alert("غير مصرح لك أو فشل في تحميل البيانات");
      });
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/order/${orderId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      });
  };

  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const filteredOrders = orders.filter((order) => {
    const matchName = order.user?.name
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus = filterStatus ? order.status === filterStatus : true;
    return matchName && matchStatus;
  });

  return (
    <div className="admin-orders">
      <h2>جميع الطلبات</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="ابحث باسم العميل..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">كل الحالات</option>
          {[
            "قيد الانتظار",
            "تم التأكيد",
            "جاري التوصيل",
            "تم التوصيل",
            "تم الإلغاء",
          ].map((status, i) => (
            <option key={i} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="status-counts">
        {Object.entries(statusCounts).map(([status, count]) => (
          <span key={status}>
            {status}: {count}
          </span>
        ))}
      </div>

      <table>
        <thead>
          <tr>
            <th>رقم الطلب</th>
            <th>العميل</th>
            <th>المنتجات</th>
            <th>الإجمالي</th>
            <th>الحالة</th>
            <th>تغيير الحالة</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user?.name || "غير معروف"}</td>
              <td>
                {order.products?.map((item, i) => (
                  <div key={i}>
                    {item.product?.name} × {item.quantity}
                  </div>
                ))}
              </td>
              <td>{order.totalPrice} ج</td>
              <td>{order.status}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  {[
                    "قيد الانتظار",
                    "تم التأكيد",
                    "جاري التوصيل",
                    "تم التوصيل",
                    "تم الإلغاء",
                  ].map((status, i) => (
                    <option key={i} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersPage;
