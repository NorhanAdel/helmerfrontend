import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <h2>هيلمر</h2>
          <p> هيلمر هي شركة رائدة في صناعة منتجات الألبان عالية الجودة </p>
        </div>

        <div className="footer-links">
          <a href="/">الرئيسية</a>
          <a href="/about">من نحن</a>
          <a href="/products">المنتجات</a>
          <a href="/contact">تواصل معنا</a>
        </div>

        <div className="footer-social">
          <a
            href="https://www.facebook.com/profile.php?id=61563475536899"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <a href="https://wa.me/201234567890" target="_blank" rel="noreferrer">
            <FaWhatsapp />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} . جميع الحقوق محفوظة.هيلمر</p>
      </div>
    </footer>
  );
};

export default Footer;
