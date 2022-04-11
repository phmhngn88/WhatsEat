import { Form, Input, InputNumber, Select, Tabs } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Footer from "../../components/Footer/Footer";
import "./AddRecipe.css";


const props = {
    action: '//jsonplaceholder.typicode.com/posts/',
    listType: 'picture',
    previewFile(file) {
      console.log('Your upload file:', file);
      // Your process logic. Here we just mock to the same file
      return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
      method: 'POST',
        body: file,
      })
        .then(res => res.json())
        .then(({ thumbnail }) => thumbnail);
  },
  };


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

const AddRecipe = () => {
  const [type, setType] = useState(true);
  const { TabPane } = Tabs;
  function onChange(value) {
    console.log('changed', value);
  }

  const options = [
    { label: "Món khai vị", value: "Món khai vị" },
    { label: "Món tráng miệng", value: "Món tráng miệng" },
    { label: "Món chay", value: "Món chay" },
    { label: "Món chính", value: "Món chính" },
    { label: "Món ăn sáng", value: "Món ăn sáng" },
    { label: "Món nhanh và dễ", value: "Món nhanh và dễ" },
    { label: "Thức uống", value: "Thức uống" },
    { label: "Bánh - Bánh ngọt", value: "Bánh - Bánh ngọt" },
    { label: "Món ăn cho trẻ", value: "Món ăn cho trẻ" },
    { label: "Món nhậu", value: "Món nhậu" },
  ];
  
 

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
                      <InputNumber placeholder="Nhập khẩu phần..." className="recipe-input" min={1} max={10} onChange={onChange} />
                    </Form.Item>

                    <Form.Item
                      className="input"
                      name="type"
                      label="Loại món ăn"
                      rules={[{ required: true }]}
                    >
                      <Select
                        options={options}
                        onChange={(e) => setType(e.target.value)}
                        placeholder="Chọn loại món ăn..."
                      />
                    </Form.Item>
                    <Form.Item
                      className="input"
                      name="time"
                      label="Thời gian nấu"
                      rules={[{ required: true }]}
                    >   
                      <InputNumber placeholder="Nhập tổng thời gian (số phút) nấu..." className="recipe-input" min={1} max={2400} onChange={onChange} />
                    </Form.Item>
                    < Form.Item
                      className = "input"
                      name = "image"
                      label = "Hình minh họa"
                    >
                    < Upload { ...props}>
                      < Button icon ={< UploadOutlined />}> Hình ảnh món ăn</Button>
                     </Upload>
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
                      name="step"
                      label="Các bước nấu ăn"
                    >
                        <Tabs className="steps" defaultActiveKey="1" centered>
                        <TabPane tab="Bước 1" key="1" >
                        < Upload { ...props}>
                            < Button className="step" icon ={< UploadOutlined />}> Thêm hình ảnh</Button>
                        </Upload>
                        <Form.Item 
                        className="step-des"
                        name="step-1"
                        label="Hướng dẫn"
                        >
                        <Input.TextArea placeholder="Nhập hướng dẫn..." />
                        </Form.Item>
                        </TabPane>
                        <TabPane tab="Bước 2" key="2">
                        < Upload { ...props}>
                            < Button className="step" icon ={< UploadOutlined />}> Thêm hình ảnh</Button>
                        </Upload>
                        <Form.Item 
                        className="step-des"
                        name="step-2"
                        label="Hướng dẫn"
                        >
                        <Input.TextArea placeholder="Nhập hướng dẫn..." />
                        </Form.Item>
                        </TabPane>
                        <TabPane tab="Bước 3" key="3">
                        < Upload { ...props}>
                            < Button className="step" icon ={< UploadOutlined />}> Thêm hình ảnh</Button>
                        </Upload>
                        <Form.Item 
                        className="step-des"
                        name="step-3"
                        label="Hướng dẫn"
                        >
                        <Input.TextArea placeholder="Nhập hướng dẫn..." />
                        </Form.Item>                        
                        </TabPane>
                        <TabPane tab="Bước 4" key="4">
                        < Upload { ...props}>
                            < Button className="step" icon ={< UploadOutlined />}> Thêm hình ảnh</Button>
                        </Upload>
                        <Form.Item 
                        className="step-des"
                        name="step-4"
                        label="Hướng dẫn"
                        >
                        <Input.TextArea placeholder="Nhập hướng dẫn..." />
                        </Form.Item>                                                   
                        </TabPane>
                        <TabPane tab="Bước 5" key="5">
                        < Upload { ...props}>
                            < Button className="step" icon ={< UploadOutlined />}> Thêm hình ảnh</Button>
                        </Upload>
                        <Form.Item 
                        className="step-des"
                        name="step-5"
                        label="Hướng dẫn"
                        >
                        <Input.TextArea placeholder="Nhập hướng dẫn..." />
                        </Form.Item>                                                   
                        </TabPane>
                        <TabPane tab="Bước 6" key="6">
                        < Upload { ...props}>
                            < Button className="step" icon ={< UploadOutlined />}> Thêm hình ảnh</Button>
                        </Upload>
                        <Form.Item 
                        className="step-des"
                        name="step-6"
                        label="Hướng dẫn"
                        >
                        <Input.TextArea placeholder="Nhập hướng dẫn..." />
                        </Form.Item>                                                    
                        </TabPane>
                        <TabPane tab="Bước 7" key="7">
                        < Upload { ...props}>
                            < Button className="step" icon ={< UploadOutlined />}> Thêm hình ảnh</Button>
                        </Upload>
                        <Form.Item 
                        className="step-des"
                        name="step-7"
                        label="Hướng dẫn"
                        >
                        <Input.TextArea placeholder="Nhập hướng dẫn..." />
                        </Form.Item>                                                   
                        </TabPane>
                        <TabPane tab="Bước 8" key="8">
                        < Upload { ...props}>
                            < Button className="step" icon ={< UploadOutlined />}> Thêm hình ảnh</Button>
                        </Upload>
                        <Form.Item 
                        className="step-des"
                        name="step-8"
                        label="Hướng dẫn"
                        >
                        <Input.TextArea placeholder="Nhập hướng dẫn..." />
                        </Form.Item>                                                    
                        </TabPane>
                        <TabPane tab="Bước 9" key="9">
                        < Upload { ...props}>
                            < Button className="step" icon ={< UploadOutlined />}> Thêm hình ảnh</Button>
                        </Upload>
                        <Form.Item 
                        className="step-des"
                        name="step-9"
                        label="Hướng dẫn"
                        >
                        <Input.TextArea placeholder="Nhập hướng dẫn..." />
                        </Form.Item>                                                   
                        </TabPane>
                        <TabPane tab="Bước 10" key="10">
                        < Upload { ...props}>
                            < Button className="step" icon ={< UploadOutlined />}> Thêm hình ảnh</Button>
                        </Upload>
                        <Form.Item 
                        className="step-des"
                        name="step-10"
                        label="Hướng dẫn"
                        >
                        <Input.TextArea placeholder="Nhập hướng dẫn..." />
                        </Form.Item>                                                  
                        </TabPane>
                        <TabPane tab="Bước 11" key="11" >
                        < Upload { ...props}>
                            < Button className="step" icon ={< UploadOutlined />}> Thêm hình ảnh</Button>
                        </Upload>
                        <Form.Item 
                        className="step-des"
                        name="step-11"
                        label="Hướng dẫn"
                        >
                        <Input.TextArea placeholder="Nhập hướng dẫn..." />
                        </Form.Item>
                        </TabPane>
                        <TabPane tab="Bước 12" key="12">
                        < Upload { ...props}>
                            < Button className="step" icon ={< UploadOutlined />}> Thêm hình ảnh</Button>
                        </Upload>
                        <Form.Item 
                        className="step-des"
                        name="step-12"
                        label="Hướng dẫn"
                        >
                        <Input.TextArea placeholder="Nhập hướng dẫn..." />
                        </Form.Item>
                        </TabPane>
                        <TabPane tab="Bước 13" key="13">
                        < Upload { ...props}>
                            < Button className="step" icon ={< UploadOutlined />}> Thêm hình ảnh</Button>
                        </Upload>
                        <Form.Item 
                        className="step-des"
                        name="step-13"
                        label="Hướng dẫn"
                        >
                        <Input.TextArea placeholder="Nhập hướng dẫn..." />
                        </Form.Item>                        
                        </TabPane>
                        <TabPane tab="Bước 14" key="14">
                        < Upload { ...props}>
                            < Button className="step" icon ={< UploadOutlined />}> Thêm hình ảnh</Button>
                        </Upload>
                        <Form.Item 
                        className="step-des"
                        name="step-14"
                        label="Hướng dẫn"
                        >
                        <Input.TextArea placeholder="Nhập hướng dẫn..." />
                        </Form.Item>                                                   
                        </TabPane>
                        <TabPane tab="Bước 15" key="15">
                        < Upload { ...props}>
                            < Button className="step" icon ={< UploadOutlined />}> Thêm hình ảnh</Button>
                        </Upload>
                        <Form.Item 
                        className="step-des"
                        name="step-15"
                        label="Hướng dẫn"
                        >
                        <Input.TextArea placeholder="Nhập hướng dẫn..." />
                        </Form.Item>                                                   
                        </TabPane>                       
                        </Tabs>

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

export default AddRecipe;
