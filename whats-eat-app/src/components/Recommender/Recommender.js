import React, { useState, useEffect } from "react";
import "./Recommender.css";
import { Button } from "antd";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import { getCurrentDate } from "../../utils/GetDate";
import { Link } from "react-router-dom";
import { BiSave } from "react-icons/bi";
import DishBox from "../DishBox/DishBox";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

const recommendedMenu = [
  {
    id: 1,
    dish_label: "Món chính",
    dish_name: "Ba Chỉ Rim Tôm Khô",
    img_url:
      "https://image.cooky.vn/recipe/g4/35480/s360x360/cooky-recipe-cover-r35480.JPG",
    love_count: 12,
    time: "30p",
    level: "Dễ",
    view: 20,
  },
  {
    id: 2,
    dish_label: "Món khai vị",
    dish_name: "Củ Kiệu Ngâm Chanh Dây",
    img_url:
      "https://image.cooky.vn/recipe/g3/28772/s360x360/recipe-cover-r28772.jpg",
    love_count: 12,
    time: "30p",
    level: "Dễ",
    view: 20,
  },
  {
    id: 3,
    dish_label: "Thức uống",
    dish_name: "Trà Vải Tươi",
    img_url:
      "https://image.cooky.vn/recipe/g3/24673/s360x360/recipe-cover-r24673.jpg",
    love_count: 12,
    time: "30p",
    level: "Dễ",
    view: 20,
  },
];

const categories = [
  { id: 1, category_name: "Món nhậu" },
  { id: 2, category_name: "Món ăn cho trẻ" },
  { id: 3, category_name: "Bánh - Bánh ngọt" },
  { id: 4, category_name: "Nhanh và dễ" },
  { id: 5, category_name: "Món chay" },
  { id: 6, category_name: "Món ăn sáng" },
  { id: 7, category_name: "Món tráng miệng" },
];

const Recommender = () => {
  const [menu, setMenu] = useState([]);
  const token = useSelector((state) => state.auth.userInfo.token);

  const handleSaveMenu = () => {
    axios({
      method: "post",
      url: "https://localhost:7029/api/Recipe/menu",
      data: {
        menuName: `Menu ngày ${getCurrentDate()}`,
        recipeIds: menu, //TODO: Get array of id in menu
      },
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setMenu(recommendedMenu);
  }, []);

  return (
    <div className="recommender-body">
      <div className="recommender-container">
        <div className="menu-mix">
          <div className="menu-detail">
            <h1 className="menu-title">Thực đơn cho bạn</h1>
            {menu.map((dish, index) => {
              const { id, dish_name } = dish;
              return (
                <p className="dish" key={index}>
                  {dish_name}
                </p>
              );
            })}
          </div>
          <div className="menu-info">
            <h1>MENU MIX</h1>
            <h3>
              Menu ngày {getCurrentDate()} do{" "}
              <Link to="/" style={{ color: "brown", fontWeight: "bold" }}>
                WhatsEat
              </Link>{" "}
              chọn riêng cho bạn.
            </h3>
          </div>
        </div>
        <Button className="save-btn" onClick={handleSaveMenu}>
          <BiSave className="save-icon" /> Thêm vào Menu của tôi
        </Button>
        <div className="menu-items">
          {menu.map((dish) => {
            const { id, dish_name, img_url, dish_label } = dish;
            return <DishBox {...dish} />;
          })}
        </div>
        <div className="expand-container">
          <h2 className="title">Thêm món</h2>
          <p>Thêm món vào menu của bạn</p>
          {categories.map((category) => {
            return (
              <div className="category" key={category.id}>
                <h3 className="category-name">{category.category_name}</h3>
                <AiOutlinePlusCircle className="icon" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Recommender;
