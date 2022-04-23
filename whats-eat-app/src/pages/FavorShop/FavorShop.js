import { Space, Table } from "antd";
import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import "./FavorShop.css";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";

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
  const [favShop, setFavShop] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  useEffect(() => {
    axios({
      method: "get",
      url: `https://localhost:7029/api/Store/PageNumber=${pageNumber}&PageSize=${pageSize}`,
    })
      .then((res) => {
        setFavShop(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageNumber]);
  return (
    <div className="favor-shop">
      <div className="favor-shop-fluid">
        <div className="favor-shop-container">
          <div className="content-container">
            <div className="favor-shop-nav">
              <h1 className="title">Shop yêu thích</h1>
            </div>
            <FaChevronCircleLeft
            className={`${
              pageNumber === 1 ? "hidden " : ""
            }icon-pagination left-icon`}
            onClick={() => setPageNumber(pageNumber - 1)}
          />
          <FaChevronCircleRight
            className={`${
              pageNumber === 10 ? "hidden " : ""
            }icon-pagination right-icon`}
            onClick={() => setPageNumber(pageNumber + 1)}
          />

            <div className="favor-shop-table">
              
              <Table columns={columns} dataSource={favShop} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FavorShop;
