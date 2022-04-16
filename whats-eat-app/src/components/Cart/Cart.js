import { Button, Checkbox } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Counter from "../../components/Counter/Counter";
import Footer from "../../components/Footer/Footer";
import TopItems from "../../components/TopItems/TopItems";
import CartItem from "../CartItem/CartItem";
import "./Cart.css";

const Cart = ({
  cartItems,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  clearCart,
}) => {
  return (
    <div className="cart">
      {cartItems.length === 0 ? (
        <div className="empty-cart-container">
          <img
            className="empty-cart-img"
            src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/9bdd8040b334d31946f49e36beaf32db.png"
          />
          <p className="empty-cart-noti">Giỏ hàng của bạn còn trống</p>
          <Button className="buy-btn" type="primary">
            MUA NGAY
          </Button>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-fluid">
            <div className="cart-nav">
              <h1 className="title">Giỏ hàng của bạn</h1>
              <h1 className="empty-cart" onClick={clearCart}>
                Xóa hết
              </h1>
            </div>
            <div className="items-container">
              {cartItems.map((item, index) => {
                return (
                  <CartItem
                    key={index}
                    {...item}
                    decreaseQuantity={decreaseQuantity}
                    increaseQuantity={increaseQuantity}
                    onDelete={() => removeItem(item.productId)}
                  />
                );
              })}
              <Link to="/payment" className="pay-btn">
                MUA HÀNG
              </Link>
            </div>
          </div>
        </div>
      )}
      <TopItems />
      <Footer />
    </div>
  );
};

export default Cart;
