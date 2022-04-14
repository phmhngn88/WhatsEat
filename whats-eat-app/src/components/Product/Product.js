import React from "react";
import "./Product.css";
import { useSearchParams, useNavigate } from "react-router-dom";

const Product = ({ productId, name, basePrice, weightServing, images }) => {
  // let [searchParams, setSearchParams] = useSearchParams();
  // const idProduct = searchParams.get("id");
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
      <img src={images[1][1].url} alt={name} className="item-img" />
      <h3 className="item-name">{name}</h3>
      <p className="item-quantity">{weightServing}</p>
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
