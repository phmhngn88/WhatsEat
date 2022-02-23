import React from "react";
import "./ViewShopPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const shopInfo = {
  id: 1,
  shop_name: "thịt sạch nhập khẩu",
  shop_avt: "https://cf.shopee.vn/file/569ea6d6a8d2816a10d3a258e58d9ecc_tn",
  shop_background:
    "https://cf.shopee.vn/file/dcfd242ff453fa010aa6196af133a944_tn",
  products_quantity: 48,
  rating: "4.9",
  rating_num: 2000,
  products_list: [],
};

const ViewShopPage = () => {
  const {
    id,
    shop_name,
    shop_avt,
    shop_background,
    products_quantity,
    rating,
    rating_num,
  } = shopInfo;
  return (
    <div className="view-shop">
      <Navbar />
      <div className="view-shop-fluid">
        <div className="view-shop-container">
          <div className="shop-info-block">
            <div className="shop-img">
              <div className="img-box">
                <img src={shop_avt} alt={shop_name} className="avt-img" />
                <h2 className="shop-name">{shop_name}</h2>
              </div>
              <div className="btn-box">
                <button className="btn">Theo dõi</button>
                <button className="btn">chat</button>
              </div>
            </div>
            <div className="shop-info"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewShopPage;
