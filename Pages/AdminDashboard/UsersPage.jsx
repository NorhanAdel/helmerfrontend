import React, { useEffect, useState } from "react";
import axios from "axios";
 import "./AdminDashboard.scss";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("helmer_token");

  useEffect(() => {
    axios
      .get("/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.error(err);
        alert("حدث خطأ في جلب المستخدمين");
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
      axios
        .delete(`/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => setUsers(users.filter((u) => u._id !== id)));
    }
  };

  return (
    <div className="admin-users">
      <h2>قائمة المستخدمين</h2>
      <table>
        <thead>
          <tr>
            <th>الاسم</th>
            <th>البريد</th>
            <th>أدمن؟</th>
            <th>تحكم</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.isAdmin ? "✔️" : "❌"}</td>
              <td>
                <button onClick={() => handleDelete(u._id)}>🗑️ حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;
