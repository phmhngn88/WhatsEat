import React, { useState, useEffect } from "react";
import "./Order.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OrderItem from "./OrderItem";

const Order = ({ orderId, orderStatusHistories }) => {
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

  let total = 0;
  if (!orderInfo) return <p>Loading</p>;
  else {
    if (orderInfo.orderDetails !== null) {
      orderInfo.orderDetails &&
        orderInfo.orderDetails.map((item) => (total += item.price));
    }
  }

  return (
    <>
      <div className="order">
        <div className="order-container">
          <h2 className="title">
            {/* {status === 0 ? "Đơn hàng đang xử lý" : "Đơn hàng thành công"} */}
            Đơn hàng: {orderId}
          </h2>
          {orderInfo.orderDetails.length > 0 &&
            orderInfo.orderDetails.map((order, idx) => (
              <OrderItem key={idx} {...order} />
            ))}

          <div className="cancel-block">
            <Link to={`/orders/${orderId}`}>Xem chi tiết...</Link>
            <p>
              Trạng thái đơn hàng:{" "}
              <strong>
                {orderStatusHistories.length > 0
                  ? orderStatusHistories[orderStatusHistories.length - 1]
                      .orderStatus.value === "waiting"
                    ? "Chờ xác nhận"
                    : orderStatusHistories[orderStatusHistories.length - 1]
                        .orderStatus.value === "delivering"
                    ? "Đang giao hàng"
                    : orderStatusHistories[orderStatusHistories.length - 1]
                        .orderStatus.value === "delivered"
                    ? "Đã giao hàng"
                    : orderStatusHistories[orderStatusHistories.length - 1]
                        .orderStatus.value === "canceled"
                    ? "Đã hủy"
                    : "Đã giao hàng"
                  : "Đã giao"}
              </strong>
            </p>

            {/* {status === 0 ? (
          <button className="btn cancel-btn">Hủy đơn hàng</button>
        ) : (
          <></>
        )} */}
          </div>

          <div className="total">
            <p>
              Tổng số tiền:{" "}
              {(total + orderInfo.shippingFee).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
