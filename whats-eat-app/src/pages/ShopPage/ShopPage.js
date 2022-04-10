import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Shop from "../../components/Shop/Shop";
import "./ShopPage.css";

const ShopPage = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  return (
    <div className="shop">
      <div className="shop-fluid">
        {isRegistered ? (
          <Shop />
        ) : (
          <div className="shop-container">
            <h1 className="title-container">
              Đăng ký trở thành Người bán WhatsEat
            </h1>
            <div className="content">
              <img
                className="not-register-img"
                src="https://deo.shopeesz.com/shopee/pap-admin-live-sg/upload/upload_9dab85081088531ee6d1aa958a90f55e.png"
                alt="intro"
              />
              <h2 className="title">Chào mừng đến WhatsEat</h2>
              <p>
                Để đăng ký bán hàng trên WhatsEat, bạn cần cung cấp một số thông
                tin cơ bản.
              </p>
              <Link to="/shop/register" className="register-btn">
                Đăng ký
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ShopPage;
