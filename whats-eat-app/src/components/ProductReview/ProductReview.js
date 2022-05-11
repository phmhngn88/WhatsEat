import React, { useEffect, useState } from "react";
import "./ProductReview.css";
import StarRatings from "react-star-ratings";
import axios from "axios";

const ProductReview = ({ productId }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://localhost:7029/api/Product/reviews?ProductId=${productId}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
    })
      .then((res) => {
        console.log(res.data);
        setReviews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="product-reviews-container">
      <h1>Khám phá bình luận của người khác</h1>
      {reviews.length > 0 ? (
        reviews.map((review, idx) => {
          const { rating, comment, customer } = review;
          return (
            <div key={idx} className="single-review">
              <img
                className="avatar-img"
                src="https://image.cooky.vn/product/g6/50880/s240x240/cooky-product-6371023783739686.png"
                alt="avatar"
              />
              <div className="review-detail">
                <p className="username">{customer.customerId}</p>
                <StarRatings
                  rating={rating}
                  starRatedColor="brown"
                  numberOfStars={5}
                  name="rating"
                  starDimension="25px"
                  starSpacing="3px"
                />
                <p className="review-content">{comment}</p>
              </div>
            </div>
          );
        })
      ) : (
        <p>Chưa có bình luận nào cho sản phẩm này</p>
      )}
    </div>
  );
};

export default ProductReview;