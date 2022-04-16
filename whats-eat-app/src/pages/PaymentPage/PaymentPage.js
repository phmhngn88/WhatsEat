import React, { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import "./PaymentPage.css";
import axios from "axios";
import { Select, message } from "antd";

const { Option } = Select;

const PaymentPage = () => {
  const [deliver, setDeliver] = useState("Giao hàng tiết kiệm");
  const [paymentMethod, setPaymentMethod] = useState(
    "Thanh toán khi nhận hàng"
  );
  const cartItems = useSelector((state) => state.cart.cartItems)
  const token = useSelector((state) => state.auth.userInfo.token)
  const getTotalPrice = (cartItems) => {
    return cartItems.reduce((total,cartItem) => {
          return cartItem.totalPrice + total
      },0);
    }
  const handleChange = (value) => {
    setPaymentMethod(value);
  };

  const carts = cartItems.map((item) => {
    const container = {};
    container.productId = item.productId;
    container.price = item.price;
    container.quantity = item.quantity;
    return container;
  })

  const handleSubmitPayment = () => {
    axios({
      method: "POST",
      url: "https://localhost:7029/api/Customer/order",
      headers: { Authorization: `Bearer ${token}` },
      data: {
        paymentMethodId: 1,
        shippingInfoId: 1,
        productList: carts,
      },
    })
      .then((res) => {
        message.success("Cảm ơn đánh giá của bạn!");
      })
      .catch((err) => {
        message.error("Đánh giá không thành công!");
      });
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
                {cartItems.map((item) => {
                  const { productId, image, productName, quantity, totalPrice, price, weightServing } = item;
                  return (
                    <div className="single-item" key={productId}>
                      <div className="info">
                        <img src={image} alt={productName} />
                        <p style={{ fontSize: "1.2rem" }}>{productName} ({weightServing})</p>
                      </div>
                      <h3>
                        {price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </h3>
                      <h3>{quantity}</h3>
                      <h3>{totalPrice.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}</h3>
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
                  {getTotalPrice(cartItems).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </p>
            </div>
          </div>
          <button className="btn confirm-btn" onClick={handleSubmitPayment}>xác nhận</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
