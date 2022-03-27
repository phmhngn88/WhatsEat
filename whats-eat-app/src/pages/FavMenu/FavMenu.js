import React from "react";
import "./FavMenu.css";
import { getCurrentDate } from "../../utils/GetDate";
import FavMenuCard from "../../components/FavMenuCard/FavMenuCard";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "antd/dist/antd.css";
import { Row, Col } from "antd";

const FavMenu = () => {
  return (
    <div className="fav-menu">
      <Navbar />
      <div className="fav-menu-fluid">
        <div className="fav-menu-container">
          <div className="profile">
            <img
              src="	https://media.cooky.vn/usr/g72/718990/avt/c100x100/cooky-avatar-637801641608093347.jpg"
              alt=""
            />
            <p className="username">Trần Nhật Hiệp</p>
            <h1>Thực Đơn Yêu Thích</h1>
            <p className="date-update">cập nhật ngày {getCurrentDate()}</p>
          </div>
          <div className="more-menu">
            <button>Thêm gợi ý thực đơn...</button>
          </div>
          <Row gutter={[16, 16]}>
            {recommendedMenu.map((menu, idx) => (
              <Col span={6} key={idx} className="dish-col">
                <FavMenuCard {...menu} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FavMenu;

const recommendedMenu = [
  {
    id: 1,
    menu: [
      {
        id: 1,
        dish_name: "Ba Chỉ Rim Tôm Khô",
      },
      {
        id: 2,
        dish_name: "Củ kiệu ngâm chanh dây",
      },
      {
        id: 3,
        dish_name: "Trà vải tươi",
      },
    ],
  },
  {
    id: 2,
    menu: [
      {
        id: 1,
        dish_name: "Ba Chỉ Rim Tôm Khô",
      },
      {
        id: 2,
        dish_name: "Củ kiệu ngâm chanh dây",
      },
      {
        id: 3,
        dish_name: "Trà vải tươi",
      },
    ],
  },
];
