import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Banner/Banner";
import Categories from "../../components/Categories/Categories";
import TopDishes from "../../components/TopDishes/TopDishes";
import TopItems from "../../components/TopItems/TopItems";

import { useSearchParams, useLocation } from "react-router-dom";

const HomePage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const email = location.state.email;
  // const email = searchParams.get("email");

  return (
    <main>
      <Navbar email={email} />
      <Banner />
      <Categories />
      <TopDishes />
      <TopItems />
      <Footer />
    </main>
  );
};

export default HomePage;
