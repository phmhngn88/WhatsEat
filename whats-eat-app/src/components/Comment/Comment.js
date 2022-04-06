import React, { useState, useEffect } from "react";
import "./Comment.css";

import { message, Rate } from "antd";
import "antd/dist/antd.css";
import { AiOutlineCamera, AiFillStar, AiFillFileImage } from "react-icons/ai";
import { FiSend } from "react-icons/fi";

const Comment = () => {
  const [isCommented, setIsCommented] = useState(false);
  const [rateValue, setRateValue] = useState(5);
  const [comment, setComment] = useState("");

  if (isCommented) {
    return (
      <div className="comment-container">
        <h1 className="title">Bình luận</h1>
        <div className="rating-area">
          <Rate
            className="stars"
            onChange={(value) => setRateValue(value)}
            value={rateValue}
          />
        </div>
        <div className="comment-area">
          <textarea
            cols="30"
            rows="10"
            placeholder="Mô tả"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <div className="submit-area">
          <button className="btn img-load-btn">
            <AiFillFileImage className="img-icon" /> TẢI THÊM ẢNH
          </button>
          <button className="btn submit-btn">GỬI BÌNH LUẬN</button>
        </div>
      </div>
    );
  }

  return (
    <div className="comment-container">
      <h1 className="title">Bình luận</h1>
      <div className="comment-box" onClick={() => setIsCommented(true)}>
        <div className="comment-fluid">
          <AiOutlineCamera className="camera-icon" />
          <p>Đăng bình luận...</p>
        </div>
        <FiSend className="send-icon" />
      </div>
    </div>
  );
};

export default Comment;
