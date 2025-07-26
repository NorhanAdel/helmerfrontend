import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.scss";
import { AuthContext } from "../../context/AuthContext";
import GoogleLoginBtn from "../../Components/GoogleLoginBtn/GoogleLoginBtn";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", { email, password });

      login(res.data.token);
      navigate("/");
    } catch (err) {
      alert("فشل تسجيل الدخول");
    }
  };

  return (
    <div className="auth-form">
      <h2>تسجيل الدخول</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">دخول</button>
      </form>

      <p className="or-text">أو سجّل باستخدام:</p>
      <GoogleLoginBtn />
      <p className="auth-switch">
        ليس لديك حساب؟ <Link to="/register">سجّل الآن</Link>
      </p>
    </div>
  );
}

export default Login;
