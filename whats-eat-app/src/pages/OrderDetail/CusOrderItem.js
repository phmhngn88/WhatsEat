import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./OrderDetail.css";

const CusOrderItem = ({ productId, price }) => {
  const [orderInfo, setOrderInfo] = useState();
  const [store, setStore] = useState();
  const navigate = useNavigate();

  const getStore = () => {
    if (orderInfo) {
      axios({
        method: "get",
        url: `https://localhost:7029/api/Store/${orderInfo.storeId || 1}`,
      })
        .then((res) => {
          const result = res.data;
          setStore(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    axios({
      method: "get",
      url: `https://localhost:7029/api/Product/${productId}`,
    })
      .then((res) => {
        const result = res.data;
        setOrderInfo(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!store) getStore();

  if (!orderInfo || !store) return <p>Loading</p>;

  return (
    <>
      <div
        className="shop-name"
        style={{ cursor: "pointer" }}
        onClick={() =>
          navigate(`/viewshop/${store.storeId}`, {
            state: {
              storeId: store.storeId,
            },
          })
        }
      >
        {store.shopName}{" "}
      </div>
      <div className="order-block">
        <div className="item-info">
          <img
            className="item-img"
            src={orderInfo.images[0][0].url || ""}
            alt={orderInfo.name || "default name"}
          />
          <h3>{orderInfo.name || "default name"}</h3>
        </div>
        <h3 className="price">
          {price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </h3>
      </div>
    </>
  );
};

export default CusOrderItem;
