import React from "react";
import "./ShopInfringingItems.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ShopSidebar from "../../components/ShopSidebar/ShopSidebar";
import InfringingItems from "../../components/InfringingItems/InfringingItems";

const ShopInfringingItems = () => {
  return (
    <div className="shop-infringing-items">
      <Navbar />
      <div className="shop-infringing-items-fluid">
        <div className="shop-infringing-items-container">
          <ShopSidebar />
          <div className="content-container">
            <h1 className="title">Sản phẩm vi phạm</h1>
            <InfringingItems/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopInfringingItems;
