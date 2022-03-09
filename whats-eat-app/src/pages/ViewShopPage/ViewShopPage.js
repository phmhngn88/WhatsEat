import React from "react";
import "./ViewShopPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Row, Col, Tabs } from "antd";
import "antd/dist/antd.css";
import { BsShopWindow, BsFillPeopleFill, BsFillStarFill } from "react-icons/bs";
import { GiStabbedNote } from "react-icons/gi";

const { TabPane } = Tabs;

const shopInfo = {
  id: 1,
  shop_name: "thịt sạch nhập khẩu",
  shop_avt: "https://cf.shopee.vn/file/569ea6d6a8d2816a10d3a258e58d9ecc_tn",
  shop_background:
    "https://cf.shopee.vn/file/dcfd242ff453fa010aa6196af133a944_tn",
  products_quantity: 48,
  rating: "4.9",
  rating_num: 2000,
  products_list: [],
};

const ViewShopPage = () => {
  const {
    id,
    shop_name,
    shop_avt,
    shop_background,
    products_quantity,
    rating,
    rating_num,
  } = shopInfo;
  return (
    <div className="view-shop">
      <Navbar />
      <div className="view-shop-fluid">
        <div className="view-shop-container">
          <div className="shop-info-block">
            <div className="shop-img">
              <div className="img-box">
                <img src={shop_avt} alt={shop_name} className="avt-img" />
                <h2 className="shop-name">{shop_name}</h2>
              </div>
              <div className="btn-box">
                <button className="btn">Theo dõi</button>
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
                Tất cả sản phẩm của shop
              </TabPane>
              <TabPane tab="Category 1" key="2">
                Danh mục hàng 1
              </TabPane>
              <TabPane tab="Category 2" key="3">
                Danh mục hàng 2
              </TabPane>
              <TabPane tab="Category 3" key="3">
                Danh mục hàng 3
              </TabPane>
              <TabPane tab="Category 4" key="3">
                Danh mục hàng 4
              </TabPane>
              <TabPane tab="Category 5" key="3">
                Danh mục hàng 5
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewShopPage;
