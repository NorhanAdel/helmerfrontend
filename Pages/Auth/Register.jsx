import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import "./Auth.scss";
import GoogleLoginBtn from "../../Components/GoogleLoginBtn/GoogleLoginBtn";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("helmer_token", res.data.token);
      navigate("/");
    } catch (err) {
      alert("فشل إنشاء الحساب");
    }
  };

  return (
    <div className="auth-form">
      <h2>تسجيل حساب جديد</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="الاسم"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">تسجيل</button>
      </form>

      <p className="or-text">أو سجّل باستخدام:</p>
      <GoogleLoginBtn />
      <p className="auth-switch">
        لديك حساب بالفعل؟ <Link to="/login">تسجيل الدخول</Link>
      </p>
    </div>
  );
}

export default Register;
