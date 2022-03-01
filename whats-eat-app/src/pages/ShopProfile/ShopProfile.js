import React, { useState } from "react";
import "./ShopProfile.css";
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

const ShopProfile = () => {
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
    <div className="shop-profile">
      <Navbar />
      <div className="shop-profile-fluid">
        <div className="shop-profile-container">
          <ShopSidebar />
          <div className="content-container">
            <h1 className="title">Hồ Sơ Shop</h1>
            <p className="note">
              Xem tình trạng Shop và cập nhật hồ sơ Shop của bạn
            </p>
            <div className="basic-info">
              <h3>Thông tin cơ bản</h3>
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
                      label="Tên Shop"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Nhập tên shop mới..." />
                    </Form.Item>
                    <Form.Item
                      className="input"
                      name="email"
                      label="Email"
                      rules={[{ type: "email", required: true }]}
                    >
                      <Input placeholder="Bạn không được thay đổi Email!" />
                    </Form.Item>
                    <Form.Item
                      className="input"
                      name="phone"
                      label="Số điện thoại"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Nhập số điện thoại mới..." />
                    </Form.Item>
                    <Form.Item
                      className="input"
                      name="address"
                      label="Địa chỉ lấy hàng"
                      rules={[{ required: true }]}
                    >
                      <button
                        className="btn add-address-btn"
                        onClick={showModal}
                      >
                        <BsPlus className="plus-icon" /> Thêm
                      </button>
                      <Modal
                        title="Thêm địa chỉ mới"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        cancelText="Hủy"
                        okText="Lưu"
                      >
                        <div className="address-container">
                          <Form layout="vertical">
                            <Form.Item
                              label="Họ và Tên"
                              required
                              tooltip="Đây là thông tin bắt buộc"
                            >
                              <Input placeholder="Nhập vào" />
                            </Form.Item>
                            <Form.Item
                              label="Số điện thoại"
                              required
                              tooltip="Đây là thông tin bắt buộc"
                            >
                              <Input placeholder="Nhập vào" />
                            </Form.Item>
                            <Form.Item
                              label="Địa chỉ"
                              required
                              tooltip="Đây là thông tin bắt buộc"
                            >
                              <Input placeholder="Nhập vào" />
                            </Form.Item>
                          </Form>
                        </div>
                      </Modal>
                    </Form.Item>
                    <Form.Item
                      className="input"
                      name="description"
                      label="Mô tả"
                    >
                      <Input.TextArea placeholder="Nhập mô tả mới..." />
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

export default ShopProfile;
