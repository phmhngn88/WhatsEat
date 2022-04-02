import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SingleDishPage.css";
import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Guide from "../../components/Guide/Guide";
import Comment from "../../components/Comment/Comment";
import { FaAngleDown } from "react-icons/fa";
import {
  AiFillStar,
  AiOutlineBarChart,
  AiFillThunderbolt,
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineClockCircle,
} from "react-icons/ai";

const dish = {
  id: 1,
  img_url:
    "https://media.cooky.vn/recipe/g6/50880/s320x240/cooky-recipe-637102372207865706.png",
  dish_name: "Smoothie xoài chuối kiwi",
  love_count: 24,
  time: "30p",
  level: "Dễ",
  view: 20,
};

const combo = {
  img_url:
    "https://media.cooky.vn/recipe/g6/50880/s320x240/cooky-recipe-637102372207865706.png",
  dish_name: "Combo Smoothie xoài chuối kiwi",
  love_count: 24,
  time: "30p",
  level: "Dễ",
  view: 20,
};

const ingredients = [
  { id: 1, product_name: "Xoài" },
  { id: 2, product_name: "Chuối" },
  { id: 3, product_name: "Kiwi" },
  { id: 4, product_name: "Đậu Phộng" },
  { id: 5, product_name: "Sữa" },
];

const SingleDishPage = () => {
  const [dishDetail, setDishDetail] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const idRecipe = searchParams.get("id");
  const { id, img_url, dish_name, love_count, time, level, view } = dish;
  const price = 230000;

  const getDishDetail = () => {
    axios({
      method: "get",
      url: `https://localhost:7029/api/Recipe/${597}`, //TODO: replace hardcode into idRecipe
    })
      .then((res) => {
        const result = res.data;
        console.log(result);
        // setDishDetail(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getDishDetail();
  }, []);
  return (
    <div className="single-dish">
      <Navbar />
      <div className="single-dish-fluid">
        <div className="single-dish-container">
          <h1 className="title">Chi tiết món ăn</h1>
          <div className="dish-block">
            <img src={img_url} alt={dish_name} className="dish-img" />
            <h1 className="dish-name">{dish_name}</h1>
            <div className="rating-block">
              <div className="stars">
                <AiFillStar className="icon" />
                <AiFillStar className="icon" />
                <AiFillStar className="icon" />
                <AiFillStar className="icon" />
                <AiFillStar className="icon" />
              </div>
              <div className="love">
                <AiOutlineHeart className="icon" /> <span>{love_count}</span>
              </div>
              <div className="view">
                <AiOutlineEye className="icon" /> <span>{view}</span>
              </div>
            </div>
            <div className="dish-info">
              <div className="info-detail">
                <div>
                  <AiOutlineClockCircle className="icon" /> <span>{time}</span>
                </div>
              </div>
              <div className="info-detail">
                <div>
                  <AiFillThunderbolt className="icon" /> <span>{level}</span>
                </div>
              </div>
              <div className="info-detail">
                <div>
                  <AiOutlineBarChart className="icon" /> <span>{view}</span> xem
                </div>
              </div>
            </div>
          </div>
          <div className="combo-box">
            <p className="noti">
              Mua ngay combo thực phẩm chế biến {dish_name}
            </p>
            <img src={img_url} alt="combo" className="combo-img" />
            <p className="combo-name">Combo {dish_name}</p>
            <p className="combo-detail">
              Xoài, chuối, kiwi và 2 thực phẩm khác
            </p>
            <p className="combo-price">
              {price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
          <div className="ingredients">
            <h2>Thành Phần</h2>
            {ingredients.map((item) => {
              const { id, product_name } = item;
              return (
                <div className="ingredient-box" key={id}>
                  <h3 className="ingredient-name">{product_name}</h3>
                  <FaAngleDown className="icon" />
                </div>
              );
            })}
          </div>
          <Guide />
          <Comment />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingleDishPage;
