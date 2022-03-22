import React, {useEffect, useState} from "react";
import "./RecommendItems.css";
import "antd/dist/antd.css";
import { Row, Col } from "antd";

import Product from "../Product/Product";
import axios from 'axios'

const RecommendItems = () => {
  const [items,setItems] = useState([])
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://127.0.0.1:5000/individual/product/?id_user=haohao1",
    })
      .then((res) => {
        console.log(res.data);
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="top-items-container">
      <div className="top-items">
        <h1 className="title">Thực phẩm cho bạn</h1>
        <Row gutter={[16, 16]}>
          {items?.map((item) => {
            const { id, img_url, item_name, weight, price } = item;
            return (
              <Col span={6} className="item-col" key={id}>
                <Product {...item} />
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default RecommendItems;
