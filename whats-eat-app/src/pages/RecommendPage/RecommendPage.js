import React from "react";
import "./RecommendPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Recommender from "../../components/Recommender/Recommender";

const RecommendPage = () => {
  return (
    <div className="recommend">
      <Navbar />
      <Recommender />
      <Footer />
    </div>
  );
};

export default RecommendPage;
