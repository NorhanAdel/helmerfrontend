import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.scss";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [activeTab, setActiveTab] = useState("orders");
  const token = localStorage.getItem("helmer_token");

  useEffect(() => {
    if (activeTab === "orders") {
      axios
        .get("/api/order/all", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setOrders(res.data))
        .catch((err) => {
          console.error(err);
          alert("غير مسموح لك أو فشل في تحميل الطلبات");
        });
    }
  }, [token, activeTab]);

  useEffect(() => {
    if (activeTab === "users") {
      axios
        .get("/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUsers(res.data))
        .catch((err) => {
          console.error(err);
          alert("فشل في تحميل المستخدمين");
        });
    }
  }, [activeTab, token]);

  const handleStatusChange = (orderId, newStatus) => {
    axios
      .put(
        `/api/order/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
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
    const matchName = order.shippingInfo?.name
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus = filterStatus ? order.status === filterStatus : true;
    return matchName && matchStatus;
  });

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>لوحة التحكم</h2>
        <ul>
          <li
            className={activeTab === "orders" ? "active" : ""}
            onClick={() => setActiveTab("orders")}
          >
            الطلبات
          </li>
          <li
            className={activeTab === "users" ? "active" : ""}
            onClick={() => setActiveTab("users")}
          >
            المستخدمين
          </li>
          <li
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            تسجيل الخروج
          </li>
        </ul>
      </aside>

      <main className="dashboard-content">
        {activeTab === "orders" && (
          <>
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
                  <th>رقم الهاتف</th>
                  <th>العنوان</th>
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
                    <td>{order.shippingInfo?.name || order.user?.name}</td>
                    <td>{order.shippingInfo?.phone}</td>
                    <td>
                      {order.shippingInfo?.address},{" "}
                      {order.shippingInfo?.governorate}
                    </td>
                    <td>
                      <ul>
                        {order.products?.map((item, i) => (
                          <li key={i}>
                            {item.product?.name || "منتج غير معروف"} ×{" "}
                            {item.quantity}
                          </li>
                        ))}
                      </ul>
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
          </>
        )}

        {activeTab === "users" && (
          <>
            <h2>جميع المستخدمين</h2>
            <table>
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>الإيميل</th>
                  <th>أدمن؟</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "✔️" : "❌"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
