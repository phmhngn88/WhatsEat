import React from "react";
import "./TopItems.css";
import "antd/dist/antd.css";
import { Row, Col } from "antd";

import Product from "../Product/Product";

const items = [
  {
    productId: 1,
    img_url:
      "https://image.cooky.vn/posproduct/g0/17007/s400x400/e94fbb1b-f16c-4b36-9a55-a1e66e8e62a7.jpeg",
    name: "Gà Tam Hoàng(1/2 Con)",
    description: "1/2 Con",
    basePrice: 62000,
  },
  {
    productId: 2,
    img_url:
      "https://image.cooky.vn/posproduct/g0/17009/s400x400/8075338b-0fea-49d7-9e05-7ef1dd0aabd4.jpeg",
    name: "Gà Tam Hoàng(Nguyên Con)",
    description: "1 Con",
    basePrice: 134000,
  },
  {
    productId: 3,
    img_url:
      "https://image.cooky.vn/posproduct/g0/8671/s400x400/5cb6f4a6-cda6-4acc-a8c9-65bfcb01add8.jpeg",
    name: "Tôm Sú Quảng Canh",
    description: "400-420g",
    basePrice: 140000,
  },
  {
    productId: 4,
    img_url:
      "https://image.cooky.vn/posproduct/g0/13852/s400x400/c6f09391-a974-4d05-9c47-d3096aded7c4.jpeg",
    name: "Bắp Giò Heo",
    description: "300-350g",
    basePrice: 22800,
  },
  {
    productId: 5,
    img_url:
      "https://image.cooky.vn/posproduct/g0/9752/s400x400/ab6197c5-1f3e-4fef-980c-a7de0ec2d21b.jpeg",
    name: "Bún Tươi Mikiri sợi nhỏ",
    description: "400g",
    basePrice: 29400,
  },
  {
    productId: 6,
    img_url:
      "https://image.cooky.vn/posproduct/g0/12447/s400x400/177e2cd7-1885-4e3d-a617-0a410a7884cd.jpeg",
    name: "Xương Ống Heo",
    description: "500-550g",
    basePrice: 33000,
  },
  {
    productId: 7,
    img_url:
      "https://image.cooky.vn/posproduct/g0/16316/s400x400/524eeac4-97e3-4b39-834b-940f4567d136.jpeg",
    name: "Cá Chẽm Phi lê",
    description: "250-300g",
    basePrice: 65000,
  },
  {
    productId: 8,
    img_url:
      "https://image.cooky.vn/posproduct/g0/13832/s400x400/24530a15-d966-4db0-a693-94058998876f.jpeg",
    name: "Cá Lóc Đồng Làm Sạch",
    description: "200-220g",
    basePrice: 22000,
  },
];

const TopItems = () => {
  return (
    <div className="top-items-container">
      <div className="top-items">
        <h1 className="title">Top thực phẩm yêu thích</h1>
        <Row gutter={[16, 16]}>
          {items.map((item) => {
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

export default TopItems;
