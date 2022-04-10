import React from "react";
import Footer from "../../components/Footer/Footer";
import Recommender from "../../components/Recommender/Recommender";
import "./RecommendPage.css";

const RecommendPage = () => {
  return (
    <div className="recommend">
      <Recommender />
      <Footer />
    </div>
  );
};

export default RecommendPage;
