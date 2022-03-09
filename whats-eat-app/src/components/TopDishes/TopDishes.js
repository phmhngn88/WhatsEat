import React from "react";
import "./TopDishes.css";
import "antd/dist/antd.css";
import { Row, Col } from "antd";
import Dish from "../Dish/Dish";
import {
  AiOutlineHeart,
  AiOutlineClockCircle,
  AiFillThunderbolt,
  AiOutlineBarChart,
} from "react-icons/ai";

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
      "https://media.cooky.vn/recipe/g1/3030/s320x240/recipe3030-635643660376673456.jpg",
    dish_name: "Cá Basa kho tộ",
    love_count: 44,
    time: "30p",
    level: "Dễ",
    view: 20,
  },
  {
    id: 6,
    img_url:
      "https://media.cooky.vn/recipe/g1/4014/s320x240/recipe4014-636009205974008541.jpg",
    dish_name: "Cơm chiên Dương Châu",
    love_count: 122,
    time: "30p",
    level: "Dễ",
    view: 20,
  },
  {
    id: 7,
    img_url:
      "https://media.cooky.vn/recipe/g5/48083/s320x240/cooky-recipe-cover-r48083.jpg",
    dish_name: "Đậu hũ om rau nấm rơm",
    love_count: 12,
    time: "30p",
    level: "Dễ",
    view: 20,
  },
  {
    id: 8,
    img_url:
      "https://media.cooky.vn/recipe/g5/48084/s320x240/cooky-recipe-cover-r48084.jpg",
    dish_name: "Canh đu đủ hầm nấm rơm",
    love_count: 12,
    time: "30p",
    level: "Dễ",
    view: 20,
  },
];

const TopDishes = () => {
  return (
    <div className="top-dishes-container">
      <div className="top-dishes">
        <h1 className="title">Top món ăn thịnh hành</h1>
        <Row gutter={[16, 16]}>
          {dishes.map((dish) => {
            const { id, img_url, dish_name, love_count, time, level, view } =
              dish;
            return (
              <Col span={6} key={id} className="dish-col">
                <Dish {...dish} />
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default TopDishes;