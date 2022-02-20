import React from "react";
import "./Dish.css";
import {
  AiOutlineHeart,
  AiOutlineClockCircle,
  AiFillThunderbolt,
  AiOutlineBarChart,
} from "react-icons/ai";

const Dish = ({ id, img_url, dish_name, love_count, time, level, view }) => {
  return (
    <div className="dish-container">
      <img src={img_url} alt={dish_name} className="dish-img" />
      <div className="heart-icon">
        <AiOutlineHeart className="icon" />
      </div>
      <h3 className="dish-name">{dish_name}</h3>
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
  );
};

export default Dish;
