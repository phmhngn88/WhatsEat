import React from "react";
import "./FavRecipe.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const FavRecipe = () => {
  return (
    <div className="fav-recipe">
      <Navbar />
      <div className="fav-recipe-fluid">
        <div className="fav-recipe-container">Favorite Recipe</div>
      </div>
      <Footer />
    </div>
  );
};

export default FavRecipe;
