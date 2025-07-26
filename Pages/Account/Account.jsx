import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Account.scss";
import { AuthContext } from "../../context/AuthContext";

function Account() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="account-page">
      <h2>أهلاً {user?.name || "عميلنا العزيز"} 👋</h2>

      <div className="account-cards">
        <div className="card" onClick={() => navigate("/myorders")}>
          📦 طلباتي
        </div>

        <div className="card" onClick={() => navigate("/account/address")}>
          📍 العناوين
        </div>

        <div className="card" onClick={() => navigate("/changepassword")}>
          🔐 تغيير كلمة المرور
        </div>

        <div
          className="card logout"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          🚪 تسجيل الخروج
        </div>
      </div>
    </div>
  );
}

export default Account;
