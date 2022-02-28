import React from "react";
import "./ShopOrders.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ShopSidebar from "../../components/ShopSidebar/ShopSidebar";

const ShopOrders = () => {
  return (
    <div className="shop-orders">
      <Navbar />
      <div className="shop-orders-fluid">
        <div className="shop-orders-container">
          <ShopSidebar />
          <div className="content-container">
            <h1>Shop Orders</h1>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopOrders;
