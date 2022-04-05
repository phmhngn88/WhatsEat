import React, { useState, useEffect } from "react";
import "./RateItem.css";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import AnOrder from "../../components/AnOrder/AnOrder";
import "antd/dist/antd.css";
import { AiOutlineCamera, AiFillStar, AiFillFileImage } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { Upload } from 'antd';


const items = [
  {
    id: 0,
    item_name: "Gà Ta Bình Định Thả Vườn",
    img_url:
      "https://image.cooky.vn/posproduct/g0/6997/s/8f099d38-a334-4315-8be3-5c4a3ead7ee2.jpeg",
    price: 169000,
    quantity: "500g",
    status: 0,
  }
];

const RateItem = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [isCommented, setIsCommented] = useState(false);
  const props_rate = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    }
  };
  console.log(isCommented);
  useEffect(() => {
    setAllOrders(items);
  }, []);

  if (isCommented) {
    return (
  
    <div classname= "rate-item">
    <Navbar/>
      <div className="orders-fluid">
          <div className="orders-container">
          {items.map((order) => {
                return <AnOrder key={order.id} props={order} />;
              })}
          </div>
      </div>
      <div className="rate-container">
        <h1 className="title">Đánh giá sản phẩm</h1>
        <div className="rating-area">
          <AiFillStar className="star-icon" />
          <AiFillStar className="star-icon" />
          <AiFillStar className="star-icon" />
          <AiFillStar className="star-icon" />
          <AiFillStar className="star-icon" />
        </div>
        <div className="comment-area">
          <textarea cols="30" rows="10" placeholder="Mô tả"></textarea>
        </div>
        <div className="submit-area">
          <button className="btn img-load-btn">
            <Upload {...props_rate}>
                <AiFillFileImage className="img-icon" /> TẢI ẢNH LÊN
            </Upload>
          </button>
          <button className="btn submit-btn">GỬI ĐÁNH GIÁ</button>
        </div>
      </div>
        <Footer/>
    </div>
    );
  }

  return (
    <div classname= "rate-item">
    <Navbar/>
    <div className="orders">
      <div className="orders-fluid">
        <div className="orders-container">
              {allOrders.map((order) => {
                return <AnOrder key={order.id} props={order} />;
              })}
        </div>
      </div>
    </div>
    <div className="rate-container">
      <h1 className="title">Đánh giá sản phẩm</h1>
      <div className="comment-box" onClick={() => setIsCommented(true)}>
        <div className="comment-fluid">
          <AiOutlineCamera className="camera-icon" />
          <p>Nhập đánh giá...</p>
        </div>
        <FiSend className="send-icon" />
      </div>
    </div>
      <Footer/>
    </div>
  );
    
};




export default RateItem;
