import React, { useState } from "react";
import "./Counter.css";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const Counter = () => {
  const [count, setCount] = useState(1);

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleDecrease = () => {
    if (count === 0) {
      setCount(0);
    } else setCount(count - 1);
  };
  return (
    <div className="counter">
      <AiOutlineMinus className="count-icon" onClick={handleDecrease} />
      <p className="number">{count}</p>
      <AiOutlinePlus className="count-icon" onClick={handleIncrease} />
    </div>
  );
};

export default Counter;
