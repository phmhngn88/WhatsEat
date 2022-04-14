import React, { useState, useEffect } from "react";
import "./Dish.css";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AiFillHeart,
  AiOutlineClockCircle,
  AiFillThunderbolt,
  AiOutlineBarChart,
} from "react-icons/ai";

const Dish = ({ recipeId, name, totalTime, totalView, level, images }) => {
  const [isLikeRecipe, setIsLikeRecipe] = useState(false);
  // const userName = useSelector((state) => state.userInfo.userName);
  const navigate = useNavigate();

  const handleLikeRecipe = () => {
    setIsLikeRecipe(!isLikeRecipe);
    if (isLikeRecipe) {
      axios({
        method: "POST",
        url: `https://localhost:7029/api/Recipe/like/${recipeId}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        data: {
          recipeId: recipeId,
          // userName: userName,
        },
      })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios({
        method: "DELETE",
        url: `https://localhost:7029/api/Recipe/dislike/${recipeId}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        data: {
          recipeId: recipeId,
          // userName: userName,
        },
      })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  };
  console.log(isLikeRecipe);

  return (
    <div
      className="dish-container"
      onClick={() =>
        navigate(`/singledish/${recipeId}`, {
          state: {
            recipeId: recipeId,
          },
        })
      }
    >
      <img src={images[0].url || ""} alt={name} className="dish-img" />
      <div
        className={`${
          isLikeRecipe ? "recipe-liked" : "recipe-not-liked"
        } heart-icon`}
        onClick={handleLikeRecipe}
      >
        <AiFillHeart className="icon" />
      </div>
      <h3 className="dish-name">{name}</h3>
      <div className="dish-info">
        <div className="info-detail">
          <div>
            <AiOutlineClockCircle className="icon" /> <span>{totalTime}</span>
          </div>
        </div>
        <div className="info-detail">
          <div>
            <AiFillThunderbolt className="icon" /> <span>{level || "Dễ"}</span>
          </div>
        </div>
        <div className="info-detail">
          <div>
            <AiOutlineBarChart className="icon" /> <span>{totalView}</span> xem
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dish;
