import React from "react";
import "./Dish.css";
import {
  AiFillHeart,
  AiOutlineClockCircle,
  AiFillThunderbolt,
  AiOutlineBarChart,
} from "react-icons/ai";

const Dish = ({ name, totalTime, totalView, level, images }) => {
  return (
    <div className="dish-container">
      <img src={images[0].url || ""} alt={name} className="dish-img" />
      <div className="heart-icon">
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
