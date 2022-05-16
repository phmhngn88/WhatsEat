import React, { useState, useEffect } from "react";
import "./Recommender.css";
import { Button, Row, Col } from "antd";
import { useSelector } from "react-redux";
import "antd/dist/antd.css";
import axios from "axios";
import { getCurrentDate } from "../../utils/GetDate";
import { Link } from "react-router-dom";
import { BiSave } from "react-icons/bi";
import DishBox from "../DishBox/DishBox";
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiFillDelete } from "react-icons/ai";
import { Progress } from 'antd';
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
  { id: 1, category_name: "Món khai vị" },
  { id: 2, category_name: "Món tráng miệng" },
  { id: 3, category_name: "Món chay" },
  { id: 4, category_name: "Món chính" },
  { id: 5, category_name: "Món ăn sáng" },
  { id: 6, category_name: "Món nhanh và dễ" },
  { id: 7, category_name: "Thức uống" },
  { id: 8, category_name: "Bánh - Bánh ngọt" },
  { id: 9, category_name: "Món ăn cho trẻ" },
  { id: 10, category_name: "Món nhậu" },
];

const Recommender = ({ kcal, menu }) => {
  const [listRecipes, setListRecipes] = useState([]);
  const [status, setStatus] = useState("");
  const [percent, setPercent] = useState(0);
  const token = useSelector((state) => state.auth.userInfo.token);
  const recipes = [];
  let listRecipe = [];
  menu.map((item) => {
    recipes.push(item.id);
  });
  const handleSaveMenu = () => {
    axios({
      method: "post",
      url: "https://localhost:7029/api/Menu",
      data: {
        menuName: `Menu ngày ${getCurrentDate()}`,
        recipeIds: listRecipes.map(a => a.recipeId), //TODO: Get array of id in menu
      },
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setListRecipes([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addRecipe = (recipe) => {
    setListRecipes([...listRecipes, recipe])
  }

  const removeRecipe = (recipeId) => {
    setListRecipes(listRecipes.filter(item => item.recipeId !== recipeId))
  }

  useEffect(() => {
    let totalKcal = listRecipes.reduce((sum, a) => sum + a.calories, 0);
    let per = totalKcal / kcal * 100
    if (per > 100) {
      setStatus("exception")
    }
    setPercent(per.toFixed(2))
  }, [listRecipes])

  console.log('list', listRecipes)
  return (
    <div className="recommender-body">
      <div className="recommender-container">
        <div className="menu-mix">
          <div className="menu-detail">
            <h1 className="menu-title">Thực đơn cho bạn</h1>
            {kcal > 0 && <p>Lượng calo mỗi ngày của bạn là {kcal}</p>}
            {listRecipes.map((dish, index) => {
              const { recipeId, name, calories } = dish;
              return (
                <p className="dish" key={index}>
                  <Row>
                    <Col span={18}>{name}</Col>
                    <Col span={4}>{calories}</Col>
                    <Col span={2}><AiFillDelete className="remove-recipe" onClick={() => removeRecipe(recipeId)} /></Col>
                  </Row>
                </p>
              );
            })}
            <Progress percent={percent} status={status} />
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
          <DishBox menu={menu} addRecipe={addRecipe} />
        </div>
        {/* <div className="expand-container">
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
        </div> */}
      </div>
    </div>
  );
};

export default Recommender;
