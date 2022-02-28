import React from "react";
import ShopSidebar from "../ShopSidebar/ShopSidebar";
import "./Shop.css";

const Shop = () => {
  return (
    <div className="shop-cpn">
      <div className="shop-cpn-fluid">
        <div className="shop-cpn-container">
          <ShopSidebar />
          <div className="content-container">
            <h1>Content Container</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
