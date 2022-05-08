import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Layout } from "antd";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import RecommendPage from "./pages/RecommendPage/RecommendPage";
import SingleDishPage from "./pages/SingleDishPage/SingleDishPage";
import SingleProductPage from "./pages/SingleProductPage/SingleProductPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import Cart from "./containers/Cart";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import FavRecipe from "./pages/FavRecipe/FavRecipe";
import FavMenu from "./pages/FavMenu/FavMenu";
import ShopPage from "./pages/ShopPage/ShopPage";
import ViewShopPage from "./pages/ViewShopPage/ViewShopPage";
import ShopAddress from "./pages/ShopAddress/ShopAddress";
import ShopAccount from "./pages/ShopAccount/ShopAccount";
import ShopProfile from "./pages/ShopProfile/ShopProfile";
import ShopRating from "./pages/ShopRating/ShopRating";
import ShopOrders from "./pages/ShopOrders/ShopOrders";
import ShopCategories from "./pages/ShopCategories/ShopCategories";
import OrderPage from "./pages/OrderPage/OrderPage";
import ShopRegisterPage from "./pages/ShopRegisterPage/ShopRegisterPage";
import ShopItems from "./pages/ShopItems/ShopItems";
import ShopAddItem from "./pages/ShopAddItem/ShopAddItem";
import ShopInfringingItems from "./pages/ShopInfringingItems/ShopInfringingItems";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FavorShop from "./pages/FavorShop/FavorShop";
import FavorItem from "./pages/FavorItem/FavorItem";
import OrderDetail from "./pages/OrderDetail/OrderDetail";
import AddRecipe from "./pages/AddRecipe/AddRecipe";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
const { Header, Content, Footer } = Layout;

function App({ auth, cartItems }) {
  return (
    <Layout className="mainLayout">
      <Router>
        <Header id="header">
          <Navbar auth={auth} cart={cartItems} />
        </Header>
        <Content>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/category/:id" element={<CategoryPage />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/payment" element={<PaymentPage />}></Route>
            <Route path="/recommender" element={<RecommendPage />}></Route>
            <Route path="/singledish/:id" element={<SingleDishPage />}></Route>
            <Route
              path="/singleproduct/:id"
              element={<SingleProductPage />}
            ></Route>
            <Route path="/search" element={<SearchPage />}></Route>
            <Route path="/fav/recipe" element={<FavRecipe />}></Route>
            <Route path="/fav/menu" element={<FavMenu />}></Route>
            <Route path="/shop" element={<ShopPage />}></Route>
            <Route path="/shop/profile" element={<ShopProfile />}></Route>
            <Route path="/shop/rating" element={<ShopRating />}></Route>
            <Route path="/shop/orders" element={<ShopOrders />}></Route>
            <Route path="/shop/address" element={<ShopAddress />}></Route>
            <Route path="/shop/account" element={<ShopAccount />}></Route>
            <Route path="/shop/categories" element={<ShopCategories />}></Route>
            <Route path="/shop/register" element={<ShopRegisterPage />}></Route>
            <Route path="/viewshop/:id" element={<ViewShopPage />}></Route>
            <Route path="/orders" element={<OrderPage />}></Route>
            <Route path="/orders/:id" element={<OrderDetail />}></Route>
            <Route path="/shop/items" element={<ShopItems />}></Route>
            <Route path="/shop/additem" element={<ShopAddItem />}></Route>
            <Route path="/addrecipe" element={<AddRecipe />}></Route>
            <Route
              path="/shop/infringingitems"
              element={<ShopInfringingItems />}
            ></Route>
            <Route path="/favorshop" element={<FavorShop />}></Route>
            <Route path="/favoritem" element={<FavorItem />}></Route>
            <Route path="/payment/success" element={<PaymentSuccess />}></Route>
          </Routes>
        </Content>
      </Router>
    </Layout>
  );
}

export default App;
