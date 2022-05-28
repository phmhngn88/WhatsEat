import { Tabs } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import ShopOrderCard from "../../components/ShopOrderCard/ShopOrderCard";
import ShopSidebar from "../../components/ShopSidebar/ShopSidebar";
import "./ShopOrders.css";

const { TabPane } = Tabs;

const ShopOrders = () => {
  const [shopOrders, setShopOrders] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [productInfo, setProductInfo] = useState();
  const [defaultActiveKey, setDefaultActiveKey] = useState("1");
  const location = useLocation();
  const { storeId, defaultKey } = location.state;
  const token = useSelector((state) => state.auth.userInfo.token);

  const getShopOrders = () => {
    axios({
      method: "get",
      url: `https://localhost:7029/api/Store/${storeId}/orders`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        const result = res.data;
        setShopOrders(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleGetOrderDetails = () =>{
  //   axios({
  //     method: "get",
  //     url: `https://localhost:7029/api/Customer/${hh}`,
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //     .then((res) => {
  //       const result = res.data;
  //       console.log(result);
  //       setShopOrders(result);
  //       if(result.length > 0){
  //         handleGetOrderDetails()
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  useEffect(() => {
    setDefaultActiveKey(defaultKey);
  }, [defaultKey]);
  useEffect(() => {
    getShopOrders();
  }, []);

  return (
    <div className="shop-orders">
      <div className="shop-orders-fluid">
        <div className="shop-orders-container">
          <ShopSidebar storeId={storeId} />
          <div className="content-container">
            <h1 className="title">Tất cả đơn hàng</h1>
            <p className="total-orders">
              Bạn đang có tất cả {shopOrders.length} đơn hàng
            </p>
            <div className="orders">
              <Tabs defaultActiveKey={defaultKey}>
                <TabPane tab="Tất cả" key="1">
                  <div className="table-title">
                    <p className="product-name">Sản phẩm</p>
                    <p>Tổng đơn hàng</p>
                    <p>Trạng thái</p>
                    <p>Vận chuyển</p>
                    <p>Thao tác</p>
                  </div>
                  {shopOrders.length > 0 &&
                    shopOrders?.map((order, idx) => {
                      if (order.customer) {
                        return <ShopOrderCard key={idx} {...order} />;
                      }
                    })}
                </TabPane>
                <TabPane tab="Chờ xác nhận" key="2">
                  <div className="table-title">
                    <p className="product-name">Sản phẩm</p>
                    <p>Tổng đơn hàng</p>
                    <p>Trạng thái</p>
                    <p>Vận chuyển</p>
                    <p>Thao tác</p>
                  </div>
                  Những đơn hàng chờ xác nhận
                </TabPane>
                <TabPane tab="Chờ lấy hàng" key="3">
                  <div className="table-title">
                    <p className="product-name">Sản phẩm</p>
                    <p>Tổng đơn hàng</p>
                    <p>Trạng thái</p>
                    <p>Vận chuyển</p>
                    <p>Thao tác</p>
                  </div>
                  Những đơn hàng chờ lấy hàng
                </TabPane>
                <TabPane tab="Đang giao" key="4">
                  <div className="table-title">
                    <p className="product-name">Sản phẩm</p>
                    <p>Tổng đơn hàng</p>
                    <p>Trạng thái</p>
                    <p>Vận chuyển</p>
                    <p>Thao tác</p>
                  </div>
                  Những đơn hàng đang giao
                </TabPane>
                <TabPane tab="Đã giao" key="5">
                  <div className="table-title">
                    <p className="product-name">Sản phẩm</p>
                    <p>Tổng đơn hàng</p>
                    <p>Trạng thái</p>
                    <p>Vận chuyển</p>
                    <p>Thao tác</p>
                  </div>
                  Những đã giao
                </TabPane>
                <TabPane tab="Đã hủy" key="6">
                  <div className="table-title">
                    <p className="product-name">Sản phẩm</p>
                    <p>Tổng đơn hàng</p>
                    <p>Trạng thái</p>
                    <p>Vận chuyển</p>
                    <p>Thao tác</p>
                  </div>
                  Những đơn hàng đã hủy
                </TabPane>
                <TabPane tab="Trả hàng/hoàn tiền" key="7">
                  <div className="table-title">
                    <p className="product-name">Sản phẩm</p>
                    <p>Tổng đơn hàng</p>
                    <p>Trạng thái</p>
                    <p>Vận chuyển</p>
                    <p>Thao tác</p>
                  </div>
                  Những đơn hàng trả hàng/hoàn tiền
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopOrders;
