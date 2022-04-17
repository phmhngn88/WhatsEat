import React from "react";
import "./Product.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";

const Product = ({ productId, name, basePrice, weightServing, images }) => {
  const navigate = useNavigate();

  return (
    <div
      className="item-container"
      onClick={() =>
        navigate(`/singleproduct/${productId}`, {
          state: {
            productId: productId,
          },
        })
      }
    >
      {images.length !== 0 && images[0].length !== 0 && (
        <img
          src={images[0][0].url ? images[0][0].url : ""}
          alt={name}
          className="item-img"
        />
      )}
      <h3 className="item-name">{name}</h3>
      <p className="item-quantity">{weightServing}</p>
      <p className="item-price">
        {basePrice?.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </p>
      <BsCartPlus className="icon" />
    </div>
  );
};

export default Product;
