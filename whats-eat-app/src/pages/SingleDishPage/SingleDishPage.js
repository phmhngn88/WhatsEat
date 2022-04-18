import axios from "axios";
import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import {
  AiFillStar,
  AiFillThunderbolt,
  AiOutlineBarChart,
  AiOutlineClockCircle,
  AiOutlineEye,
  AiOutlineHeart,
} from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useSearchParams, useLocation } from "react-router-dom";
import Comment from "../../components/Comment/Comment";
import RecipeReview from "../../components/RecipeReview/RecipeReview";
import Footer from "../../components/Footer/Footer";
import Guide from "../../components/Guide/Guide";
import "./SingleDishPage.css";

const combo = {
  img_url:
    "https://media.cooky.vn/recipe/g6/50880/s320x240/cooky-recipe-637102372207865706.png",
  dish_name: "Combo Smoothie xoài chuối kiwi",
  love_count: 24,
  time: "30p",
  level: "Dễ",
  view: 20,
};

const SingleDishPage = () => {
  const [dishDetail, setDishDetail] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const token = useSelector((state) => state.auth.userInfo.token);
  const location = useLocation();
  const recipeId = location.state.recipeId;
  console.log("Recipe id:", recipeId);
  const {
    description,
    avgRating,
    images,
    ingredients,
    steps,
    name,
    totalLike,
    totalTime,
    level,
    totalView,
  } = dishDetail;
  const price = 230000;

  useEffect(() => {
    axios({
      method: "get",
      url: `https://localhost:7029/api/Recipe/${recipeId}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        const result = res.data;
        console.log("Single dish info:", result);

        setDishDetail(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (!steps || !images || !ingredients) {
    return <img src="../../assets/Banner/preloader.gif" alt="" />;
  }

  return (
    <div className="single-dish">
      <div className="single-dish-fluid">
        <div className="single-dish-container">
          <h1 className="title">Chi tiết món ăn</h1>
          <div className="dish-block">
            <img src={images[0].url} alt={name} className="main-img" />
            <h1 className="dish-name">{name}</h1>
            <p
              className="desc"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <div className="rating-block">
              <div className="stars">
                <StarRatings
                  rating={avgRating}
                  starRatedColor="brown"
                  numberOfStars={5}
                  name="rating"
                  starDimension="25px"
                  starSpacing="3px"
                />
              </div>
              <div className="love">
                <AiOutlineHeart className="icon" /> <span>{totalLike}</span>
              </div>
              <div className="view">
                <AiOutlineEye className="icon" /> <span>{totalView}</span>
              </div>
            </div>
            <div className="dish-info">
              <div className="info-detail">
                <div>
                  <AiOutlineClockCircle className="icon" />{" "}
                  <span>{totalTime}</span>
                </div>
              </div>
              <div className="info-detail">
                <div>
                  <AiFillThunderbolt className="icon" />{" "}
                  <span>{level || "Dễ"}</span>
                </div>
              </div>
              <div className="info-detail">
                <div>
                  <AiOutlineBarChart className="icon" />{" "}
                  <span>{totalView}</span> xem
                </div>
              </div>
            </div>
          </div>
          <div className="combo-box">
            <p className="noti">Mua ngay combo thực phẩm chế biến {name}</p>
            <img src={images[1].url} alt="combo" className="combo-img" />
            <p className="combo-name">Combo {name}</p>
            <p className="combo-detail">
              {`${ingredients[0].name}${
                ingredients[1]?.name ? `, ${ingredients[1]?.name}` : ""
              }${ingredients[2]?.name ? `, ${ingredients[2]?.name}` : ""} và ${
                ingredients.length >= 3 ? ingredients.length - 3 : 0
              } thực phẩm khác`}
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
            {ingredients?.map((item, idx) => {
              const { name, quantity, unit } = item;
              return (
                <div className="ingredient-box" key={idx}>
                  <h3 className="ingredient-name">
                    {name}{" "}
                    <span
                      style={{
                        fontSize: "1rem",
                        fontWeight: "lighter",
                        textTransform: "toLowerCase",
                      }}
                    >{`(${quantity} ${unit?.unit})`}</span>
                  </h3>

                  <FaAngleDown className="icon" />
                </div>
              );
            })}
          </div>
          <Guide steps={steps} />
          <Comment recipeId={recipeId} />
          <RecipeReview recipeId={recipeId} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingleDishPage;
