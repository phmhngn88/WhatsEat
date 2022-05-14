import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../components/Footer/Footer";
import "./PaymentPage.css";
import axios from "axios";
import { Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../reducers/cart";

const { Option } = Select;

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deliver, setDeliver] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(1);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.auth.userInfo.token);
  const getTotalPrice = (cartItems) => {
    return cartItems.reduce((total, cartItem) => {
      return cartItem.totalPrice + total;
    }, 0);
  };

  const carts = cartItems.map((item) => {
    const container = {};
    container.productId = item.productId;
    container.quantity = item.quantity;
    return container;
  });

  const handleConfirm = () => {
    axios({
      method: "POST",
      url: "https://localhost:7029/api/Customer/order",
      headers: { Authorization: `Bearer ${token}` },
      data: {
        paymentMethodId: paymentMethod,
        shippingInfoId: deliver,
        productList: carts,
      },
    })
      .then((res) => {
        dispatch(clearCart());
        navigate(`/payment/success`);
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
                  const {
                    productId,
                    image,
                    productName,
                    quantity,
                    totalPrice,
                    price,
                    weightServing,
                  } = item;
                  return (
                    <div className="single-item" key={productId}>
                      <div className="info">
                        <img src={image} alt={productName} />
                        <p style={{ fontSize: "1.2rem" }}>
                          {productName} ({weightServing})
                        </p>
                      </div>
                      <h3>
                        {price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </h3>
                      <h3>{quantity}</h3>
                      <h3>
                        {totalPrice.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </h3>
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
                <div className="title">
                  Đơn vị vận chuyển:
                  <Select
                    labelInValue
                    defaultValue={{ value: 1 }}
                    onChange={(value) => setDeliver(value.value)}
                    bordered={false}
                  >
                    <Option value={1}>Giao hàng nhanh</Option>
                    <Option value={2}>Giao hàng tiết kiệm</Option>
                  </Select>
                </div>
              </div>
            </div>
            <div className="payment-method-box">
              <div className="title">
                Hình thức thanh toán:{" "}
                <Select
                  labelInValue
                  defaultValue={{ value: 1 }}
                  onChange={(value) => {
                    console.log(value);
                    setPaymentMethod(value.value);
                  }}
                  bordered={false}
                >
                  <Option value={1}>Thanh toán khi nhận hàng</Option>
                  <Option value={2}>Thanh toán trả trước</Option>
                </Select>
              </div>
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
          <button className="btn confirm-btn" onClick={handleConfirm}>
            xác nhận
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
