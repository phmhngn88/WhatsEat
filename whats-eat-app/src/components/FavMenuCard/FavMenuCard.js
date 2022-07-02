import React from "react";
import "./FavMenuCard.css";
import {useNavigate} from 'react-router-dom'

const FavMenuCard = (props) => {
  const menu = props.menu;
  const navigate=useNavigate()
  return (
    <div className="fav-menu-card">
      <h3>{menu.menuName}</h3>

      {menu.simpleMenuDetail.map((dish, idx) =>{
        const {recipeId, recipeName, calories}=dish
        console.log({dish});
        return <div className='single-dish-name' key={idx}>
          <span style={{cursor:'pointer'}} onClick={navigate(`/singledish/${recipeId}`, {
          state: {
            recipeId: recipeId,
          },
        })}>{recipeName}</span>
          <span>{calories} Kcal</span> 
        </div>
})}
    </div>
  );
};

export default FavMenuCard;
