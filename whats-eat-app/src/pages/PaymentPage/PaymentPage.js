import React, { useState } from "react";
import Footer from "../../components/Footer/Footer";
import "./PaymentPage.css";

import { Select } from "antd";

const { Option } = Select;

const items = [
  {
    id: 0,
    item_name: "Gà Ta Bình Định Thả Vườn",
    img_url:
      "https://image.cooky.vn/posproduct/g0/6997/s/8f099d38-a334-4315-8be3-5c4a3ead7ee2.jpeg",
    price: 169000,
    quantity: "500g",
  },
  {
    id: 1,
    item_name: "Classic Romance Set",
    img_url:
      "https://image.cooky.vn/posproduct/g0/14322/s/587a187b-069d-479d-87b7-3d5299cd5382.jpeg",
    price: 159000,
    quantity: "1",
  },
  {
    id: 2,
    item_name: "Thăn Lưng Bò Canada (Ribeye) Cắt Hotpot",
    img_url:
      "https://image.cooky.vn/posproduct/g0/15513/s400x400/66572bb6-d1ea-4221-a523-d33289117088.jpeg",
    price: 119000,
    quantity: "500g",
  },
];

const PaymentPage = () => {
  const [deliver, setDeliver] = useState("Giao hàng tiết kiệm");
  const [paymentMethod, setPaymentMethod] = useState(
    "Thanh toán khi nhận hàng"
  );
  const [totalPayment, setTotalPayment] = useState(90000);

  const handleChange = (value) => {
    setPaymentMethod(value);
  };
  return (
    <div className="payment">
      <div className="payment-fluid">
        <div className="payment-container">
          <h1 className="hero" style={{ fontWeight: "650" }}>
            Thanh toán đơn hàng
          </h1>
          <div className="address-block">
            <p className="title">Địa chỉ giao hàng</p>
            <div className="info-block">
              <div>
                <p className="username">Trần Nhật Hiệp</p>
                <p className="phone">0984523175</p>
                <p className="address">113/4 đường số 8, Linh Trung, Thủ Đức</p>
              </div>
              <a href="#">thay đổi</a>
            </div>
          </div>
          <div className="products-block">
            <div className="products-box">
              <div className="title">
                <div className="product">Sản phẩm</div>
                <div className="price">Đơn giá</div>
                <div className="quantity">Số lượng/Khối lượng</div>
                <div className="total">Thành tiền</div>
              </div>
              <div className="product-detail">
                {items.map((item) => {
                  const { id, img_url, item_name, quantity, price } = item;
                  return (
                    <div className="single-item" key={id}>
                      <div className="info">
                        <img src={img_url} alt={item_name} />
                        <p style={{ fontSize: "1.2rem" }}>{item_name}</p>
                      </div>
                      <h3>
                        {price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </h3>
                      <h3>{quantity}</h3>
                      <h3>000</h3>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="message-box">
              <div className="message">
                <p>Lời nhắn:</p>
                <input type="text" placeholder="Nhập lời nhắn..." />
              </div>
              <div className="deliver">
                <p className="title">Đơn vị vận chuyển:</p>
                <p className="deli-unit">Giao hàng tiết kiệm</p>
              </div>
            </div>
            <div className="payment-method-box">
              <p className="title">
                Hình thức thanh toán:{" "}
                <Select
                  labelInValue
                  defaultValue={{ value: "Thanh toán khi nhận hàng" }}
                  onChange={handleChange}
                  bordered={false}
                >
                  <Option value="Thanh toán khi nhận hàng">
                    Thanh toán khi nhận hàng
                  </Option>
                  <Option value="Thanh toán trả trước">
                    Thanh toán trả trước
                  </Option>
                </Select>
              </p>
            </div>
            <div className="total-box">
              <p className="total-payment">
                Tổng tiền:{" "}
                <span>
                  {totalPayment.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </p>
            </div>
          </div>
          <button className="btn confirm-btn">xác nhận</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
