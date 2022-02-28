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
            <h1>Profile content</h1>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopProfile;
