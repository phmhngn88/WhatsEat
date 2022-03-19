import React, { useState } from "react";
import "./ShopAddItem.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ShopSidebar from "../../components/ShopSidebar/ShopSidebar";
import { BsPlus } from "react-icons/bs";

import { Form, Input, Modal } from "antd";
import "antd/dist/antd.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "Vui lòng nhập ${label}!",
  types: {
    email: "${label} không hợp lệ!",
    number: "${label} không hợp lệ!",
  },
};

const ShopAddItem = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="shop-add-item">
      <Navbar />
      <div className="shop-add-item-fluid">
        <div className="shop-add-item-container">
          <ShopSidebar />
          <div className="content-container">
            <h1 className="title">Thêm sản phẩm</h1>
            <p className="note">
              Thêm sản phẩm mới và bán hàng cùng với WhatsEat!
            </p>
            <div className="basic-info">
              <h3>Thông tin sản phẩm</h3>
              <div className="detail-info">
                <div className="register-form">
                  <Form
                    {...layout}
                    name="nest-messages"
                    validateMessages={validateMessages}
                  >
                    <Form.Item
                      className="input"
                      name="name"
                      label="Tên sản phẩm"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Nhập tên sản phẩm..." />
                    </Form.Item>

                    <Form.Item
                      className="input"
                      name="unit"
                      label="Đơn vị"
                      rules={[{required: true }]}
                    >
                      <Input placeholder="Nhập rõ khối lượng/ đơn vị (1 con, 300g,...)" />
                    </Form.Item>

                    <Form.Item
                      className="input"
                      name="number"
                      label="Số lượng"
                      rules={[{required: true }]}
                    >
                      <Input placeholder="Nhập số lượng còn trong kho..." />
                    </Form.Item>
        
                    <Form.Item
                      className="input"
                      name="image"
                      label="Hình ảnh"
                      rules={[{ required: true }]}
                    >
                      <button
                        className="btn add-img-btn"
                        onClick={showModal}
                      >
                        <BsPlus className="plus-icon" /> Thêm
                      </button>

                    </Form.Item>
                    <Form.Item
                      className="input"
                      name="description"
                      label="Mô tả sản phẩm"
                    >
                      <Input.TextArea placeholder="Nhập mô tả..." />
                    </Form.Item>
                    <Form.Item
                      className="input"
                      wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
                    >
                      <button className="btn submit-btn">Lưu thông tin</button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopAddItem;
