import React from "react";
import "./LoginPage.css";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="login-container">
      <h1 className="logo">WhatsEat</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
      >
        <h1>Đăng nhập</h1>
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
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Lưu thông tin</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Đăng nhập
          </Button>
        </Form.Item>
        <p>
          Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>.
        </p>
        <p>
          <Link to="/">Về trang chủ</Link>
        </p>
      </Form>
    </div>
  );
};

export default LoginPage;
