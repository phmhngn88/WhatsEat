import React from "react";
import "./Order.css";
import { Link } from "react-router-dom";

const Order = ({ props }) => {
  const { id, img_url, item_name, price, status } = props;
  return (
    <div className="order">
      <div className="order-container">
        <h2 className="title">
          {status === 0 ? "Đơn hàng đang xử lý" : "Đơn hàng thành công"}
        </h2>

        <div className="order-block">
          <div className="item-info">
            <img className="item-img" src={img_url} alt={item_name} />
            <h3>{item_name}</h3>
          </div>
          <h3 className="price">
            {price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </h3>
        </div>
        <div className="total">
          <p>
            Tổng số tiền:{" "}
            {price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </div>
        <div className="cancel-block">
          <Link to={`/orders/${id}`}>Xem chi tiết...</Link>
          {status === 0 ? (
            <button className="btn cancel-btn">Hủy đơn hàng</button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
