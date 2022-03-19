import React from "react";
import "./ShopItems.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ShopSidebar from "../../components/ShopSidebar/ShopSidebar";
import Items from "../../components/Items/Items";

const ShopItems = () => {
  return (
    <div className="shop-items">
      <Navbar />
      <div className="shop-items-fluid">
        <div className="shop-items-container">
          <ShopSidebar />
          <div className="content-container">
            <h1 className="title">Tất cả sản phẩm</h1>
            <Items/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopItems;
