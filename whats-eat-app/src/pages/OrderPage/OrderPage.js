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

  const allUserOrders = {
    waiting: [],
    delivering: [],
    delivered: [],
    cancel: [],
  };

  allOrders.length > 0 &&
    allOrders.map((order) => {
      if (order.orderStatusHistories.length < 1) return;
      switch (
        order.orderStatusHistories[order.orderStatusHistories.length - 1]
          .orderStatus.value
      ) {
        case "waiting":
          allUserOrders.waiting.push(order);
          break;
        case "delivering":
          allUserOrders.delivering.push(order);
          break;
        case "delivered":
          allUserOrders.delivered.push(order);
          break;
        case "canceled":
          allUserOrders.cancel.push(order);
          break;
        default:
          allUserOrders.delivered.push(order);
      }
    });
  console.log({ allUserOrders });
  const onSearch = () => {};
  const getCustomerOrders = () => {
    axios({
      method: "get",
      url: `https://localhost:7029/api/Customer/orders-list?PageNumber=${pageNumber}&PageSize=${pageSize}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        const result = res.data;
        console.log({ result });
        setAllOrders(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCustomerOrders();
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
              {allOrders.length > 0 ? (
                allOrders.map((order) => {
                  return <Order key={order.orderId} {...order} />;
                })
              ) : (
                <p>Bạn chưa có đơn hàng nào!</p>
              )}
            </TabPane>
            <TabPane tab="Đang chờ xác nhận" key="2">
              {allUserOrders.waiting.length > 0 ? (
                allUserOrders.waiting.map((order) => {
                  return <Order key={order.orderId} {...order} />;
                })
              ) : (
                <p>Bạn chưa có đơn hàng đang chờ xác nhận nào!</p>
              )}
            </TabPane>

            <TabPane tab="Đang vận chuyển" key="3">
              {allUserOrders.delivering.length > 0 ? (
                allUserOrders.delivering.map((order) => {
                  console.log();
                  return <Order key={order.orderId} {...order} />;
                })
              ) : (
                <p>Bạn chưa có đơn hàng đang vận chuyển nào!</p>
              )}
            </TabPane>
            <TabPane tab="Đã giao" key="4">
              {allUserOrders.delivered.length > 0 ? (
                allUserOrders.delivered.map((order) => {
                  return <Order key={order.orderId} {...order} />;
                })
              ) : (
                <p>Bạn chưa có đơn hàng đã giao nào!</p>
              )}
            </TabPane>
            <TabPane tab="Đã hủy" key="5">
              {allUserOrders.cancel.length > 0 ? (
                allUserOrders.cancel.map((order) => {
                  return <Order key={order.orderId} {...order} />;
                })
              ) : (
                <p>Bạn chưa có đơn hàng đã hủy nào!</p>
              )}
            </TabPane>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderPage;
