import React, { useState } from "react";
import "./LoginPage.css";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, message } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../../actions/userActions";

const LoginPage = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();
  const getPassword = (event) => {
    setPassword(event.target.value);
  };
  const getEmail = (event) => {
    setEmail(event.target.value);
  };
  const dispatch = useDispatch();
  const handleSubmit = () => {
    login({ email, password });
    setTimeout(() => {
      navigate(`/`);
    }, 1000);
    // axios({
    //   method: "POST",
    //   url: "https://localhost:7029/api/auth/login",
    //   data: {
    //     email: email,
    //     password: password,
    //   },
    // })
    // .then((res) => {
    //   localStorage.setItem("token", res.data.token);
    //   dispatch(signin(res.data.email, res.data.id));
    //   message.success("Đăng nhập thành công!");
    //   setIsLoggedin(true);
    //   setTimeout(() => {
    //     navigate(`/`, {
    //       state: {
    //         email: email,
    //       },
    //     });
    //   }, 1000);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };
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
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        >
          <Input
            prefix={<AiOutlineMail className="site-form-item-icon" />}
            placeholder="Email"
            onChange={getEmail}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message:
                "Mật khẩu phải bao gồm ít nhất 8 ký tự, chứa cả chữ thường, in hoa, số và lý tự đặc biệt!",
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
            onChange={getPassword}
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
            onClick={handleSubmit}
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
