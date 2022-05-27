import React from "react";
import ShopSidebar from "../ShopSidebar/ShopSidebar";
import CustomLineChart from "../Charts/CustomLineChart";
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
              <h1>Doanh thu trong ngày</h1>
              <CustomLineChart data={mock_data_income} />
            </div>
            <div className="best-seller-product">
              <h1>Doanh thu trong ngày</h1>
              <CustomLineChart data={mock_data_income} />
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
