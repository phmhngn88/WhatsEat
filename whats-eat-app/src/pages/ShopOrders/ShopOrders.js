import { Tabs } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import ShopOrderCard from "../../components/ShopOrderCard/ShopOrderCard";
import ShopSidebar from "../../components/ShopSidebar/ShopSidebar";
import "./ShopOrders.css";

const { TabPane } = Tabs;

const orders = [
  {
    order_ID: 1,
    username: "aot2510",
    item_name: "Gà Ta Bình Định Thả Vườn",
    item_img:
      "https://image.cooky.vn/posproduct/g0/6997/s/8f099d38-a334-4315-8be3-5c4a3ead7ee2.jpeg",
    total: 190000,
    delivery: "Giao hàng nhanh",
    status: "Đã giao",
  },
  {
    order_ID: 2,
    username: "hiepsimattroi",
    item_name: "Thăn Lưng Bò Canada (Ribeye) Cắt Hotpot",
    item_img:
      "https://image.cooky.vn/posproduct/g0/15513/s400x400/66572bb6-d1ea-4221-a523-d33289117088.jpeg",
    total: 190000,
    delivery: "Giao hàng nhanh",
    status: "Đã giao",
  },
];

const ShopOrders = () => {
  const [shopOrders, setShopOrders] = useState([]);

  const getShopOrders = () => {
    axios({
      method: "get",
      url: `https://localhost:7029/api/Store/orders`,
    })
      .then((res) => {
        const result = res.data;
        setShopOrders(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getShopOrders();
  }, []);

  return (
    <div className="shop-orders">
      <div className="shop-orders-fluid">
        <div className="shop-orders-container">
          <ShopSidebar />
          <div className="content-container">
            <h1 className="title">Tất cả đơn hàng</h1>
            <p className="total-orders">Bạn đang có tất cả {} đơn hàng</p>
            <div className="orders">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Tất cả" key="1">
                  <div className="table-title">
                    <p className="product-name">Sản phẩm</p>
                    <p>Tổng đơn hàng</p>
                    <p>Trạng thái</p>
                    <p>Vận chuyển</p>
                    <p>Thao tác</p>
                  </div>
                  {orders.map((order, idx) => {
                    return <ShopOrderCard key={idx} props={order} />;
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
