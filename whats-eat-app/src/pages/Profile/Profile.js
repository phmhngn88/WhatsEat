import { Form, Input, message, Image } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import "./Profile.css";

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

const Profile = () => {
  const [image, setImage] = useState("");

  const token = useSelector((state) => state.auth.userInfo.token);
  const [form] = Form.useForm();

  const uploadImage = (value) => {
    const formData = new FormData();
    formData.append("file", value);
    formData.append("upload_preset", "utm6qcfl");

    axios
      .post(`https://api.cloudinary.com/v1_1/dexdbltsd/image/upload`, formData)
      .then((res) => {
        console.log("upload thanh cong");
        console.log(res.data.url);
        setImage(res.data.url);
        form.setFieldsValue({ image: res.data.url });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFormFinish = (values) => {
    console.log({ ...values, avatarUrl: image });
    // axios({
    //   method: "PUT",
    //   url: "https://localhost:7029/api/Customer",
    //   headers: { Authorization: `Bearer ${token}` },
    //   data: { ...values, idCard: 0, avatarUrl: image },
    // })
    //   .then((res) => {
    //     message.success("Cập nhật thông tin thành công!");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     message.error("Cập nhật thông tin thất bại!");
    //   });
  };

  return (
    <div className="cus-profile">
      <div className="cus-profile-fluid">
        <div className="cus-profile-container">
          <div className="content-container">
            <h1 className="title">Hồ sơ cá nhân</h1>
            <p className="note">Cập nhật hồ sơ cá nhân của bạn</p>
            <div className="basic-info">
              <h3>Thông tin cơ bản</h3>
              <div className="detail-info">
                <div className="register-form">
                  <Form
                    {...layout}
                    name="nest-messages"
                    validateMessages={validateMessages}
                    form={form}
                    onFinish={onFormFinish}
                  >
                    <Form.Item
                      className="input"
                      name="name"
                      label="Tên người dùng"
                    >
                      <Input placeholder="Nhập tên người dùng..." />
                    </Form.Item>
                    <Form.Item
                      className="input"
                      name="email"
                      label="Email người dùng"
                    >
                      <Input placeholder="Nhập email người dùng..." />
                    </Form.Item>
                    <Form.Item className="input" name="idCard" label="ID Card">
                      <Input type="number" placeholder="Nhập ID Card..." />
                    </Form.Item>
                    <Form.Item
                      className="input"
                      name="avatarUrl"
                      label="Hình minh họa"
                    >
                      <Input
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={(e) => {
                          uploadImage(e.target.files[0]);
                        }}
                      />
                      <Image width={200} src={image} />
                    </Form.Item>
                    {/* <Form.Item
                      className="input"
                      name="phoneNumber"
                      label="Số điện thoại"
                    >
                      <Input placeholder="Nhập số điện thoại mới..." />
                    </Form.Item>
                    <Form.Item
                      className="input"
                      name="address"
                      label="Địa chỉ lấy hàng"
                    >
                      <Input placeholder="Nhập địa chỉ mới..." />
                    </Form.Item>
                    <Form.Item
                      className="input"
                      name="description"
                      label="Mô tả"
                    >
                      <Input.TextArea placeholder="Nhập mô tả mới..." />
                    </Form.Item> */}
                    <Form.Item
                      className="input"
                      wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
                    >
                      <button type="submit" className="btn submit-btn">
                        Lưu thông tin
                      </button>
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

export default Profile;
