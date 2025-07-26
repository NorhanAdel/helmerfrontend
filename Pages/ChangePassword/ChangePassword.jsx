import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ChangePassword.scss"
function ChangePassword() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const token = localStorage.getItem("helmer_token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("/api/users/change-password", form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("✅ تم تغيير كلمة المرور بنجاح");
        setForm({ oldPassword: "", newPassword: "" });
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message || "❌ حدث خطأ أثناء تغيير الباسورد"
        );
      });
  };

  return (
    <div className="change-password-page">
      <h2>تغيير كلمة المرور</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="oldPassword"
          placeholder="كلمة المرور الحالية"
          value={form.oldPassword}
          onChange={handleChange}
        />
        <input
          type="password"
          name="newPassword"
          placeholder="كلمة المرور الجديدة"
          value={form.newPassword}
          onChange={handleChange}
        />
        <button type="submit">تغيير كلمة المرور</button>
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default ChangePassword;
