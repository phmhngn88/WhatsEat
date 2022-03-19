import React from "react";
import "./ProductCard.css";
import { AiFillPlusCircle } from "react-icons/ai";

const ProductCard = ({
  id,
  product_name,
  img_url,
  quantity,
  provider,
  sales_count,
  price,
}) => {
  return (
    <div className="product-card">
      <img src={img_url} alt={product_name} />
      <div className="info">
        <p className="product-name">{product_name}</p>
        <p className="quantity">
          {quantity} | {provider}
        </p>
        <p className="sales-count">{sales_count} mua</p>
        <p className="price">
          {price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </p>
      </div>
      <AiFillPlusCircle className="icon-plus" />
    </div>
  );
};

export default ProductCard;
