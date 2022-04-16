import React, { useState } from "react";
import "./CartItem.css";

import Counter from "../../components/Counter/Counter";
import { FaTrashAlt } from "react-icons/fa";
import { Checkbox } from "antd";
import "antd/dist/antd.css";

const CartItem = ({ id, item_name, img_url, price, amount, onDelete }) => {
  const [itemAmount, setItemAmount] = useState(amount);
  const handleIncrease = () => {
    setItemAmount(itemAmount + 1);
  };

  const handleDecrease = () => {
    if (itemAmount === 1) {
      return;
    } else return setItemAmount(itemAmount - 1);
  };
  return (
    <div className="single-item">
      <Checkbox></Checkbox>
      <img className="item-img" src={img_url} alt={item_name} />
      <div className="item-fluid">
        <div className="item-info">
          <h3 className="item-name">{item_name}</h3>
          <p className="price">
            {price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </div>
        <div className="count-and-delete">
          <Counter
            count={itemAmount}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
          <FaTrashAlt className="delete-btn" onClick={() => onDelete(id)} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
