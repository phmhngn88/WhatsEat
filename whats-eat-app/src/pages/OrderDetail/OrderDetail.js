import { message, Rate, Timeline } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import "./OrderDetail.css";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [rateValue, setRateValue] = useState(5);
  const [comment, setComment] = useState("");
  const token = useSelector((state) => state.auth.userInfo.token);

  const getOrder = () => {
    axios({
      method: "get",
      url: `https://localhost:7029/api/Customer/order/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        const result = res.data;
        console.log(result);
        setOrder(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmitRating = (id) => {
    axios({
      method: "POST",
      url: "https://localhost:7029/api/Product/review",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      data: {
        productId: id,
        rating: rateValue,
        comment: comment,
      },
    })
      .then((res) => {
        message.success("Cảm ơn đánh giá của bạn!");
      })
      .catch((err) => {
        message.error("Đánh giá không thành công!");
      });
  };
  useEffect(() => {
    getOrder();
  }, []);
  return (
    <div className="order-detail">
      <div className="order-detail-fluid">
        <div className="order-detail-container">
          <h1 className="title" style={{ fontWeight: "650" }}>
            Chi tiết đơn hàng
          </h1>
          <div className="order-info">
            <div className="address-and-status">
              <div className="address">
                <h2>Địa Chỉ Nhận Hàng</h2>
                <p className="customer-name">Trần Nhật Hiệp</p>
                <p className="phone-number">0984523175</p>
                <p className="address">
                  16 Nguyễn Trường Tộ, Phường 13, Quận 4, TP HCM
                </p>
              </div>
              <div className="status">
                <p className="order-id">Mã đơn hàng: abcxyz</p>
                <Timeline>
                  <Timeline.Item>Giao hàng thành công</Timeline.Item>
                  <Timeline.Item>Đang vận chuyển</Timeline.Item>
                  <Timeline.Item>Đang chuẩn bị hàng</Timeline.Item>
                  <Timeline.Item>Chờ xác nhận</Timeline.Item>
                </Timeline>
              </div>
            </div>
            <div className="detail">
              <div className="item-info">
                <div className="shop-name">
                  {mock_order.shop_name}{" "}
                  <Link to="/viewshop">{`Xem shop >`}</Link>
                </div>
                <div className="intro">
                  <img src={mock_order.img_url} alt="whatseat" />
                  <div>
                    <p className="item-name">{mock_order.item_name}</p>
                    <p className="quantity">{mock_order.quantity}</p>
                  </div>
                </div>
                <div>
                  <div className="label">
                    <p>Tổng tiền hàng</p>
                    <p>Phí vận chuyển</p>
                    <p>Tổng số tiền</p>
                  </div>
                  <div className="value">
                    <p>
                      {mock_order.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                    <p>
                      {mock_order.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                    <p>
                      {mock_order.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-info-block"></div>
            </div>
          </div>
          <div className="rate-area">
            <h2 style={{ fontWeight: "650" }}>Đánh giá đơn hàng của bạn</h2>
            <div className="rate-container">
              <Rate
                className="stars"
                onChange={(value) => setRateValue(value)}
                value={rateValue}
              />
              <div className="comment-area">
                <textarea
                  cols="30"
                  rows="10"
                  placeholder="Viết bình luận..."
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <button
                className="btn submit-btn"
                onClick={() => handleSubmitRating(id)}
              >
                Đánh giá
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetail;

const mock_order = {
  id: 0,
  shop_name: "DONAFARM",
  item_name: "Gà Ta Bình Định Thả Vườn",
  img_url:
    "https://image.cooky.vn/posproduct/g0/6997/s/8f099d38-a334-4315-8be3-5c4a3ead7ee2.jpeg",
  price: 169000,
  quantity: "500g",
  status: 0,
};
