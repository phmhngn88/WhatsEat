import React, { useState, useEffect } from "react";
import "./RatingCard.css";
import StarRatings from "react-star-ratings";
const RatingCard = ({
  storeReviewId,
  rating,
  comment,
  storeId,
  customerId,
}) => {
  return (
    <div className="rating-card">
      <div className="rating-card-nav">
        <p>Người mua: NhatHiepisme</p>
        <p>ID đơn hàng: {storeReviewId}</p>
      </div>
      <div className="rating-info">
        <div className="product-info">
          <div className="img-box">
            <img
              src={
                "https://image.cooky.vn/posproduct/g0/6997/s/8f099d38-a334-4315-8be3-5c4a3ead7ee2.jpeg"
              }
              alt="whatseat"
            />
          </div>
          <p className="item-name">name of item</p>
        </div>
        <div className="rating-content">
          <div className="star-box">
            <StarRatings
              rating={rating}
              starRatedColor="brown"
              numberOfStars={5}
              name="rating"
              starDimension="25px"
              starSpacing="3px"
            />
          </div>
          <div className="content-box">{comment}</div>
          <div className="img-box"></div>
          <p className="rate-time">25/10/2021</p>
        </div>
        <div className="shop-reply">
          <p className="reply-content">Thank you so much</p>
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
