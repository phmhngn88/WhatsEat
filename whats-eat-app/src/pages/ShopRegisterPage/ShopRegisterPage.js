import React, { useState } from "react";
import "./ShopRegisterPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { BsPlus } from "react-icons/bs";

import { Form, Input, Modal } from "antd";
import "antd/dist/antd.css";
import { InfoCircleOutlined } from "@ant-design/icons";

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

const ShopRegisterPage = () => {
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
    <div className="shop-register">
      <Navbar />
      <div className="shop-register-fluid">
        <div className="shop-register-container">
          <h1 className="title-container">
            Đăng ký trở thành Người bán WhatsEat
          </h1>
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
                <Input />
              </Form.Item>
              <Form.Item
                className="input"
                name="email"
                label="Email"
                rules={[{ type: "email", required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                className="input"
                name="phone"
                label="Số điện thoại"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                className="input"
                name="address"
                label="Địa chỉ lấy hàng"
                rules={[{ required: true }]}
              >
                <button className="btn add-address-btn" onClick={showModal}>
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
                    {/* <div className="info">
                      <div className="detail">
                        <p className="label">Họ và Tên</p>
                        <Input placeholder="Nhập vào" />
                      </div>
                      <div className="detail">
                        <p className="label">Số điện thoại</p>
                        <Input placeholder="Nhập vào" />
                      </div>
                      <div className="detail">
                        <p className="label">Địa chỉ</p>
                        <Input placeholder="Nhập vào" />
                      </div>
                    </div> */}
                  </div>
                </Modal>
              </Form.Item>
              <Form.Item className="input" name="description" label="Mô tả">
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                className="input"
                wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
              >
                <button className="btn submit-btn">Đăng ký cửa hàng</button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopRegisterPage;
