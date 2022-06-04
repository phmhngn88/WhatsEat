import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./ShopOrderItem.css";
import { useLocation } from "react-router-dom";

const ShopOrderItem = ({ productId, price, value, status, id }) => {
  const [orderInfo, setOrderInfo] = useState();
  const location = useLocation();
  const { storeId } = location.state;
  const token = useSelector((state) => state.auth.userInfo.token);

  const handleAcceptOrder = () => {
    console.log(id);
    axios({
      method: "post",
      url: `https://localhost:7029/api/Store/${storeId}/orders/accept`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        orderId: id,
        message: ".",
      },
    })
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancelOrder = () => {
    axios({
      method: "post",
      url: `https://localhost:7029/api/Store/${storeId}/orders/cancel`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        orderId: id,
        message: ".",
      },
    })
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  };

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

        {/* <a href="#">Xem chi tiết</a> */}
        {status !== "Đã giao" &&
          status[status.length - 1].orderStatus.orderStatusId === 2 && (
            <button onClick={handleAcceptOrder}>Chấp nhận</button>
          )}

        {status !== "Đã giao" &&
          status[status.length - 1].orderStatus.orderStatusId === 2 && (
            <button onClick={handleCancelOrder}>Hủy đơn</button>
          )}

        {/* <a href="#">Hủy đơn</a> */}
      </div>
    </div>
  );
};

export default ShopOrderItem;
