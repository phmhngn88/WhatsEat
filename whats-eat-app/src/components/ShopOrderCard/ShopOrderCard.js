import React from "react";
import "./ShopOrderCard.css";

const ShopOrderCard = ({ props }) => {
  const { order_ID, username, item_name, item_img, total, delivery, status } =
    props;
  return (
    <div className="order-card">
      <div className="order-card-nav">
        <p>Người mua: {username}</p>
        <p>ID đơn hàng: {order_ID}</p>
      </div>
      <div className="order-info">
        <div className="product-info">
          <img src={item_img} alt={item_name} />
          <span>{item_name}</span>
        </div>
        <p className="total-money">
          {total.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </p>
        <p className="status" style={{ fontWeight: 650 }}>
          {status}
        </p>
        <p className="delivery">{delivery}</p>
        <div className="accept">
        {
        status === "Chờ xác nhận" ? (
          <button className="btn accept-btn">Xác nhận</button>
          ):(
            <></>
          )
        }
        </div>
        </div>
        <div className="cancel">
        {((status === "Chờ xác nhận")||(status ==="Chờ lấy hàng")) ? (
              <button className="btn cancel-btn">Hủy đơn</button>
          ):(
            <></>
          )
        }
        </div>
        <div className="more-info">
          <a href="#">Xem chi tiết</a>
        </div>
    </div>
  );
};

export default ShopOrderCard;
