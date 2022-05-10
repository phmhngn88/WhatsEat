import React, { useState } from "react";
import "./DishBox.css";
import Dish from "../Dish/Dish";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { Row, Col } from 'antd';
const DishBox = ({ menu, category, addRecipe, removeRecipe }) => {
  const [isShowRecipe, setIsShowRecipe] = useState(true);
  const handleShow = () => setIsShowRecipe(true);
  const handleHidden = () => setIsShowRecipe(false);
  return (
    // <div className="dish-box" key={recipeId}>
    //   <div className="dish-box-nav">
    //     <h2 className="dish-label">{name}</h2>
    //     <div className="icons">
    //       <AiOutlinePlusCircle onClick={handleShow} className="icon" />
    //       <AiOutlineMinusCircle onClick={handleHidden} className="icon" />
    //     </div>
    //   </div>
    // </div>
    <div >
      <h2>Món ăn cho bạn</h2>
      <div className="list-dish">
        <Row gutter={[16, 24]}>
          {
            menu.map((dish) => {
              const { recipeId, name, images, totalLike, totalTime, totalView, recipeTypeId } = dish;
              return (<Col className="gutter-row" span={6}>
                <Dish {...dish} className="single-dish" isShowRecipe={isShowRecipe} addRecipe={addRecipe} removeRecipe={removeRecipe} />;
              </Col>)
            })}
        </Row>
      </div>
    </div>

  );
};

export default DishBox;
