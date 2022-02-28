import React from "react";
import "./ShopProfile.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ShopSidebar from "../../components/ShopSidebar/ShopSidebar";

const ShopProfile = () => {
  return (
    <div className="shop-profile">
      <Navbar />
      <div className="shop-profile-fluid">
        <div className="shop-profile-container">
          <ShopSidebar />
          <div className="content-container">
            <h1 className="title">Hồ Sơ Shop</h1>
            <p className="note">
              Xem tình trạng Shop và cập nhật hồ sơ Shop của bạn
            </p>
            <div className="basic-info">
              <h3>Thông tin cơ bản</h3>
              <div className="detail-info">Info container</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopProfile;
