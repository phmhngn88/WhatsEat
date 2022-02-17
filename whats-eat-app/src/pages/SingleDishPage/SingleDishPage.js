import React from "react";
import "./SingleDishPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const SingleDishPage = () => {
  return (
    <div className="single-dish">
      <Navbar />
      <h1>Single Dish Page</h1>
      <Footer />
    </div>
  );
};

export default SingleDishPage;
