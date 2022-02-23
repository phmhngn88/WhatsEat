import { Button, Checkbox } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import Counter from "../../components/Counter/Counter";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import TopItems from "../../components/TopItems/TopItems";
import "./Cart.css";

const items = [
  {
    id: 0,
    item_name: "Gà Ta Bình Định Thả Vườn",
    img_url:
      "https://image.cooky.vn/posproduct/g0/6997/s/8f099d38-a334-4315-8be3-5c4a3ead7ee2.jpeg",
    price: 169000,
  },
  {
    id: 1,
    item_name: "Classic Romance Set",
    img_url:
      "https://image.cooky.vn/posproduct/g0/14322/s/587a187b-069d-479d-87b7-3d5299cd5382.jpeg",
    price: 159000,
  },
  {
    id: 2,
    item_name: "Thăn Lưng Bò Canada (Ribeye) Cắt Hotpot",
    img_url:
      "https://image.cooky.vn/posproduct/g0/15513/s400x400/66572bb6-d1ea-4221-a523-d33289117088.jpeg",
    price: 119000,
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleEmptyCart = () => {
    setCartItems([]);
  };

  const handleDelete = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  useEffect(() => {
    setCartItems(items);
  }, []);

  return (
    <div className="cart">
      <Navbar />
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
              <h1 className="empty-cart" onClick={handleEmptyCart}>
                Xóa hết
              </h1>
            </div>
            <div className="items-container">
              {cartItems.map((item, index) => {
                const { id, item_name, img_url, price } = item;
                return (
                  <div key={id} className="single-item">
                    <Checkbox></Checkbox>
                    <img className="item-img" src={img_url} alt={item_name} />
                    <div className="item-fluid">
                      <div className="item-info">
                        <h3 className="item-name">{item_name}</h3>
                        <p className="price">
                          {price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </div>
                      <div className="count-and-delete">
                        <Counter />
                        <FaTrashAlt
                          className="delete-btn"
                          onClick={() => handleDelete(index)}
                        />
                      </div>
                    </div>
                  </div>
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
