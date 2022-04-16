import React, { useState } from "react";
import "./DishBox.css";

import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

const DishBox = ({ id, dish_name, img_url, dish_label }) => {
  const [isShowRecipe, setIsShowRecipe] = useState(true);

  const handleShow = () => setIsShowRecipe(true);
  const handleHidden = () => setIsShowRecipe(false);
  return (
    <div className="dish-box" key={id}>
      <div className="dish-box-nav">
        <h2 className="dish-label">{dish_label}</h2>
        <div className="icons">
          <AiOutlinePlusCircle onClick={handleShow} className="icon" />
          <AiOutlineMinusCircle onClick={handleHidden} className="icon" />
        </div>
      </div>
      {isShowRecipe && (
        <div className="list-dish">
          hehe
          {/* <Dish {...dish} className="single-dish" /> */}
        </div>
      )}
    </div>
  );
};

export default DishBox;
