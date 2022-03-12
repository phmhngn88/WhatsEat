import React from "react";
import "./CategoryPage.css";

import ProductCard from "../../components/ProductCard/ProductCard";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const CategoryPage = () => {
  return (
    <div className="category">
      <Navbar />
      <div className="category-fluid">
        <div className="category-container">
          <div className="option-btn-group">
            <button className="btn active-btn">Tất cả</button>
          </div>
          <div className="content">
            <h3 className="title">
              Thịt heo <span>{`(5 sản phẩm)`}</span>
            </h3>
            <div className="product-list">
              {mock_products.map((product, idx) => {
                return <ProductCard key={idx} {...product} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;

const mock_products = [
  {
    id: 1,
    product_name: "Bắp giò heo (nhập khẩu)",
    img_url:
      "https://image.cooky.vn/posproduct/g0/13852/s400x400/c6f09391-a974-4d05-9c47-d3096aded7c4.jpeg",
    quantity: "300-350g",
    provider: "CookyPICKS",
    sales_count: 400,
    price: 24000,
  },
  {
    id: 2,
    product_name: "Sườn non heo nhập khẩu nguyên bể",
    img_url:
      "	https://image.cooky.vn/posproduct/g0/16944/s400x400/cbc20c73-b3c9-47de-9774-4873d0075325.jpeg",
    quantity: "500g",
    provider: "DONA FARM",
    sales_count: 66,
    price: 74000,
  },
  {
    id: 3,
    product_name: "Cốt lết heo (thịt tươi)",
    img_url:
      "https://image.cooky.vn/posproduct/g0/11461/s400x400/00089da2-b61b-4528-9d63-167dfddf2c58.jpeg",
    quantity: "300g",
    provider: "CookyPICKS",
    sales_count: 2300,
    price: 23300,
  },
  {
    id: 4,
    product_name: "Tai heo (thịt tươi)",
    img_url:
      "https://image.cooky.vn/posproduct/g0/15472/s400x400/1bccd238-7a71-4f9f-a633-5eb96a984454.jpeg",
    quantity: "500-60g",
    provider: "CookyPICKS",
    sales_count: 174,
    price: 83000,
  },
  {
    id: 5,
    product_name: "Ba rọi heo (thịt tươi)",
    img_url:
      "https://image.cooky.vn/posproduct/g0/9593/s400x400/37b78803-7264-42da-a39c-c48d3796d803.jpeg",
    quantity: "300g",
    provider: "DONA FARM",
    sales_count: 5500,
    price: 47500,
  },
];
