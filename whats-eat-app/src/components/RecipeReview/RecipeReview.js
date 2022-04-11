import React, { useEffect, useState } from "react";
import "./RecipeReview.css";

import axios from "axios";

const RecipeReview = ({ recipeId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://localhost:7029/api/Recipe/reviews",
    })
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div>Recipe review</div>;
};

export default RecipeReview;
