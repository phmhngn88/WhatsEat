import React, { useState } from "react";
import "./RegisterPage.css";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, message } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const getUserName = (event) => {
  //   setUserName(event.target.value);
  //   console.log(userName);
  // };
  // const getEmail = (event) => {
  //   setEmail(event.target.value);
  //   console.log(email);
  // };
  // const getPassword = (event) => {
  //   setPassword(event.target.value);
  // };
  const handleSubmit = () => {
    console.log(userName);
    console.log(email);
    console.log(password);
    axios({
      method: "post",
      url: "https://localhost:7029/api/auth/register",
      data: {
        userName: userName,
        email: email,
        password: password,
      },
    })
      .then((res) => {
        message.success("Đăng ký tài khoản thành công!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        message.error("Tên đăng nhập hoặc email đã tồn tại!");
      });
  };

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
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Tên đăng nhập"
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              pattern: new RegExp(
                "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
              ),
              message:
                "Mật khẩu phải bao gồm ít nhất 8 ký tự, chứa cả chữ thường, in hoa, số và ký tự đặc biệt!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Mật khẩu"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Mật khẩu nhắc lại phải trùng khớp!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu chưa trùng khớp!"));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Mật khẩu"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="register-form-button"
            onClick={handleSubmit}
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
