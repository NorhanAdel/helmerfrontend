import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineShoppingCart, AiFillCheckCircle } from "react-icons/ai";
import {
  FaTruck,
  FaRegStar,
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import "./ProductDetails.scss";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [allProducts, setAllProducts] = useState([]);

  const token = localStorage.getItem("helmer_token");

  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/product/${id}`)
      .then((res) => setProduct(res.data));
    axios.get(`${process.env.REACT_APP_API_URL}/api/product`).then((res) => setAllProducts(res.data));
  }, [id]);

  const handleBuyNow = async () => {
    if (!token) return navigate("/login");
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/order/`,
        { productId: product._id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("تم تنفيذ الطلب بنجاح");
      setTimeout(() => navigate("/account/orders"), 2000);
    } catch {
      toast.error("حدث خطأ أثناء تنفيذ الطلب");
    }
  };

  const handleAddToCart = async () => {
    if (!token) return navigate("/login");
    try {
      await axios.post(
        "/api/cart/add",
        { productId: product._id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("تمت إضافة المنتج للسلة");
    } catch (err) {
      toast.error("خطأ أثناء الإضافة للسلة");
    }
  };

  const similarProducts = allProducts.filter(
    (p) => p.category === product?.category && p._id !== product?._id
  );

  if (!product) return <div className="loading">جاري تحميل المنتج...</div>;

  return (
    <div className="product-details container" data-aos="fade-up">
      <div className="top-section">
        <div className="left">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="right">
          <h1>{product.name}</h1>
          <p className="desc">{product.description}</p>
          <p className="price">السعر: {product.price} جنيه</p>
          <p className="size">الحجم: {product.size}</p>
          <p className="category">الفئة: {product.category}</p>
          <p className={`stock ${product.inStock ? "in" : "out"}`}>
            {product.inStock ? "متوفر" : "غير متوفر"}
          </p>

          <div className="quantity">
            <label>الكمية:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          <div className="features-top">
            <div className="feature">
              <FaTruck className="icon" />
              <span>شحن سريع لجميع المحافظات</span>
            </div>
            <div className="feature">
              <AiFillCheckCircle className="icon" />
              <span>جودة مضمونة 100%</span>
            </div>
            <div className="feature">
              <FaRegStar className="icon" />
              <span>آلاف العملاء يثقون بنا</span>
            </div>
          </div>

          <div className="actions">
            <button className="buy" onClick={handleBuyNow}>
              اشترِ الآن
            </button>
            <button className="add" onClick={handleAddToCart}>
              <AiOutlineShoppingCart /> أضف للسلة
            </button>
          </div>

          <div className="share">
            <span>شارك المنتج:</span>
            <a
              href={`https://wa.me/?text=${window.location.href}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp />
            </a>
            <a
              href={`https://facebook.com/sharer/sharer.php?u=${window.location.href}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div className="similar-section" data-aos="fade-up">
          <h2>منتجات مشابهة</h2>
          <div className="similar-grid">
            {similarProducts.map((item) => (
              <div
                key={item._id}
                className="similar-card"
                onClick={() => navigate(`/product/${item._id}`)}
              >
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="all-products-section" data-aos="fade-up">
        <h2>كل منتجاتنا</h2>
        <div className="similar-grid">
          {allProducts.map((item) => (
            <div
              key={item._id}
              className="similar-card"
              onClick={() => navigate(`/product/${item._id}`)}
            >
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default ProductDetails;
