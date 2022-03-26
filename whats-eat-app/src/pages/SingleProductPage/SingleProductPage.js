import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SingleProductPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TopDishes from "../../components/TopDishes/TopDishes";
import TopItems from "../../components/TopItems/TopItems";
import { BsCartCheck, BsCartPlus, BsHeart } from "react-icons/bs";

const product = {
  id: 1,
  product_name: "Ba rọi heo (thịt tươi)",
  product_type: "đồ tươi",
  img_url:
    "https://image.cooky.vn/posproduct/g0/9593/s400x400/37b78803-7264-42da-a39c-c48d3796d803.jpeg",
  sale_count: 50,
  price: 42000,
  weight: "300g",
  brand: "dona farm",
  origin: "đồng nai",
  description:
    "Thịt ba rọi (ba chỉ) có lớp thịt và lớp mỡ xen kẽ đẹp mắt, chất thịt tươi mới, giàu dinh dưỡng. Bởi có hương vị thịt béo hài hòa đặc trưng nên ba rọi rất được ưa chuộng để chế biến nhiều món ngon hấp dẫn như luộc, chiên, nướng... đều tuyệt vời.",
};

const SingleProductPage = () => {
  const [productDetail, setProductDetail] = useState({});
  const {
    id,
    product_name,
    product_type,
    img_url,
    sale_count,
    price,
    weight,
    brand,
    origin,
    description,
  } = product;

  const getProductDetail = () => {
    axios({
      method: "get",
      url: `https://localhost:7029/api/Product/${id}`,
    })
      .then((res) => {
        const result = res.data;
        setProductDetail(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getProductDetail();
  }, []);
  return (
    <div className="single-product">
      <Navbar />
      <div className="single-product-fluid">
        <div className="single-product-container">
          <h1 className="title">Chi tiết món ăn</h1>
          <div className="product-block">
            <div className="img-container">
              <img src={img_url} alt={product_name} className="main-img" />
            </div>
            <div className="product-info">
              <h1 className="product-name">{product_name}</h1>
              <div className="detail">
                <h3 className="product-type">{product_type}</h3>
                <div className="sales-info">
                  <BsCartCheck className="cart-icon" />
                  <span>{sale_count}</span>
                </div>
              </div>
              <h1 className="price">
                {price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </h1>
              <div className="btn-block">
                <button className="btn save-btn">
                  <BsHeart className="icon" />
                  <span>Lưu</span>
                </button>
                <button className="btn cart-btn">
                  <BsCartPlus className="icon" />
                  <span>Thêm vào giỏ</span>
                </button>
                <button className="btn buy-btn">Mua ngay</button>
              </div>
              <div className="brand-info-block">
                <div>
                  <p>Định lượng</p>
                  <p className="content weight">{weight}</p>
                </div>
                <div>
                  <p>Thương hiệu</p>
                  <p className="content brand">{brand}</p>
                </div>
                <div>
                  <p>Xuất xứ</p>
                  <p className="content origin">{origin}</p>
                </div>
              </div>
              <div className="description-block">
                <h2>Mô tả sản phẩm</h2>
                <p>{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TopDishes />
      <TopItems />
      <Footer />
    </div>
  );
};

export default SingleProductPage;
