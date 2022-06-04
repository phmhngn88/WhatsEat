import { message, Rate, Timeline } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CusOrderItem from "./CusOrderItem";
import Footer from "../../components/Footer/Footer";
import "./OrderDetail.css";

const CusOrderDetail = () => {
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

  let total = 0;
  if (!order) return <p>Loading</p>;
  else {
    if (order.orderDetails !== null) {
      order.orderDetails &&
        order.orderDetails.map((item) => (total += item.price));
    }
  }

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
                <p className="phone-number">
                  {order.shippingInfo
                    ? order.shippingInfo.phoneNumber
                    : "0984523175"}
                </p>
                <p className="address">
                  {order.shippingInfo
                    ? order.shippingInfo.address
                    : "Default address"}
                </p>
              </div>
              <div className="status">
                <p className="order-id">Mã đơn hàng: {order.orderId}</p>
                <Timeline>
                  {order.orderStatusHistories &&
                    order.orderStatusHistories.map((status) => {
                      switch (status.orderStatus.orderStatusId) {
                        case 1:
                          return <Timeline.Item>Đã thanh toán</Timeline.Item>;
                          break;
                        case 2:
                          return <Timeline.Item>Chờ xác nhận</Timeline.Item>;
                          break;
                        case 3:
                          return <Timeline.Item>Đang giao hàng</Timeline.Item>;
                          break;
                        case 4:
                          return <Timeline.Item>Đã giao hàng</Timeline.Item>;
                          break;
                        case 5:
                          return <Timeline.Item>Đơn hủy</Timeline.Item>;
                          break;

                        default:
                          return <></>;
                      }
                    })}
                </Timeline>
              </div>
            </div>
            <div className="detail">
              <div className="item-info">
                {order.orderDetails.length > 0 &&
                  order.orderDetails.map((item, idx) => (
                    <CusOrderItem key={idx} {...item} />
                  ))}
                <div className="payment-info">
                  <div className="label">
                    <p>Tổng tiền hàng</p>
                    <p>Phí vận chuyển</p>
                    <p>Tổng số tiền</p>
                  </div>
                  <div className="value">
                    <p>
                      {total.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                    <p>
                      {(30000).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                    <p>
                      {(total + 30000).toLocaleString("vi-VN", {
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

export default CusOrderDetail;

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
