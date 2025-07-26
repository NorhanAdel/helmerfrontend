import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OffersPage.scss";

const OffersPage = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/offers`).then((res) => setOffers(res.data));
  }, []);

  return (
    <div className="offers-page">
      <div className="hero">
        <h1>عروض هيلمر</h1>
        <p>استمتع بأقوى الخصومات لفترة محدودة 🎉</p>
      </div>

      <div className="offers-grid">
        {offers.map((offer) => (
          <div className="offer-card" key={offer._id}>
            <img src={offer.image} alt={offer.name} />
            <h3>{offer.name}</h3>
            <p>{offer.description}</p>
            <div className="price">
              <span className="old">{offer.oldPrice} ج</span>
              <span className="new">{offer.newPrice} ج</span>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersPage;
