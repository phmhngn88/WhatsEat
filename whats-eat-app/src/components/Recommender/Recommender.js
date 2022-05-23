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
import { AiFillDelete } from "react-icons/ai";
import { Progress, Pagination } from 'antd';

const Recommender = ({ kcal, menu, setCurrentPage }) => {
  const [listRecipes, setListRecipes] = useState([]);
  const [status, setStatus] = useState("");
  const [percent, setPercent] = useState(0);
  const [current, setCurrent] = useState(1);
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

  const onPageChage = (page) => {
    setCurrent(page)
    setCurrentPage(page-1)
  }

  useEffect(() => {
    let totalKcal = listRecipes.reduce((sum, a) => sum + a.calories, 0);
    let per = totalKcal / kcal * 100
    if (per > 100) {
      setStatus("exception")
    }
    else {
      setStatus("active")
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
                    <Col span={4}>{calories.toFixed(2)}</Col>
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
        <Pagination 
            className="recommendation-panigation"
            pageSize={16} 
            current={current}
            total={1000}
            showSizeChanger={false}
            onChange={onPageChage}
             />
          <DishBox menu={menu} addRecipe={addRecipe} />
          <Pagination 
            className="recommendation-panigation"
            pageSize={16} 
            current={current}
            total={1000}
            showSizeChanger={false}
            onChange={onPageChage}
             />
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
