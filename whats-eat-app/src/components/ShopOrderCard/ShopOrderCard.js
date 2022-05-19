import React, { useState, useEffect } from "react";
import "./ShopOrderCard.css";
import ShopOrderItem from "./ShopOrderItem";

const ShopOrderCard = ({ orderId, customer, orderDetails, paymentMethod }) => {
  return (
    <div className="order-card">
      <div className="order-card-nav">
        <p>Người mua: {customer.name ? customer.name : "Default name"}</p>
        <p>ID đơn hàng: {orderId}</p>
      </div>
      {orderDetails.length > 0 &&
        orderDetails.map((order, idx) => (
          <>
            <ShopOrderItem key={idx} {...order} {...paymentMethod} />
          </>
        ))}
    </div>
  );
};

export default ShopOrderCard;
