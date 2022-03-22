import React from "react";
import "./Dish.css";
import {
  AiOutlineHeart,
  AiOutlineClockCircle,
  AiFillThunderbolt,
  AiOutlineBarChart,
} from "react-icons/ai";
import { Link } from "react-router-dom";


const Dish = ({ recipeId, img_url, name, love_count, totalTime, level, view }) => {
  return (
    <Link to={`/singledish/${recipeId}`} className="dish-link">
          <div className="dish-container" >
            <img src={img_url ? img_url : 'https://media.cooky.vn/recipe/g1/4014/s320x240/recipe4014-636009205974008541.jpg'} alt={name} className="dish-img" />
            <div className="heart-icon">
              <AiOutlineHeart className="icon" />
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
    </Link>
    
  );
};

export default Dish;
