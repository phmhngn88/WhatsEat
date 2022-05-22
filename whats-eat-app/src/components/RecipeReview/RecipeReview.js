import React, { useEffect, useState } from "react";
import "./RecipeReview.css";
import StarRatings from "react-star-ratings";
import { BsFillPersonFill } from "react-icons/bs";
import axios from "axios";

const RecipeReview = ({ recipeId }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://localhost:7029/api/Recipe/reviews?RecipeId=${recipeId}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
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
    <div className="recipe-reviews-container">
      <h1>Khám phá bình luận của người khác</h1>
      {reviews.length > 0 ? (
        reviews.map((review, idx) => {
          const { rating, comment, customer } = review;
          return (
            <div key={idx} className="single-review">
              {!customer.avatarUrl ? (
                <BsFillPersonFill className="avatar-img" />
              ) : (
                <img
                  className="avatar-img"
                  src={customer.avatarUrl}
                  alt="avatar"
                />
              )}
              <div className="review-detail">
                <p className="username">
                  {customer.name ? customer.name : customer.customerId}
                </p>
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
        <p>Chưa có bình luận nào cho món ăn này</p>
      )}
    </div>
  );
};

export default RecipeReview;

// const reviews = [
//   {
//     rating: 3,
//     comment: "Ngon qua!",
//     customer: {
//       name: "NhatHiepisme",
//       avatarUrl:
//         "https://image.cooky.vn/recipe/g6/50880/s240x240/cooky-recipe-637102378373968618.png",
//     },
//   },
//   {
//     rating: 5,
//     comment: "Xung dang 5 sao",
//     customer: {
//       name: "NhatHiephehe",
//       avatarUrl:
//         "https://image.cooky.vn/recipe/g6/50880/s240x240/cooky-recipe-637102378373968618.png",
//     },
//   },
//   {
//     rating: 4,
//     comment: "Rat de nau!",
//     customer: {
//       name: "NhatHiepsadboiz",
//       avatarUrl:
//         "https://image.cooky.vn/recipe/g6/50880/s240x240/cooky-recipe-637102378373968618.png",
//     },
//   },
// ];
