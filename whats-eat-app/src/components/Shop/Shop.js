import React from "react";
import ShopSidebar from "../ShopSidebar/ShopSidebar";
import "./Shop.css";

const Shop = ({ storeId }) => {
  return (
    <div className="shop-cpn">
      <div className="shop-cpn-fluid">
        <div className="shop-cpn-container">
          <ShopSidebar storeId={storeId} />
          <div className="content-container">
            <h1>Content Container</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
