import { Input, Tabs } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Order from "../../components/Order/Order";
import "./OrderPage.css";

const { TabPane } = Tabs;
const { Search } = Input;

const items = [
  {
    id: 0,
    item_name: "Gà Ta Bình Định Thả Vườn",
    img_url:
      "https://image.cooky.vn/posproduct/g0/6997/s/8f099d38-a334-4315-8be3-5c4a3ead7ee2.jpeg",
    price: 169000,
    quantity: "500g",
    status: 0,
  },
  {
    id: 1,
    item_name: "Classic Romance Set",
    img_url:
      "https://image.cooky.vn/posproduct/g0/14322/s/587a187b-069d-479d-87b7-3d5299cd5382.jpeg",
    price: 159000,
    quantity: "1",
    status: 0,
  },
  {
    id: 2,
    item_name: "Thăn Lưng Bò Canada (Ribeye) Cắt Hotpot",
    img_url:
      "https://image.cooky.vn/posproduct/g0/15513/s400x400/66572bb6-d1ea-4221-a523-d33289117088.jpeg",
    price: 119000,
    quantity: "500g",
    status: 1,
  },
];

const OrderPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [allOrders, setAllOrders] = useState([]);
  const token = useSelector((state) => state.auth.userInfo.token);

  const onSearch = () => {};
  const getCustomerOrders = () => {
    axios({
      method: "get",
      url: `https://localhost:7029/api/Customer/orders-list?PageNumber=${pageNumber}&PageSize=${pageSize}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        const result = res.data;
        setAllOrders(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCustomerOrders();
  }, []);

  useEffect(() => {
    setAllOrders(items);
  }, []);
  return (
    <div className="orders">
      <div className="orders-fluid">
        <div className="orders-container">
          <h1 className="title" style={{ fontWeight: "650" }}>
            Đơn hàng của tôi
          </h1>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Tất cả đơn" key="1">
              {allOrders.map((order) => {
                return <Order key={order.id} props={order} />;
              })}
            </TabPane>
            <TabPane tab="Chờ thanh toán" key="2">
              {allOrders.map((order) => {
                return <Order key={order.id} props={order} />;
              })}
            </TabPane>
            <TabPane tab="Đang xử lý" key="3">
              {allOrders.map((order) => {
                return <Order key={order.id} props={order} />;
              })}
            </TabPane>
            <TabPane tab="Đang vận chuyển" key="4">
              Content of Tab Pane 4
            </TabPane>
            <TabPane tab="Đã giao" key="5">
              {allOrders.map((order) => {
                return <Order key={order.id} props={order} />;
              })}
            </TabPane>
            <TabPane tab="Đã hủy" key="6">
              Content of Tab Pane 6
            </TabPane>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderPage;
