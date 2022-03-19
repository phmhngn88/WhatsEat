import React from "react";
import "./FavDishCard.css";
import {
  AiFillHeart,
  AiOutlineClockCircle,
  AiFillThunderbolt,
  AiOutlineBarChart,
} from "react-icons/ai";

const FavDishCard = ({
  id,
  img_url,
  dish_name,
  love_count,
  time,
  level,
  view,
}) => {
  return (
    <div className="fav-dish-card">
      <img src={img_url} alt={dish_name} className="dish-img" />
      <div className="heart-icon">
        <AiFillHeart className="icon" style={{ color: "red" }} />
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
      <p style={{ marginTop: "0.5rem" }}>Được thêm bởi: Trần Nhật Hiệp</p>
    </div>
  );
};

export default FavDishCard;
