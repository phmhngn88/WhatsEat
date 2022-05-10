import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import Items from "../../components/Items/Items";
import ShopSidebar from "../../components/ShopSidebar/ShopSidebar";
import "./ShopItems.css";

const ShopItems = () => {
  const [listProducts, setListProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const storeId = 2;

  const getShopProducts = () => {
    axios({
      method: "get",
      url: `https://localhost:7029/api/Store/${storeId}/products?PageNumber=${pageNumber}&PageSize=30`,
    })
      .then((res) => {
        const result = res.data;
        setListProducts(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getShopProducts();
  }, [pageNumber]);
  return (
    <div className="shop-items">
      <div className="shop-items-fluid">
        <div className="shop-items-container">
          <ShopSidebar />
          <div className="content-container">
            <h1 className="title">Tất cả sản phẩm</h1>
            {/* <Items /> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopItems;
