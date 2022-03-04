import React from "react";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import RecommendPage from "./pages/RecommendPage/RecommendPage";
import SingleDishPage from "./pages/SingleDishPage/SingleDishPage";
import SingleProductPage from "./pages/SingleProductPage/SingleProductPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import Cart from "./components/Cart/Cart";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import ShopPage from "./pages/ShopPage/ShopPage";
import ViewShopPage from "./pages/ViewShopPage/ViewShopPage";
import ShopProfile from "./pages/ShopProfile/ShopProfile";
import ShopOrders from "./pages/ShopOrders/ShopOrders";
import ShopCategories from "./pages/ShopCategories/ShopCategories";
import OrderPage from "./pages/OrderPage/OrderPage";
import ShopRegisterPage from "./pages/ShopRegisterPage/ShopRegisterPage";
import ShopItems from "./pages/ShopItems/ShopItems";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/payment" element={<PaymentPage />}></Route>
        <Route path="/recommender" element={<RecommendPage />}></Route>
        <Route path="/singledish" element={<SingleDishPage />}></Route>
        <Route path="/singleproduct" element={<SingleProductPage />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/shop" element={<ShopPage />}></Route>
        <Route path="/shop/profile" element={<ShopProfile />}></Route>
        <Route path="/shop/orders" element={<ShopOrders />}></Route>
        <Route path="/shop/categories" element={<ShopCategories />}></Route>
        <Route path="/shop/register" element={<ShopRegisterPage />}></Route>
        <Route path="/viewshop" element={<ViewShopPage />}></Route>
        <Route path="/orders" element={<OrderPage />}></Route>
        <Route path="/shop/items" element={<ShopItems />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
