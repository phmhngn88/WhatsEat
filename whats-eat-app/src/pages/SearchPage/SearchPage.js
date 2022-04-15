import { Checkbox, Col, Row, Select } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Product from "../../components/Product/Product";
import Dish from "../../components/Dish/Dish";
import Footer from "../../components/Footer/Footer";
import Pagination from "../../components/Pagination/Pagination";
import { AiTwotoneFilter } from "react-icons/ai";
import "./SearchPage.css";

const { Option } = Select;

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
  const [searchRecipeResult, setSearchRecipeResult] = useState([]);
  const [searchProductResult, setSearchProductResult] = useState([]);
  const [filterCondition, setFilterCondition] = useState("");

  let [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");

  const handleClickNext = () => {
    setPageNumber((pageNumber) => pageNumber + 1);
  };
  const handleClickPrev = () => {
    setPageNumber((pageNumber) => pageNumber - 1);
  };
  const handleChange = (value) => {
    setFilterCondition(value);
  };

  useEffect(() => {
    // setSearchRecipeResult(searchResults);
    axios({
      method: "get",
      url: `https://localhost:7029/api/Product?searchTerm=${searchTerm}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
    })
      .then((res) => {
        console.log("Data product search:", res.data);
        setSearchProductResult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchTerm, pageNumber]);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://localhost:7029/api/Recipe/search?searchTerm=${searchTerm}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
    })
      .then((res) => {
        // console.log("Data recipe search:", res.data);
        setSearchRecipeResult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchTerm, pageNumber]);

  // useEffect(() => {
  //   if (filterCondition.value === "all") {
  //     searchResults = searchRecipeResult;
  //   }
  //   if (filterCondition.value === "justRecipe") {
  //     searchResults = searchRecipeResult;
  //   }
  //   if (filterCondition.value === "justItem") {
  //     searchResults = searchProductResult;
  //   }
  // }, [filterCondition, searchTerm, pageNumber]);
  const searchResults = [...searchRecipeResult, ...searchProductResult];
  console.log("search result:", searchResults);

  return (
    <div className="search">
      <div className="search-container">
        <div className="search-fluid">
          <div className="search-nav">
            <h1 className="title">Kết quả tìm kiếm</h1>
            <div className="drop-down">
              <AiTwotoneFilter />
              <Select
                labelInValue
                defaultValue={{ value: "difficulty" }}
                onChange={handleChange}
                bordered={false}
              >
                <Option value="difficulty">Độ khó công thức</Option>
                <Option value="timeTaken">Thời gian nấu</Option>
                <Option value="view">Lượt xem</Option>
              </Select>
            </div>
          </div>
          <p className="notice">Kết quả tìm kiếm cho "{searchTerm || "..."}"</p>
          <div className="menu">
            {menuList.map((item, idx) => {
              return (
                <div key={idx} className="single-item">
                  <Checkbox />
                  <p className="item-name">{item.name}</p>
                </div>
              );
            })}
          </div>
          <Row gutter={[16, 16]}>
            {searchRecipeResult.map((item, idx) => {
              const { recipeId, name, totalTime, totalView, level, images } =
                item;
              return (
                <Col span={6} key={idx} className="dish-col">
                  <Dish {...item} />
                </Col>
              );
            })}
          </Row>
          {searchProductResult.length > 0 && (
            <h1
              className="title"
              style={{ marginTop: "3rem", fontSize: "1.5rem" }}
            >
              Sản phẩm bạn cần
            </h1>
          )}
          <Row gutter={[16, 16]}>
            {searchProductResult.map((item, idx) => {
              const { productId, name, basePrice, weightServing, images } =
                item;
              return (
                <Col span={6} key={idx} className="dish-col">
                  <Product {...item} />
                </Col>
              );
            })}
          </Row>
          {searchResults.length !== 0 && (
            <Pagination
              onClickNext={handleClickNext}
              onClickPrev={handleClickPrev}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;

// const searchResults = [
//   {
//     id: 1,
//     img_url:
//       "https://media.cooky.vn/recipe/g1/393/s320x240/Recipe393-635402710349446250.jpg",
//     dish_name: "Cháo thịt heo bí đỏ",
//     love_count: 12,
//     time: "30p",
//     level: "Dễ",
//     view: 20,
//   },
//   {
//     id: 2,
//     img_url:
//       "https://media.cooky.vn/recipe/g6/50880/s320x240/cooky-recipe-637102372207865706.png",
//     dish_name: "Smoothie xoài chuối kiwi",
//     love_count: 24,
//     time: "30p",
//     level: "Dễ",
//     view: 20,
//   },
//   {
//     id: 3,
//     img_url:
//       "https://media.cooky.vn/recipe/g2/15298/s320x240/recipe15298-635736102975470370.jpg",
//     dish_name: "Bánh bông lan trà xanh",
//     love_count: 31,
//     time: "30p",
//     level: "Dễ",
//     view: 20,
//   },
//   {
//     id: 4,
//     img_url:
//       "https://media.cooky.vn/recipe/g3/20185/s320x240/cooky-recipe-636318376852793754.jpg",
//     dish_name: "Bún chay kiểu Huế",
//     love_count: 145,
//     time: "30p",
//     level: "Dễ",
//     view: 20,
//   },
//   {
//     id: 5,
//     img_url:
//       "https://media.cooky.vn/recipe/g1/3030/s320x240/recipe3030-635643660376673456.jpg",
//     dish_name: "Cá Basa kho tộ",
//     love_count: 44,
//     time: "30p",
//     level: "Dễ",
//     view: 20,
//   },
//   {
//     id: 6,
//     img_url:
//       "https://media.cooky.vn/recipe/g1/4014/s320x240/recipe4014-636009205974008541.jpg",
//     dish_name: "Cơm chiên Dương Châu",
//     love_count: 122,
//     time: "30p",
//     level: "Dễ",
//     view: 20,
//   },
//   {
//     id: 7,
//     img_url:
//       "https://media.cooky.vn/recipe/g5/48083/s320x240/cooky-recipe-cover-r48083.jpg",
//     dish_name: "Đậu hũ om rau nấm rơm",
//     love_count: 12,
//     time: "30p",
//     level: "Dễ",
//     view: 20,
//   },
//   {
//     id: 8,
//     img_url:
//       "https://media.cooky.vn/recipe/g5/48084/s320x240/cooky-recipe-cover-r48084.jpg",
//     dish_name: "Canh đu đủ hầm nấm rơm",
//     love_count: 12,
//     time: "30p",
//     level: "Dễ",
//     view: 20,
//   },
// ];
