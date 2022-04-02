import React, { useState, useEffect } from "react";
import "./SearchPage.css";
import axios from "axios";
import { useLocation, useSearchParams } from "react-router-dom";
import { Button, Checkbox, Row, Col, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Dish from "../../components/Dish/Dish";

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="#">Độ khó</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="#">Thời gian</a>
    </Menu.Item>
    <Menu.Item key="3">
      <a href="#">Lượt xem</a>
    </Menu.Item>
  </Menu>
);

const menuList = [
  { id: 1, name: "Món chay" },
  { id: 2, name: "Thức uống" },
  { id: 3, name: "Bánh - Bánh ngọt" },
  { id: 4, name: "Món ăn cho trẻ" },
  { id: 5, name: "Món khai vị" },
  { id: 6, name: "Nhanh và dễ" },
  { id: 7, name: "Món ăn sáng" },
  { id: 8, name: "Món nhậu" },
  { id: 9, name: "Món chính" },
  { id: 10, name: "Món tráng miệng" },
];

const SearchPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [searchResult, setSearchResult] = useState([]);

  let [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");
  console.log("searchTerm", searchTerm);
  //setSearchResult(state)

  useEffect(() => {
    setSearchResult(searchResults);
  }, []);

  axios({
    method: "POST",
    url: `https://localhost:7029/api/Product?PageNumber=${pageNumber}&searchTerm=${searchTerm}&PageSize=${pageSize}h`,
    data: {
      searchTerm: searchTerm,
    },
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  return (
    <div className="search">
      <Navbar />
      <div className="search-container">
        <div className="search-fluid">
          <div className="search-nav">
            <h1 className="title">Kết quả tìm kiếm</h1>
            <Dropdown className="drop-down" overlay={menu} trigger={["click"]}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                Sắp xếp theo <DownOutlined />
              </a>
            </Dropdown>
          </div>
          <p className="notice">Kết quả tìm kiếm cho "..."</p>
          <div className="menu">
            {menuList.map((item) => {
              return (
                <div className="single-item">
                  <Checkbox />
                  <p className="item-name">{item.name}</p>
                </div>
              );
            })}
          </div>
          <Row gutter={[16, 16]}>
            {searchResult.map((item) => {
              const { id, img_url, dish_name, love_count, time, level, view } =
                item;
              return (
                <Col span={6} key={id} className="dish-col">
                  <Dish {...item} />
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;

const searchResults = [
  {
    id: 1,
    img_url:
      "https://media.cooky.vn/recipe/g1/393/s320x240/Recipe393-635402710349446250.jpg",
    dish_name: "Cháo thịt heo bí đỏ",
    love_count: 12,
    time: "30p",
    level: "Dễ",
    view: 20,
  },
  {
    id: 2,
    img_url:
      "https://media.cooky.vn/recipe/g6/50880/s320x240/cooky-recipe-637102372207865706.png",
    dish_name: "Smoothie xoài chuối kiwi",
    love_count: 24,
    time: "30p",
    level: "Dễ",
    view: 20,
  },
  {
    id: 3,
    img_url:
      "https://media.cooky.vn/recipe/g2/15298/s320x240/recipe15298-635736102975470370.jpg",
    dish_name: "Bánh bông lan trà xanh",
    love_count: 31,
    time: "30p",
    level: "Dễ",
    view: 20,
  },
  {
    id: 4,
    img_url:
      "https://media.cooky.vn/recipe/g3/20185/s320x240/cooky-recipe-636318376852793754.jpg",
    dish_name: "Bún chay kiểu Huế",
    love_count: 145,
    time: "30p",
    level: "Dễ",
    view: 20,
  },
  {
    id: 5,
    img_url:
      "https://media.cooky.vn/recipe/g1/3030/s320x240/recipe3030-635643660376673456.jpg",
    dish_name: "Cá Basa kho tộ",
    love_count: 44,
    time: "30p",
    level: "Dễ",
    view: 20,
  },
  {
    id: 6,
    img_url:
      "https://media.cooky.vn/recipe/g1/4014/s320x240/recipe4014-636009205974008541.jpg",
    dish_name: "Cơm chiên Dương Châu",
    love_count: 122,
    time: "30p",
    level: "Dễ",
    view: 20,
  },
  {
    id: 7,
    img_url:
      "https://media.cooky.vn/recipe/g5/48083/s320x240/cooky-recipe-cover-r48083.jpg",
    dish_name: "Đậu hũ om rau nấm rơm",
    love_count: 12,
    time: "30p",
    level: "Dễ",
    view: 20,
  },
  {
    id: 8,
    img_url:
      "https://media.cooky.vn/recipe/g5/48084/s320x240/cooky-recipe-cover-r48084.jpg",
    dish_name: "Canh đu đủ hầm nấm rơm",
    love_count: 12,
    time: "30p",
    level: "Dễ",
    view: 20,
  },
];
