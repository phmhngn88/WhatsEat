import { Space, Table } from "antd";
import "antd/dist/antd.css";
import React from "react";
import Footer from "../../components/Footer/Footer";
import "./FavorShop.css";

const columns = [
  {
    title: "Tên shop",
    dataIndex: "shop",
    key: "shop",
  },
  {
    title: "",
    dataIndex: "view",
    key: "view",
    render: (text) => (
      <Space size="middle">
        <a>Xem shop</a>
      </Space>
    ),
  },
  {
    title: "",
    dataIndex: "unfl",
    key: "unfl",
    render: (text) => (
      <Space size="middle">
        <a>Bỏ theo dõi</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: 1,
    shop: "lyquynhtram",
  },
  {
    key: 2,
    shop: "trannhathiep",
  },
  {
    key: 3,
    shop: "tranthivi",
  },
  {
    key: 4,
    shop: "dinhthiminhhieu",
  },
  {
    key: 5,
    shop: "nguyenvanhao",
  },
  {
    key: 6,
    shop: "phamhoangan",
  },
];

const FavorShop = () => {
  return (
    <div className="favor-shop">
      <div className="favor-shop-fluid">
        <div className="favor-shop-container">
          <div className="content-container">
            <div className="favor-shop-nav">
              <h1 className="title">Shop yêu thích</h1>
            </div>
            <div className="favor-shop-table">
              <Table columns={columns} dataSource={data} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FavorShop;
