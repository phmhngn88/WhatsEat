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
    status: "Chờ xác nhận",
  },
  {
    order_ID: 3,
    username: "tramcute",
    item_name: "Thăn Lưng Bò Canada (Ribeye) Cắt Hotpot",
    item_img:
      "https://image.cooky.vn/posproduct/g0/15513/s400x400/66572bb6-d1ea-4221-a523-d33289117088.jpeg",
    total: 190000,
    delivery: "Giao hàng nhanh",
    status: "Chờ lấy hàng",
  },
  {
    order_ID: 4,
    username: "an",
    item_name: "Gà Ta Bình Định Thả Vườn",
    item_img:
      "https://image.cooky.vn/posproduct/g0/6997/s/8f099d38-a334-4315-8be3-5c4a3ead7ee2.jpeg",
    total: 190000,
    delivery: "Giao hàng nhanh",
    status: "Đang giao",
  },
  {
    order_ID: 5,
    username: "vixinhdep",
    item_name: "Thăn Lưng Bò Canada (Ribeye) Cắt Hotpot",
    item_img:
      "https://image.cooky.vn/posproduct/g0/15513/s400x400/66572bb6-d1ea-4221-a523-d33289117088.jpeg",
    total: 190000,
    delivery: "Giao hàng nhanh",
    status: "Đã hủy",
  },
  {
    order_ID: 6,
    username: "hieudinh",
    item_name: "Thăn Lưng Bò Canada (Ribeye) Cắt Hotpot",
    item_img:
      "https://image.cooky.vn/posproduct/g0/15513/s400x400/66572bb6-d1ea-4221-a523-d33289117088.jpeg",
    total: 190000,
    delivery: "Giao hàng nhanh",
    status: "Trả hàng/hoàn tiền",
  },
];

var waitAccOrders= orders.filter(order => order.status==="Chờ xác nhận");
const waitShipOrders= orders.filter(order => order.status==="Chờ lấy hàng")
const shippingOrders= orders.filter(order => order.status==="Đang giao")
const shippedOrders= orders.filter(order => order.status==="Đã giao")
const canceledOrders= orders.filter(order => order.status==="Đã hủy")
const refundOrders= orders.filter(order => order.status==="Trả hàng/hoàn tiền")

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
                    <p>Tổng tiền</p>
                    <p>Trạng thái</p>
                    <p>Vận chuyển</p>
                    <p></p>
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
                  </div>         
                  {waitAccOrders.map((order, idx) => {
                    return <ShopOrderCard key={idx} props={order} />;
                  })}
                </TabPane>
                <TabPane tab="Chờ lấy hàng" key="3">
                  <div className="table-title">
                    <p className="product-name">Sản phẩm</p>
                    <p>Tổng đơn hàng</p>
                    <p>Trạng thái</p>
                    <p>Vận chuyển</p>
                  </div>
                  {waitShipOrders.map((order, idx) => {
                    return <ShopOrderCard key={idx} props={order} />;
                  })}
                </TabPane>
                <TabPane tab="Đang giao" key="4">
                  <div className="table-title">
                    <p className="product-name">Sản phẩm</p>
                    <p>Tổng đơn hàng</p>
                    <p>Trạng thái</p>
                    <p>Vận chuyển</p>
                  </div>
                  {shippingOrders.map((order, idx) => {
                    return <ShopOrderCard key={idx} props={order} />;
                  })}
                </TabPane>
                <TabPane tab="Đã giao" key="5">
                  <div className="table-title">
                    <p className="product-name">Sản phẩm</p>
                    <p>Tổng đơn hàng</p>
                    <p>Trạng thái</p>
                    <p>Vận chuyển</p>
                  </div>
                  {shippedOrders.map((order, idx) => {
                    return <ShopOrderCard key={idx} props={order} />;
                  })}
                </TabPane>
                <TabPane tab="Đã hủy" key="6">
                  <div className="table-title">
                    <p className="product-name">Sản phẩm</p>
                    <p>Tổng đơn hàng</p>
                    <p>Trạng thái</p>
                    <p>Vận chuyển</p>
                  </div>
                  {canceledOrders.map((order, idx) => {
                    return <ShopOrderCard key={idx} props={order} />;
                  })}
                </TabPane>
                <TabPane tab="Trả hàng/hoàn tiền" key="7">
                  <div className="table-title">
                    <p className="product-name">Sản phẩm</p>
                    <p>Tổng đơn hàng</p>
                    <p>Trạng thái</p>
                    <p>Vận chuyển</p>
                  </div>
                  {refundOrders.map((order, idx) => {
                    return <ShopOrderCard key={idx} props={order} />;
                  })}
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
