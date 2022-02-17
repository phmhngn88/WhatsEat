import React from "react";
import "./RegisterPage.css";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="register-container">
      <h1 className="logo">WhatsEat</h1>
      <Form
        name="normal_register"
        className="register-form"
        initialValues={{ remember: true }}
      >
        <h1>Đăng ký tài khoản</h1>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        >
          <Input
            prefix={<AiOutlineMail className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Tên đăng nhập"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập lại mật khẩu!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Nhập lại mật khẩu"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="register-form-button"
          >
            Đăng ký
          </Button>
        </Form.Item>
        <p>
          Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>.
        </p>
        <p>
          <Link to="/">Về trang chủ</Link>
        </p>
      </Form>
    </div>
  );
};

export default RegisterPage;
