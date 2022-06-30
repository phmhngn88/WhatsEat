import React from "react";
import "./FavMenuCard.css";

const FavMenuCard = (props) => {
  const menu = props.menu;
  return (
    <div className="fav-menu-card">
      <h3>{menu.menuName}</h3>

      {menu.simpleMenuDetail.map((dish, idx) => (
        <div key={idx}>
          <p>{dish.recipeName} <span>{dish.calories}</span></p> 
        </div>
      ))}
      <h4>Được thêm bởi ...</h4>
    </div>
  );
};

export default FavMenuCard;
