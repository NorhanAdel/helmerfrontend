import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditUser.scss";

const EditUser = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    _id: "",
  });

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/profile/me`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("helmer_token")}`,
            },
          }
        );

        setUserData({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
          _id: res.data._id,
        });

        setLoading(false);
      } catch (err) {
        setError("فشل تحميل البيانات");
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      await axios.put(
        `/api/users/${userData._id}`,
        {
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("helmer_token")}`,
          },
        }
      );
      setSuccess("✅ تم تحديث البيانات بنجاح");
    } catch (err) {
      setError("❌ فشل التحديث، حاول مرة أخرى");
    }
  };

  if (loading) return <div className="edit-profile">جاري التحميل...</div>;

  return (
    <div className="edit-profile">
      <h2>تعديل البيانات</h2>
      <form onSubmit={handleSubmit}>
        <label>الاسم:</label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          required
        />

        <label>البريد الإلكتروني:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
        />

        <label>رقم الهاتف:</label>
        <input
          type="text"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
        />

        <button type="submit">حفظ التغييرات</button>
        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default EditUser;
