import React from "react";
import "./FavMenu.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const FavMenu = () => {
  return (
    <div className="fav-menu">
      <Navbar />
      <div className="fav-menu-fluid">
        <div className="fav-menu-container">Favorite menu</div>
      </div>
      <Footer />
    </div>
  );
};

export default FavMenu;
