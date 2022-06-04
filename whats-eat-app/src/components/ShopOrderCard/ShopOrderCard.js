import React, { useState, useEffect } from "react";
import "./ShopOrderCard.css";
import ShopOrderItem from "./ShopOrderItem";

const ShopOrderCard = ({
  orderId,
  customer,
  orderDetails,
  paymentMethod,
  orderStatusHistories,
}) => {
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
    </div>
  );
};

export default ShopOrderCard;
