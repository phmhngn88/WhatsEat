import React from "react";
import "./SingleProductPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TopDishes from "../../components/TopDishes/TopDishes";
import TopItems from "../../components/TopItems/TopItems";
import RatingCard from "../../components/RatingCard/RatingCard";
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

const mock_rating = [
  {
    order_ID: 1,
    username: "lyquynhtram",
    item_name: "Ba rọi heo (thịt tươi)",
    item_img:
      "https://image.cooky.vn/posproduct/g0/9593/s400x400/37b78803-7264-42da-a39c-c48d3796d803.jpeg",
    stars: 4,
    rate_content: "Sản phẩm chất lượng tuyệt vời",
    rate_time: "25/10/2021",
    is_reply: true,
    reply:
      "Cảm ơn bạn đã ủng hộ shop ạ, chúc bạn nhiều sức khỏe và mua đồ của shop nhiều hơn nhaaa!",
  },
  {
    order_ID: 2,
    username: "hiepsimattroi",
    item_name: "Ba rọi heo (thịt tươi)",
    item_img:
      "https://image.cooky.vn/posproduct/g0/9593/s400x400/37b78803-7264-42da-a39c-c48d3796d803.jpeg",
    stars: 5,
    rate_content:
      "Sản phẩm chất lượng tuyệt vời, lần sau mình sẽ ủng hộ shop tiếp ạ",
    rate_time: "25/10/2021",
    is_reply: true,
    reply:
      "Cảm ơn bạn đã ủng hộ shop ạ, chúc bạn nhiều sức khỏe và mua đồ của shop nhiều hơn nhaaa!",
  },
  {
      order_ID: 3,
      username: "tranthivi",
      item_name: "Ba rọi heo (thịt tươi)",
      item_img:
        "https://image.cooky.vn/posproduct/g0/9593/s400x400/37b78803-7264-42da-a39c-c48d3796d803.jpeg",
      stars: 1,
      rate_content:
        "Sản phẩm quá tệ, không bao giờ mua lại",
      rate_time: "25/10/2021",
      is_reply: false,
      reply:
        "Bạn ơi có nhầm lẫn gì không ạ? Thịt bên mình đảm bảo tươi và ngon ạ :(",
    },
    {
      order_ID: 4,
      username: "dinhthiminhhieu",
      item_name: "Ba rọi heo (thịt tươi)",
      item_img:
        "https://image.cooky.vn/posproduct/g0/9593/s400x400/37b78803-7264-42da-a39c-c48d3796d803.jpeg",
      stars: 4,
      rate_content: "Sản phẩm cũng được, luộc chấm mắm nêm bá cháy",
      rate_time: "25/10/2021",
      is_reply: true,
      reply:
        "Cảm ơn bạn đã ủng hộ shop ạ, chúc bạn nhiều sức khỏe và mua đồ của shop nhiều hơn nhaaa!",
    },
    {
      order_ID: 5,
      username: "phamhoangan",
      item_name: "Ba rọi heo (thịt tươi)",
      item_img:
        "https://image.cooky.vn/posproduct/g0/9593/s400x400/37b78803-7264-42da-a39c-c48d3796d803.jpeg",
      stars: 5,
      rate_content:
        "Sản phẩm chất lượng tuyệt vời, mình kho ny mình khen nức nở hehe",
      rate_time: "25/10/2021",
      is_reply: true,
      reply:
        "Cảm ơn bạn đã ủng hộ shop ạ, chúc bạn và người yêu mãi mận nhaaa!",
    },
    {
        order_ID: 6,
        username: "nguyenvanhao",
        item_name: "Ba rọi heo (thịt tươi)",
        item_img:
          "https://image.cooky.vn/posproduct/g0/9593/s400x400/37b78803-7264-42da-a39c-c48d3796d803.jpeg",
        stars: 1,
        rate_content:
          "Sản phẩm ngon nhưng cờ Việt Nam có 1 sao nên :)))",
        rate_time: "25/10/2021",
        is_reply: false,
        reply:
          "Bạn ơi bạn đừng làm thế tội shop ạ :(",
      },
];

const SingleProductPage = () => {
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
  return (
    <div className="single-product">
      <Navbar />
      <div className="single-product-fluid">
        <div className="single-product-container">
          <h1 className="title">Chi tiết sản phẩm</h1>
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
          <div>
            <h2> Đánh giá sản phẩm</h2>
            <div>
            {mock_rating.map((rating, idx) => {
                    const {
                      order_ID,
                      username,
                      item_name,
                      item_img,
                      stars,
                      rate_content,
                      rate_time,
                      is_reply,
                      reply,
                    } = rating;
                    return <RatingCard key={idx} {...rating} />;
                  })}
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
