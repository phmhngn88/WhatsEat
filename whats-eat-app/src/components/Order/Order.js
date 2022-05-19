import React, { useState, useEffect } from "react";
import "./Order.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";

const Order = ({ orderId }) => {
  const [orderInfo, setOrderInfo] = useState();
  const token = useSelector((state) => state.auth.userInfo.token);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://localhost:7029/api/Customer/order/${orderId}`,
      headers: { Authorization: `Bearer ${token}` },
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
    <>
      {orderInfo.orderDetails.length > 0 &&
        orderInfo.orderDetails.map((order, idx) => (
          <div className="order">
            <div className="order-container">
              <h2 className="title">
                {/* {status === 0 ? "Đơn hàng đang xử lý" : "Đơn hàng thành công"} */}
                Đơn hàng thành công
              </h2>
              <OrderItem key={idx} {...order} />
            </div>
          </div>
        ))}
    </>
  );
};

export default Order;
