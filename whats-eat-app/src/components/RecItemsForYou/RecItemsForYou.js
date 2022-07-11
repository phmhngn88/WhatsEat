import React, { useState, useEffect } from "react";
import "./RecItemsForYou.css";
import axios from "axios";
import "antd/dist/antd.css";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import { useSelector } from "react-redux";

import Product from "../Product/Product";

const RecItemsForYou = () => {
  const [topProduct, setTopProduct] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const userId = useSelector((state) => state.auth.userInfo.userId);

  useEffect(() => {
    axios({
      method: "get",
      url: `${
        process.env.REACT_APP_PYTHON_API_KEY
      }/individual/product/ib?id_user=${userId}`,
    })
      .then((res) => {
        setTopProduct(res.data);
        if (!res.data) {
          setPageNumber(pageNumber - 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageNumber]);
  const navigate = useNavigate();

  if (!topProduct) {
    return <h1 className="loading">Loading...</h1>;
  }
  return (
    <div className="top-items-container">
      {topProduct.length > 0 && (
        <div className="top-items">
          <h1 className="title">Gợi ý cho bạn</h1>
          <Row gutter={[16, 16]}>
            {topProduct.map((item) => {
              const {
                productId,
                name,
                basePrice,
                weightServing,
                images,
                status,
              } = item;
              if (!status) return <></>;
              return (
                <Col span={4} className="item-col" key={productId}>
                  <Product {...item} />
                </Col>
              );
            })}
          </Row>
        </div>
      )}
    </div>
  );
};

export default RecItemsForYou;


