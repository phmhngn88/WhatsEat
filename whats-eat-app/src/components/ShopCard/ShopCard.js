import React from "react";
import Product from "../Product/Product";
import "./ShopCard.css";

const ShopCard = ({ id, shopName, avtUrl, ratingAvg, totalRate, products }) => {
  return (
    <div className="shop-card">
      <div className="shop-info-area">
        <img className="avt" src={avtUrl} alt="whatseat" />
        <div className="info">
          <p className="shop-name">{shopName}</p>
          <p className="rating">{`${ratingAvg} (${totalRate})`}</p>
        </div>
      </div>
      <div className="top-products">
        {products.map((item, idx) => (
          <Product {...item} />
        ))}
      </div>
    </div>
  );
};

export default ShopCard;
