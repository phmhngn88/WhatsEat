import { Col, Row, Tabs } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { useSearchParams, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { BsFillPeopleFill, BsFillStarFill, BsShopWindow } from "react-icons/bs";
import { GiStabbedNote } from "react-icons/gi";
import Product from "../../components/Product/Product";
import Pagination from "../../components/Pagination/Pagination";
import Footer from "../../components/Footer/Footer";
import "./ViewShopPage.css";

const { TabPane } = Tabs;

const ViewShopPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [shopInfo, setShopInfo] = useState({});
  const [shopProducts, setShopProducts] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const location = useLocation();
  const storeId = location.state.storeId;

  const getShopInfo = () => {
    axios({
      method: "get",
      url: `https://localhost:7029/api/Store/${storeId}`,
    })
      .then((res) => {
        const result = res.data;
        setShopInfo(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getShopProducts = () => {
    axios({
      method: "get",
      url: `https://localhost:7029/api/Store/${storeId}/products?PageNumber=${pageNumber}&PageSize=30`,
    })
      .then((res) => {
        const result = res.data;
        setShopProducts(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const postLikeShop = () => {
    axios({
      method: "POST",
      url: `https://localhost:7029/api/Store/like/${storeId}`,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      data: {
        storeId: storeId,
      },
    })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteLikeShop = () => {
    axios({
      method: "DELETE",
      url: `https://localhost:7029/api/Store/dislike/${storeId}`,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      data: {
        storeId: storeId,
      },
    })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  const getLikeShop = () => {
    axios({
      method: "get",
      url: `https://localhost:7029/api/Store/is-like/${storeId}`,
    })
      .then((res) => {
        // setIsLiked(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickNext = () => {
    setPageNumber((pageNumber) => pageNumber + 1);
  };
  const handleClickPrev = () => {
    setPageNumber((pageNumber) => pageNumber - 1);
  };
  useEffect(() => {
    getShopInfo();
  }, []);

  useEffect(() => {
    getShopProducts();
  }, [pageNumber]);

  useEffect(() => {
    getLikeShop();
  }, []);

  useEffect(() => {
    if (isLiked) {
      postLikeShop();
    } else deleteLikeShop();
  }, [isLiked]);

  return (
    <div className="view-shop">
      <div className="view-shop-fluid">
        <div className="view-shop-container">
          <div className="shop-info-block">
            <div className="shop-img">
              <div className="img-box">
                <img
                  src={shopInfo.avatarUrl || ""}
                  alt={shopInfo.shopName}
                  className="avt-img"
                />
                <h2 className="shop-name">{shopInfo.shopName}</h2>
              </div>
              <div className="btn-box">
                <button className="btn" onClick={() => setIsLiked(true)}>
                  {isLiked ? "Hủy theo dõi" : "Theo dõi"}
                </button>
                <button className="btn">chat</button>
              </div>
            </div>
            <div className="shop-info">
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <BsShopWindow className="icon" />
                  Sản Phẩm: <span>78</span>
                </Col>
                <Col span={12}>
                  <BsFillPeopleFill className="icon" />
                  Người Theo Dõi: <span>1k</span>
                </Col>
                <Col span={12}>
                  <BsFillStarFill className="icon" />
                  Đánh Giá: <span>4.8</span>
                </Col>
                <Col span={12}>
                  <GiStabbedNote className="icon" />
                  Tỉ Lệ Hủy Đơn Của Shop: <span>3%</span>
                </Col>
              </Row>
            </div>
          </div>
          <div className="shop-products">
            <Tabs defaultActiveKey="1">
              <TabPane tab="TẤT CẢ SẢN PHẨM" key="1">
                <Row gutter={[16, 16]}>
                  {shopProducts.map((item) => {
                    const {
                      productId,
                      name,
                      basePrice,
                      weightServing,
                      images,
                    } = item;
                    return (
                      <Col span={4} className="item-col" key={productId}>
                        <Product {...item} />
                      </Col>
                    );
                  })}
                </Row>
              </TabPane>
              <TabPane tab="Category 1" key="2">
                Danh mục hàng 1
              </TabPane>
              <TabPane tab="Category 2" key="3">
                Danh mục hàng 2
              </TabPane>
              <TabPane tab="Category 3" key="4">
                Danh mục hàng 3
              </TabPane>
              <TabPane tab="Category 4" key="5">
                Danh mục hàng 4
              </TabPane>
              <TabPane tab="Category 5" key="6">
                Danh mục hàng 5
              </TabPane>
            </Tabs>
          </div>
          {shopProducts.length !== 0 && (
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

export default ViewShopPage;
