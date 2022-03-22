import React from "react";

const Product = ({ name, description, basePrice, img_url }) => {
  return (
    <div className="item-container">
      <img src={img_url ? img_url : 'https://image.cooky.vn/posproduct/g0/13852/s400x400/c6f09391-a974-4d05-9c47-d3096aded7c4.jpeg'} alt={name} className="item-img" />
      <h3 className="item-name">{name}</h3>
      <p className="item-quantity">{description}</p>
      <p className="item-price">
        {basePrice.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </p>
    </div>
  );
};

export default Product;
