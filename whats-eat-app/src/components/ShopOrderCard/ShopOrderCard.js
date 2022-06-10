import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "./ShopOrderCard.css";
import ShopOrderItem from "./ShopOrderItem";

const ShopOrderCard = ({
  orderId,
  customer,
  orderDetails,
  paymentMethod,
  orderStatusHistories,
}) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const token = useSelector((state) => state.auth.userInfo.token);
  const location = useLocation();
  const { storeId } = location.state;

  const handleAcceptOrder = () => {
    axios({
      method: "post",
      url: `https://localhost:7029/api/Store/${storeId}/orders/accept`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        orderId: orderId,
        message: ".",
      },
    })
      .then((res) => {
        setIsAccepted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCompleteOrder = () => {
    axios({
      method: "post",
      url: `https://localhost:7029/api/Store/${storeId}/orders/complete`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        orderId: orderId,
        message: ".",
      },
    })
      .then((res) => {
        setIsComplete(true);
      })
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
        orderId: orderId,
        message: ".",
      },
    })
      .then((res) => {
        setIsCanceled(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="order-card">
      <div className="order-card-nav">
        <p>Người mua: {customer.name ? customer.name : "Default name"}</p>
        <p>ID đơn hàng: {orderId}</p>
      </div>
      {orderDetails.length > 0 &&
        orderDetails.map((order, idx) => (
          <>
            <ShopOrderItem
              key={idx}
              {...order}
              {...paymentMethod}
              id={orderId}
              status={
                orderStatusHistories.length > 0
                  ? orderStatusHistories
                  : "Đã giao"
              }
            />
          </>
        ))}
      {orderStatusHistories.length > 0 &&
        orderStatusHistories[orderStatusHistories.length - 1].orderStatus
          .value === "waiting" && (
          <button onClick={handleAcceptOrder}>
            {isAccepted ? "Đã nhận đơn" : "Chấp nhận"}
          </button>
        )}

      {orderStatusHistories.length > 0 &&
        orderStatusHistories[orderStatusHistories.length - 1].orderStatus
          .value === "delivering" && (
          <button onClick={handleCompleteOrder}>
            {isComplete ? "Đã giao hàng" : "Giao hàng"}
          </button>
        )}

      {orderStatusHistories.length > 0 &&
        orderStatusHistories[orderStatusHistories.length - 1].orderStatus
          .value === "waiting" && (
          <button onClick={handleCancelOrder}>
            {isCanceled ? "Đã hủy đơn" : "Hủy đơn"}
          </button>
        )}
    </div>
  );
};

export default ShopOrderCard;
