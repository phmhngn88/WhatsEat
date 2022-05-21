import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderItem.css";

const OrderItem = ({ productId, price }) => {
  const [orderInfo, setOrderInfo] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: `https://localhost:7029/api/Product/${productId}`,
    })
      .then((res) => {
        const result = res.data;
        console.log(result);
        setOrderInfo(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!orderInfo) return <p>Loading</p>;

  return (
    <>
      <div className="order-block">
        <div className="item-info">
          <img
            className="item-img"
            src={orderInfo.images[0][0].url || ""}
            alt={orderInfo.name || "default name"}
          />
          <h3>{orderInfo.name || "default name"}</h3>
        </div>
        <h3 className="price">
          {price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </h3>
      </div>
    </>
  );
};

export default OrderItem;
