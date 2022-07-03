import { Col, Row } from "antd";
import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BsFillPersonFill } from "react-icons/bs";
import Product from "../../components/Product/Product";
import Footer from "../../components/Footer/Footer";
import { getCurrentDate } from "../../utils/GetDate";
import "./FavProducts.css";

const FavProducts = () => {
  const [user, setUser] = useState();
  const [listProducts, setListProducts] = useState([]);
  const token = useSelector((state) => state.auth.userInfo.token);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${
        process.env.REACT_APP_ASP_API_KEY
      }/api/Product/love?PageNumber=${1}&PageSize=${30}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setListProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_ASP_API_KEY}/api/Customer`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (!user) return <></>;

  const [userId] = user.customerId.split("-");

  return (
    <div className="fav-recipe">
      <div className="fav-recipe-fluid">
        <div className="fav-recipe-container">
          <div className="profile">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="" />
            ) : (
              <BsFillPersonFill className="img-avt" />
            )}
            <p className="username">
              {user.name ? user.name : `user${userId}`}
            </p>
            <h1>Sản Phẩm Yêu Thích</h1>
            <p className="date-update">cập nhật ngày {getCurrentDate()}</p>
          </div>
          <Row gutter={[16, 16]}>
            {listProducts.map((item) => {
              const { productId, status } = item;
              if (!status) return <></>;
              return (
                <Col span={4} className="item-col" key={productId}>
                  <Product {...item} />
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FavProducts;
