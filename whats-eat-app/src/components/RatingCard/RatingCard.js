import React from "react";
import "./RatingCard.css";
import StarRatings from "react-star-ratings";
const RatingCard = ({
  order_ID,
  username,
  item_name,
  item_img,
  stars,
  rate_content,
  rate_time,
  is_reply,
  reply,
}) => {
  return (
    <div className="rating-card">
      <div className="rating-card-nav">
        <p>Người mua: {username}</p>
        <p>ID đơn hàng: {order_ID}</p>
      </div>
      <div className="rating-info">
        <div className="product-info">
          <div className="img-box">
            <img src={item_img} alt={item_name} />
          </div>
          <p className="item-name">{item_name}</p>
        </div>
        <div className="rating-content">
          <div className="star-box">
            <StarRatings
              rating={stars}
              starRatedColor="brown"
              numberOfStars={5}
              name="rating"
              starDimension="25px"
              starSpacing="3px"
            />
          </div>
          <div className="content-box">{rate_content}</div>
          <div className="img-box"></div>
          <p className="rate-time">{rate_time}</p>
        </div>
        <div className="shop-reply">
          <p className="reply-content">{reply}</p>
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
