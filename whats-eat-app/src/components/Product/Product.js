import React from "react";
import { useSearchParams } from "react-router-dom";

const Product = ({ item_name, weight, price, img_url }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const idProduct = searchParams.get("id");

  return (
    <div className="item-container">
      <img src={img_url} alt={item_name} className="item-img" />
      <h3 className="item-name">{item_name}</h3>
      <p className="item-quantity">{weight}</p>
      <p className="item-price">
        {price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </p>
    </div>
  );
};

export default Product;
