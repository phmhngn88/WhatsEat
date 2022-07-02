import { Input, Tabs } from "antd";
import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import Ratingcard from "../../components/RatingCard/RatingCard";
import ShopSidebar from "../../components/ShopSidebar/ShopSidebar";
import "./ShopRating.css";

const { TabPane } = Tabs;

const ShopRating = () => {
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const storeId = location.state.storeId;

  const ratingArr = [];
  reviews.map((review) => ratingArr.push(review.rating));
  const average = ratingArr.reduce((a, b) => a + b, 0) / ratingArr.length;

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_ASP_API_KEY}/api/Store/product-reviews?PageNumber=1&PageSize=80`,
    })
      .then((res) => {
        console.log(res.data);
        setReviews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(reviews);
  return (
    <div className="shop-rating">
      <div className="shop-rating-fluid">
        <div className="shop-rating-container">
          <ShopSidebar storeId={storeId} />
          <div className="content-container">
            <div className="shop-rating-nav">
              <div>
                <h1 className="title">Đánh Giá Shop</h1>
                <p className="note">Xem đánh giá shop của bạn</p>
              </div>
              <p className="evarage-rating">
                <span>{reviews.length > 0 ? average.toFixed(1) : 5}</span> / 5
              </p>
            </div>
            {reviews.length > 0 ? (
              <div className="rating-container">
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Tất cả" key="1">
                    <div className="table-title">
                      <p>Thông tin sản phẩm</p>
                      <p>Đánh giá của người mua</p>
                      <p>Trả lời đánh giá của bạn</p>
                    </div>
                    {reviews?.map((review, idx) => {
                      return <Ratingcard key={idx} {...review} />;
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
            ) : (
              <p>Cửa hàng của bạn chưa có đánh giá nào</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopRating;
