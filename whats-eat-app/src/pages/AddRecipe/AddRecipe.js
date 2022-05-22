import { Form, Input, Image, Select, message } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import "./AddRecipe.css";

const { TextArea } = Input;
const { Option } = Select;

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

const DoneButton = ({ onDone }) => {
  const [isDone, setIsDone] = useState(false);
  return (
    <button
      className={`btn done-btn${isDone ? " disable" : ""}`}
      onClick={() => {
        if (!isDone) {
          console.log("done");
          setIsDone(true);
          onDone();
        } else return;
      }}
    >
      {isDone ? "Đã xong bước" : "Xong bước"}
    </button>
  );
};

const AddRecipe = () => {
  const [image, setImage] = useState("");
  const [form] = Form.useForm();
  const [steps, setSteps] = useState(["textarea"]);
  const [stepsContent, setStepsContent] = useState("");
  const [stepsRecipe, setStepsRecipe] = useState([]);
  const [data, setData] = useState();
  const token = useSelector((state) => state.auth.userInfo.token);

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

  const handleAddStep = () => {
    console.log("Add step");
    setSteps((prevSteps) => [...prevSteps, "textarea"]);
  };

  const handleDoneBtn = () => {
    setStepsRecipe((prevArr) => [
      ...prevArr,
      {
        content: stepsContent,
        photos: [[{ url: "", height: 0, width: 0 }]],
      },
    ]);
  };

  const onFormFinish = (values) => {
    setData({
      ...values,
      serving: +values.serving,
      totalTime: +values.totalTime,
      thumbnailUrl: image,
    });
  };

  const handleAddRecipe = () => {
    console.log({ ...data, recipeSteps: stepsRecipe });
    axios({
      method: "POST",
      url: `https://localhost:7029/api/Recipe/recipe`,
      headers: { Authorization: `Bearer ${token}` },
      data: { ...data, recipeSteps: `${stepsRecipe}` },
    })
      .then((res) => {
        message.success("Thêm công thức thành công");
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(stepsRecipe);
  };

  return (
    <div className="add-recipe">
      <div className="add-recipe-fluid">
        <div className="add-recipe-container">
          <div className="content-container">
            <h1 className="title">Thêm công thức nấu ăn</h1>
            <p className="note">
              Tự tay thêm công thức và những bí kíp nấu ăn của riêng bạn
            </p>
            <div className="basic-info">
              <h3>Điền các thông tin bên dưới để thêm công thức</h3>
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
                      label="Tên món ăn"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Nhập tên món ăn..." />
                    </Form.Item>
                    <Form.Item
                      className="input"
                      name="serving"
                      label="Khẩu phần"
                      rules={[{ required: true }]}
                    >
                      <Input
                        placeholder="Nhập khẩu phần..."
                        className="recipe-input"
                        type="number"
                      />
                    </Form.Item>

                    <Form.Item
                      className="input"
                      name="recipeTypeIds"
                      label="Loại món ăn"
                      rules={[{ required: true }]}
                    >
                      <Select mode="multiple" placeholder="Chọn loại món ăn">
                        <Option value="1">Món khai vị</Option>
                        <Option value="2">Món tráng miệng</Option>
                        <Option value="3">Món chay</Option>
                        <Option value="4">Món chính</Option>
                        <Option value="5">Món ăn sáng</Option>
                        <Option value="6">Món nhanh và dễ</Option>
                        <Option value="7">Thức uống</Option>
                        <Option value="8">Bánh-Bánh ngọt</Option>
                        <Option value="9">Món ăn cho trẻ</Option>
                        <Option value="10">Món nhậu</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      className="input"
                      name="totalTime"
                      label="Thời gian nấu (phút)"
                      rules={[{ required: true }]}
                    >
                      <Input
                        placeholder="Nhập tổng thời gian (số phút) nấu..."
                        className="recipe-input"
                        type="number"
                      />
                    </Form.Item>
                    <Form.Item
                      className="input"
                      name="thumbnailUrl"
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
                    <Form.Item
                      className="input"
                      name="description"
                      label="Mô tả món ăn"
                    >
                      <Input.TextArea placeholder="Nhập mô tả món ăn..." />
                    </Form.Item>

                    <Form.Item
                      className="input"
                      name="recipeSteps"
                      label="Các bước nấu ăn"
                    >
                      <>
                        {steps.map((step, idx) => {
                          return (
                            <div className="single-step" key={idx}>
                              <p style={{ fontWeight: "bold" }}>
                                Bước {idx + 1}
                              </p>
                              <TextArea
                                placeholder={`Nhập bước ${idx + 1}`}
                                onChange={(e) =>
                                  setStepsContent(e.target.value)
                                }
                              />
                              <DoneButton onDone={handleDoneBtn} />
                            </div>
                          );
                        })}
                        <button
                          className="btn add-step-btn"
                          onClick={handleAddStep}
                        >
                          Thêm bước
                        </button>
                      </>
                    </Form.Item>
                    <Form.Item
                      className="input"
                      wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
                    >
                      <button
                        className="btn submit-btn"
                        onClick={handleAddRecipe}
                      >
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

export default AddRecipe;
