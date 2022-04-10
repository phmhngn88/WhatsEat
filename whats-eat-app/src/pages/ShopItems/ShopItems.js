import React from "react";
import Footer from "../../components/Footer/Footer";
import Items from "../../components/Items/Items";
import ShopSidebar from "../../components/ShopSidebar/ShopSidebar";
import "./ShopItems.css";

const ShopItems = () => {
  return (
    <div className="shop-items">
      <div className="shop-items-fluid">
        <div className="shop-items-container">
          <ShopSidebar />
          <div className="content-container">
            <h1 className="title">Tất cả sản phẩm</h1>
            <Items />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopItems;
