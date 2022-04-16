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

const items = [
  {
    id: 0,
    item_name: "Gà Ta Bình Định Thả Vườn",
    img_url:
      "https://image.cooky.vn/posproduct/g0/6997/s/8f099d38-a334-4315-8be3-5c4a3ead7ee2.jpeg",
    price: 169000,
    amount: 1,
  },
  {
    id: 1,
    item_name: "Classic Romance Set",
    img_url:
      "https://image.cooky.vn/posproduct/g0/14322/s/587a187b-069d-479d-87b7-3d5299cd5382.jpeg",
    price: 159000,
    amount: 1,
  },
  {
    id: 2,
    item_name: "Thăn Lưng Bò Canada (Ribeye) Cắt Hotpot",
    img_url:
      "https://image.cooky.vn/posproduct/g0/15513/s400x400/66572bb6-d1ea-4221-a523-d33289117088.jpeg",
    price: 119000,
    amount: 1,
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(items);
  // const [count, setCount] = useState(1);
  // const getCardItems = () => {
  //   axios({
  //     method: "get",
  //     url: `https://localhost:7029/api/Store/${id}`,
  //   })
  //     .then((res) => {
  //       const result = res.data;
  //       setCardItems(result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // useEffect(() => {
  //   getCardItems();
  // }, []);

  const handleEmptyCart = () => {
    setCartItems([]);
  };
  // const handleIncrease = () => {
  //   setCount(count + 1);
  // };

  // const handleDecrease = () => {
  //   if (count === 1) {
  //     setCount(1);
  //   } else setCount(count - 1);
  // };
  const handleDelete = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  // useEffect(() => {
  //   setCartItems(items);
  // }, []);
  console.log(cartItems);
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
              <h1 className="empty-cart" onClick={handleEmptyCart}>
                Xóa hết
              </h1>
            </div>
            <div className="items-container">
              {cartItems.map((item, index) => {
                return (
                  <CartItem
                    key={index}
                    {...item}
                    onDelete={() => handleDelete(index)}
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
      {/* <TopItems /> */}
      <Footer />
    </div>
  );
};

export default Cart;
