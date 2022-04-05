import React, { useState, useEffect } from "react";
import "./OrderDetail.css";

import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const getOrder = () => {
    axios({
      method: "get",
      url: `https://localhost:7029/api/Customer/order/${id}`,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        const result = res.data;
        console.log(result);
        setOrder(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getOrder();
  }, []);
  return (
    <div className="order-detail">
      <Navbar />
      <div className="order-detail-fluid">
        <div className="order-detail-container">
          <h1 className="title" style={{ fontWeight: "650" }}>
            Chi tiết đơn hàng
          </h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetail;
