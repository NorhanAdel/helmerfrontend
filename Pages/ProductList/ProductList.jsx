 import React, { useEffect, useState } from "react";
 import axios from "axios";
 
 import "./ProductList.scss";
 import { useCart } from "../../context/CartContext";
import ProductCard from "../../Components/ProductCard/ProductCard";

 const ProductList = () => {
   const [products, setProducts] = useState([]);
   const [showInStockOnly, setShowInStockOnly] = useState(false);
   const [sortOrder, setSortOrder] = useState(""); 

   const { addToCart } = useCart();

   const categories = ["موزاريلا", "شيدر", "منتجات ايطالى", "منتجات اخرى"];

   useEffect(() => {
     axios
       .get(`/api/product`)
       .then((res) => setProducts(res.data))
       .catch((err) => console.log(err));
   }, []);

   const scrollToProducts = () => {
     document
       .getElementById("product-section")
       .scrollIntoView({ behavior: "smooth" });
   };

   return (
     <div className="products-page">
     
       <section className="hero-section">
         <div className="overlay">
           <div className="hero-content container">
             <h1>اكتشف تشكيلتنا المميزة من منتجات هيلمر</h1>
             <p>جبن طبيعية 100% بطعم يخلّي كل وصفة أحلى 💛</p>
             <button onClick={scrollToProducts}>اطلب الآن</button>
           </div>
         </div>
       </section>

       <div className="container" id="product-section">
        
         <div className="filter-bar">
           <label>
             <input
               type="checkbox"
               checked={showInStockOnly}
               onChange={(e) => setShowInStockOnly(e.target.checked)}
             />
             عرض المتوفر فقط
           </label>

           <select
             value={sortOrder}
             onChange={(e) => setSortOrder(e.target.value)}
           >
             <option value="">ترتيب حسب السعر</option>
             <option value="asc">من الأقل للأعلى</option>
             <option value="desc">من الأعلى للأقل</option>
           </select>
         </div>

         {categories.map((category) => {
           let filtered = products.filter((p) => p.category === category);

           if (showInStockOnly) {
             filtered = filtered.filter((p) => p.inStock);
           }

           if (sortOrder === "asc") {
             filtered = filtered.sort((a, b) => a.price - b.price);
           } else if (sortOrder === "desc") {
             filtered = filtered.sort((a, b) => b.price - a.price);
           }

           return (
             <div key={category} className="category-section">
               <h2 className="category-title">{category}</h2>
               <div className="product-grid">
                 {filtered.map((product) => (
                   <ProductCard
                     key={product._id}
                     product={product}
                     onAddToCart={(e) => {
                       e.preventDefault();
                       addToCart(product, 1);
                     }}
                   />
                 ))}
               </div>
             </div>
           );
         })}
       </div>
     </div>
   );
 };

 export default ProductList;
