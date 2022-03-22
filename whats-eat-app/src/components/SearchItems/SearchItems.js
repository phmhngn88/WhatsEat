import React, {useEffect, useState} from "react";
import "./SearchItems.css";
import "antd/dist/antd.css";
import { Row, Col } from "antd";

import Product from "../Product/Product";
import axios from 'axios'
import { useSearchParams } from "react-router-dom"
const SearchItems = () => {
  const [products,setProducts] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams()
  const keyword = searchParams.get("keyword")
  useEffect(() => {
    axios({
      method: "POST",
      url: "https://localhost:7029/api/Product/search",
      data: {
        keyword: keyword,
      },
    })
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="top-items-container">
      <div className="top-items">
        <h1 className="title">Kết quả tìm kiếm</h1>
        <Row gutter={[16, 16]}>
          {products?.map((item) => {
            const { productId, img_url, name, description, basePrice } = item;
            return (
              <Col span={6} className="item-col" key={productId}>
                <Product {...item} />
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default SearchItems;
