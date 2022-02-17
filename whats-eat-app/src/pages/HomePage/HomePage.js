import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Banner/Banner";
import Categories from "../../components/Categories/Categories";
import TopDishes from "../../components/TopDishes/TopDishes";
import TopItems from "../../components/TopItems/TopItems";

const HomePage = () => {
  return (
    <main>
      <Navbar />
      <Banner />
      <Categories />
      <TopDishes />
      <TopItems />
      <Footer />
    </main>
  );
};

export default HomePage;
