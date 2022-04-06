import React, { useState, useEffect } from "react";
import "./OrderDetail.css";

import axios from "axios";
import { message, Rate } from "antd";
import "antd/dist/antd.css";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [rateValue, setRateValue] = useState(5);
  const [comment, setComment] = useState("");

  const getOrder = () => {
    axios({
      method: "get",
      url: `https://localhost:7029/api/Customer/order/${id}`,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
      <Navbar />
      <div className="order-detail-fluid">
        <div className="order-detail-container">
          <h1 className="title" style={{ fontWeight: "650" }}>
            Chi tiết đơn hàng
          </h1>
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
