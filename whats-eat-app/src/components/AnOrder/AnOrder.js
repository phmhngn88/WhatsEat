import React from "react";
import "./AnOrder.css";

const AnOrder = ({ props }) => {
  console.log(props);
  const { id, img_url, item_name, price, status } = props;
  return (
    <div className="order">
      <div className="order-container">
        <h2 className="title">
          {status === 1 ? "Sản phẩm" : "Sản phẩm trong đơn hàng"}
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
      </div>
    </div>
  );
};

export default AnOrder;
