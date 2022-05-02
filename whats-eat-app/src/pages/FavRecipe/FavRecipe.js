import { Col, Row } from "antd";
import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import FavDishCard from "../../components/FavDishCard/FavDishCard";
import Footer from "../../components/Footer/Footer";
import { getCurrentDate } from "../../utils/GetDate";
import "./FavRecipe.css";

const FavRecipe = () => {
  const [listRecipes, setListRecipes] = useState([]);
  const token = useSelector((state) => state.auth.userInfo.token);

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://localhost:7029/api/Recipe/love?PageNumber=${1}&PageSize=${30}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setListRecipes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="fav-recipe">
      <div className="fav-recipe-fluid">
        <div className="fav-recipe-container">
          <div className="profile">
            <img
              src="	https://media.cooky.vn/usr/g72/718990/avt/c100x100/cooky-avatar-637801641608093347.jpg"
              alt=""
            />
            <p className="username">Trần Nhật Hiệp</p>
            <h1>Công Thức Yêu Thích</h1>
            <p className="date-update">cập nhật ngày {getCurrentDate()}</p>
          </div>
          <div className="more-recipe">
            <button>Thêm gợi ý công thức...</button>
          </div>
          <Row gutter={[16, 16]}>
            {listRecipes.map((recipe) => {
              const {
                recipeId,
                images,
                name,
                totalLike,
                totalTime,
                level,
                totalView,
              } = recipe;
              return (
                <Col span={6} key={recipeId} className="dish-col">
                  <FavDishCard {...recipe} />
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FavRecipe;

const dishes = [
  {
    id: 1,
    img_url:
      "https://media.cooky.vn/recipe/g1/393/s320x240/Recipe393-635402710349446250.jpg",
    dish_name: "Cháo thịt heo bí đỏ",
    love_count: 12,
    time: "30p",
    level: "Dễ",
    view: 20,
  },
  {
    id: 2,
    img_url:
      "https://media.cooky.vn/recipe/g6/50880/s320x240/cooky-recipe-637102372207865706.png",
    dish_name: "Smoothie xoài chuối kiwi",
    love_count: 24,
    time: "30p",
    level: "Dễ",
    view: 20,
  },
  {
    id: 3,
    img_url:
      "https://media.cooky.vn/recipe/g2/15298/s320x240/recipe15298-635736102975470370.jpg",
    dish_name: "Bánh bông lan trà xanh",
    love_count: 31,
    time: "30p",
    level: "Dễ",
    view: 20,
  },
  {
    id: 4,
    img_url:
      "https://media.cooky.vn/recipe/g3/20185/s320x240/cooky-recipe-636318376852793754.jpg",
    dish_name: "Bún chay kiểu Huế",
    love_count: 145,
    time: "30p",
    level: "Dễ",
    view: 20,
  },
  {
    id: 5,
    img_url:
      "https://media.cooky.vn/recipe/g3/20185/s320x240/cooky-recipe-636318376852793754.jpg",
    dish_name: "Bún chay kiểu Huế",
    love_count: 145,
    time: "30p",
    level: "Dễ",
    view: 20,
  },
];
