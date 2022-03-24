import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineLogout,
} from "react-icons/ai";
import { FaPizzaSlice } from "react-icons/fa";
import {
  BsFillPersonFill,
  BsPersonCircle,
  BsFillSuitHeartFill,
  BsMenuButtonWideFill,
  BsFillCartFill,
  BsShop,
  BsShopWindow,
} from "react-icons/bs";

import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

const options = (
  <Menu>
    <Menu.Item key="0">
      <a href="#" className="single-option">
        {" "}
        <BsPersonCircle /> <span>Trang cá nhân</span>
      </a>
    </Menu.Item>
    <Menu.Item key="1">
      <Link to="/fav/recipe" className="single-option">
        <BsFillSuitHeartFill /> <span>Công thức yêu thích</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to="/fav/menu" className="single-option">
        <BsMenuButtonWideFill />
        <span> Menu của tôi</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="3">
      <Link to="/orders" className="single-option">
        <BsFillCartFill /> <span>Đơn hàng</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="4">
      <a href="/favorshop" className="single-option">
        <BsShop /> <span>Shop yêu thích</span>
      </a>
    </Menu.Item>
    <Menu.Item key="5">
      <Link to="/shop" className="single-option">
        <BsShopWindow /> <span>Kênh người bán</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="6">
      <a
        href="#"
        className="single-option"
        onClick={() => console.log("clicked")}
      >
        <AiOutlineLogout /> <span>Đăng xuất</span>
      </a>
    </Menu.Item>
  </Menu>
);

const Navbar = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);

  return (
    <div className="navbar">
      <div className="logo-and-search">
        <Link to="/" className="logo">
          WhatsEat
        </Link>
        <div className="search">
          <AiOutlineSearch className="search-icon" />
          <input
            className="search-input"
            type="text"
            placeholder="Bạn muốn tìm gì vậy?"
          />
          <button className="btn search-btn">Tìm kiếm</button>
        </div>
      </div>
      <div className="options">
        <Link to="/recommender" className="btn option-btn">
          <FaPizzaSlice className="option-icon" /> <span>Hôm nay ăn gì?</span>
        </Link>
        <Link to="/cart" className="btn option-btn">
          <AiOutlineShoppingCart className="option-icon" />{" "}
          <span>Giỏ hàng</span>
        </Link>
        {isLoggedin === false ? (
          <Link to="/login" className="btn option-btn">
            <BsFillPersonFill className="option-icon" /> <span>Đăng nhập</span>
          </Link>
        ) : (
          <button className="btn option-btn">
            <BsFillPersonFill className="option-icon" />
            <Dropdown
              className="option-dropdown"
              overlay={options}
              trigger={["click"]}
            >
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                Hiii <DownOutlined />
              </a>
            </Dropdown>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
