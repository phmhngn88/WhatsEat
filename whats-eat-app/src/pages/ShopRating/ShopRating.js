import React, { useState } from "react";
import "./ShopRating.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ShopSidebar from "../../components/ShopSidebar/ShopSidebar";
import Ratingcard from "../../components/RatingCard/RatingCard";
import { Tabs, Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const { TabPane } = Tabs;
const { Search } = Input;

const mock_rating = [
  {
    order_ID: 1,
    username: "aot2510",
    item_name: "Gà Ta Bình Định Thả Vườn",
    item_img:
      "https://image.cooky.vn/posproduct/g0/6997/s/8f099d38-a334-4315-8be3-5c4a3ead7ee2.jpeg",
    stars: 4,
    rate_content: "Sản phẩm chất lượng tuyệt vời",
    rate_time: "25/10/2021",
    is_reply: true,
    reply:
      "Cảm ơn bạn đã ủng hộ shop ạ, chúc bạn nhiều sức khỏe và mua đồ của shop nhiều hơn nhaaa!",
  },
  {
    order_ID: 2,
    username: "hiepsimattroi",
    item_name: "Thăn Lưng Bò Canada (Ribeye) Cắt Hotpot",
    item_img:
      "https://image.cooky.vn/posproduct/g0/15513/s400x400/66572bb6-d1ea-4221-a523-d33289117088.jpeg",
    stars: 5,
    rate_content:
      "Sản phẩm chất lượng tuyệt vời, lần sau mình sẽ ủng hộ shop tiếp ạ",
    rate_time: "25/10/2021",
    is_reply: true,
    reply:
      "Cảm ơn bạn đã ủng hộ shop ạ, chúc bạn nhiều sức khỏe và mua đồ của shop nhiều hơn nhaaa!",
  },
];

const ShopRating = () => {
  const [shopRating, setShopRating] = useState(5);
  return (
    <div className="shop-rating">
      <Navbar />
      <div className="shop-rating-fluid">
        <div className="shop-rating-container">
          <ShopSidebar />
          <div className="content-container">
            <div className="shop-rating-nav">
              <div>
                <h1 className="title">Đánh Giá Shop</h1>
                <p className="note">Xem đánh giá shop của bạn</p>
              </div>
              <p className="evarage-rating">
                <span>{shopRating}</span> / 5
              </p>
            </div>
            <div className="rating-container">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Tất cả" key="1">
                  <div className="table-title">
                    <p>Thông tin sản phẩm</p>
                    <p>Đánh giá của người mua</p>
                    <p>Trả lời đánh giá của bạn</p>
                  </div>
                  {mock_rating.map((rating, idx) => {
                    const {
                      order_ID,
                      username,
                      item_name,
                      item_img,
                      stars,
                      rate_content,
                      rate_time,
                      is_reply,
                      reply,
                    } = rating;
                    return <Ratingcard key={idx} {...rating} />;
                  })}
                </TabPane>
                <TabPane tab="Chưa trả lời" key="2">
                  <div className="table-title">
                    <p>Thông tin sản phẩm</p>
                    <p>Đánh giá của người mua</p>
                    <p>Trả lời đánh giá của bạn</p>
                  </div>
                  Những đánh giá chưa trả lời
                </TabPane>
                <TabPane tab="Đã trả lời" key="3">
                  <div className="table-title">
                    <p>Thông tin sản phẩm</p>
                    <p>Đánh giá của người mua</p>
                    <p>Trả lời đánh giá của bạn</p>
                  </div>
                  Những đánh giá đã trả lời
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopRating;