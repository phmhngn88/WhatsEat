import React from "react";
import ShopSidebar from "../ShopSidebar/ShopSidebar";
import CustomLineChart from "../Charts/CustomLineChart";
import CustomBarChart from "../Charts/CustomBarChart";
import CustomPieChart from "../Charts/CustomPieChart";
import "./Shop.css";

const Shop = ({ storeId }) => {
  return (
    <div className="shop-cpn">
      <div className="shop-cpn-fluid">
        <div className="shop-cpn-container">
          <ShopSidebar storeId={storeId} />
          <div className="content-container">
            <div className="monthly-income">
              <h1>Doanh thu theo từng ngày</h1>
              <CustomLineChart data={mock_data_income} />
            </div>
            <div className="best-seller-cate">
              <h1>Mặt hàng bán chạy nhất</h1>
              <div className="best-seller">
                <CustomBarChart
                  data={mock_data_best_seller_product}
                  labelX="Top 10 sản phẩm bán chạy nhất"
                  color="#fe7c00"
                />
                <CustomBarChart
                  data={mock_data_best_seller_cate}
                  labelX="Top 6 danh mục đắt hàng nhất"
                  color="#23a9f2"
                />
              </div>
            </div>
            <div className="best-seller-product">
              <h1>Tỉ lệ đơn hàng</h1>
              <CustomPieChart data={mock_data_order_rate} />
            </div>
            <div className="all-order-status">
              <h1>Doanh thu trong ngày</h1>
              <CustomLineChart data={mock_data_income} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

const mock_data_income = [
  {
    day: "Ngày 1",
    totalIncome: 3.5,
  },
  {
    day: "Ngày 2",
    totalIncome: 1.5,
  },
  {
    day: "Ngày 3",
    totalIncome: 1.7,
  },
  {
    day: "Ngày 4",
    totalIncome: 2.2,
  },
  {
    day: "Ngày 5",
    totalIncome: 2.5,
  },
  {
    day: "Ngày 6",
    totalIncome: 3,
  },
  {
    day: "Ngày 7",
    totalIncome: 2.8,
  },
  {
    day: "Ngày 8",
    totalIncome: 3.5,
  },
  {
    day: "Ngày 9",
    totalIncome: 4.2,
  },
  {
    day: "Ngày 10",
    totalIncome: 4,
  },
  {
    day: "Ngày 11",
    totalIncome: 2.9,
  },
  {
    day: "Ngày 12",
    totalIncome: 3.3,
  },
  {
    day: "Ngày 13",
    totalIncome: 3.1,
  },
  {
    day: "Ngày 14",
    totalIncome: 3,
  },
  {
    day: "Ngày 15",
    totalIncome: 2.7,
  },
];

const mock_data_best_seller_product = [
  {
    soLuong: 21,
    sanPhamId: "111111",
    tenSanPham: "Sản phẩm 1",
  },
  {
    soLuong: 17,
    sanPhamId: "111112",
    tenSanPham: "Sản phẩm 2",
  },
  {
    soLuong: 12,
    sanPhamId: "111113",
    tenSanPham: "Sản phẩm 3",
  },
  {
    soLuong: 8,
    sanPhamId: "111114",
    tenSanPham: "Sản phẩm 4",
  },
  {
    soLuong: 25,
    sanPhamId: "111115",
    tenSanPham: "Sản phẩm 5",
  },
  {
    soLuong: 30,
    sanPhamId: "111116",
    tenSanPham: "Sản phẩm 6",
  },
  {
    soLuong: 11,
    sanPhamId: "111117",
    tenSanPham: "Sản phẩm 7",
  },
  {
    soLuong: 24,
    sanPhamId: "111118",
    tenSanPham: "Sản phẩm 8",
  },
  {
    soLuong: 21,
    sanPhamId: "111119",
    tenSanPham: "Sản phẩm 9",
  },
  {
    soLuong: 13,
    sanPhamId: "111110",
    tenSanPham: "Sản phẩm 10",
  },
];
const mock_data_best_seller_cate = [
  {
    soLuong: 21,
    sanPhamId: "111111",
    tenSanPham: "Danh mục 1",
  },
  {
    soLuong: 17,
    sanPhamId: "111112",
    tenSanPham: "Danh mục 2",
  },
  {
    soLuong: 12,
    sanPhamId: "111113",
    tenSanPham: "Danh mục 3",
  },
  {
    soLuong: 8,
    sanPhamId: "111114",
    tenSanPham: "Danh mục 4",
  },
  {
    soLuong: 25,
    sanPhamId: "111115",
    tenSanPham: "Danh mục 5",
  },
  {
    soLuong: 30,
    sanPhamId: "111116",
    tenSanPham: "Danh mục 6",
  },
];

const mock_data_order_rate = [
  { name: "Chờ xác nhận", value: 400 },
  { name: "Đang giao hàng", value: 300 },
  { name: "Đã giao hàng", value: 300 },
  { name: "Đã hủy", value: 10 },
  { name: "Trả hàng/Hoàn tiền", value: 50 },
];
