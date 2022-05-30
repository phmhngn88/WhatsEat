import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ShopOrderItem.css";

const ShopOrderItem = ({ productId, price, value, status }) => {
  console.log(status);
  const [orderInfo, setOrderInfo] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: `https://localhost:7029/api/Product/${productId}`,
    })
      .then((res) => {
        const result = res.data;
        setOrderInfo(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!orderInfo) return <p>Loading</p>;
  return (
    <div className="shop-order-item">
      <div className="order-info">
        <div className="product-info">
          <img
            src={orderInfo.images[0][0].url || ""}
            alt={orderInfo.name || "default name"}
          />
          <span>{orderInfo.name || "default name"}</span>
        </div>
        <p className="total-money">
          {price &&
            price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
        </p>
        <p className="status" style={{ fontWeight: 650 }}>
          {status === "Đã giao"
            ? status
            : status[status.length - 1].orderStatus.orderStatusId === 2
            ? "Chờ xác nhận"
            : status[status.length - 1].orderStatus.orderStatusId === 3
            ? "Đang giao hàng"
            : status[status.length - 1].orderStatus.orderStatusId === 5
            ? "Đã hủy"
            : status[status.length - 1].orderStatus.orderStatusId === 6
            ? "Trả hàng/Hoàn tiền"
            : "Đã giao hàng"}
        </p>
        <p className="delivery">{value}</p>
        <a href="#">Xem chi tiết</a>
      </div>
    </div>
  );
};

export default ShopOrderItem;
