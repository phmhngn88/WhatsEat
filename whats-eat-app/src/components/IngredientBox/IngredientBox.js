import React, { useState } from "react";
import "./IngredientBox.css";
import axios from "axios";
import { Col } from "antd";
import "antd/dist/antd.css";
import Product from "../Product/Product";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const IngredientBox = ({ name, quantity, unit }) => {
  const [products, setProducts] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const handleShowProduct = (name) => {
    axios({
      method: "get",
      url: `https://localhost:7029/api/Product?searchTerm=${name}&PageNumber=1&PageSize=4`,
    })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsShow(true);
  };

  const handleHideProduct = () => {
    setIsShow(false);
  };

  return (
    <>
      <div className="ingredient-box">
        <h3 className="ingredient-name">
          {name}{" "}
          <span
            style={{
              fontSize: "1rem",
              fontWeight: "lighter",
              textTransform: "toLowerCase",
            }}
          >{`(${quantity} ${unit?.unit})`}</span>
        </h3>

        {!isShow ? (
          <FaAngleDown
            className="icon"
            onClick={() => handleShowProduct(name)}
          />
        ) : (
          <FaAngleUp className="icon" onClick={handleHideProduct} />
        )}
      </div>
      {isShow &&
        (products.length !== 0 ? (
          <div className="products-box">
            {products.map((item, idx) => (
              <Col span={6} className="item-col" key={idx}>
                <Product {...item} />
              </Col>
            ))}
          </div>
        ) : (
          <p>Không có sản phẩm nào</p>
        ))}
    </>
  );
};

export default IngredientBox;
