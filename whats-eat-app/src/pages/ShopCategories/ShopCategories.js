import { Space, Table } from "antd";
import "antd/dist/antd.css";
import React from "react";
import { AiOutlineEye, AiOutlinePlus } from "react-icons/ai";
import Footer from "../../components/Footer/Footer";
import ShopSidebar from "../../components/ShopSidebar/ShopSidebar";
import "./ShopCategories.css";

const columns = [
  {
    title: "Tên danh mục",
    dataIndex: "cateName",
    key: "cateName",
  },
  {
    title: "Sản phẩm",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    key: "action",
    render: (text) => (
      <Space size="middle">
        <a>Xem chi tiết</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: 1,
    cateName: "Các loại bánh",
    product: 6,
  },
  {
    key: 2,
    cateName: "Đồ ăn vặt",
    product: 25,
  },
  {
    key: 3,
    cateName: "Sữa - trứng",
    product: 13,
  },
  {
    key: 4,
    cateName: "Nhu yếu phẩm",
    product: 7,
  },
  {
    key: 5,
    cateName: "On Sale",
    product: 3,
  },
];

const ShopCategories = () => {
  return (
    <div className="shop-categories">
      <div className="shop-categories-fluid">
        <div className="shop-categories-container">
          <ShopSidebar />
          <div className="content-container">
            <div className="shop-category-nav">
              <h1 className="title">Danh mục của shop</h1>
              <div className="btn-group">
                <button className="btn preview-btn">
                  <AiOutlineEye /> <span>Xem trước</span>
                </button>
                <button className="btn add-btn">
                  <AiOutlinePlus /> <span>Thêm danh mục</span>
                </button>
              </div>
            </div>
            <div className="categories-table">
              <Table columns={columns} dataSource={data} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopCategories;
