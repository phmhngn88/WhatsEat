import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Modal, Input, Form, DatePicker, Select, Steps, Button, message } from 'antd';
import './ModalCalo.css'
const { Option } = Select;
const { Step } = Steps;

const steps = [
    {
        title: 'Nhập thông tin',
    },
    {
        title: 'Lựa món yêu thích',
    }
];

const ModalCalo = ({ isModalVisible, handleOk, handleCancel }) => {
    const [form] = Form.useForm();

    const [gender, setGender] = useState(1)
    const [pal, setPal] = useState(0)
    const [year, setYear] = useState('')
    const [current, setCurrent] = React.useState(0);

    const next = () => {
        setCurrent(current + 1);
        console.log(form);
    };

    const prev = () => {
        setCurrent(current - 1);
    };


    const onGenderChange = (e) => {
        setGender(e)
    }

    const onPALChange = (e) => {
        setPal(e)
    }

    function onChange(date, dateString) {
        setYear(dateString)
        console.log(date, dateString);
    }

    const onClick = () => {
        handleOk(year, gender, pal)
    }

    return (
        <>
            <Modal width={1000} footer={null} title="Bảng tính calo hằng ngày" visible={isModalVisible}>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content">{
                    current === 0 ? <Form form={form} labelCol={{
                        span: 10,
                    }}
                        wrapperCol={{
                            span: 8,
                        }}
                        layout="horizontal"
                        size="default">
                        <Form.Item
                            name="year"
                            label="Năm sinh">
                            <DatePicker style={{width: "100%"}} />
                        </Form.Item>
                        <Form.Item
                            name="gender"
                            label="Giới tính">
                            <Select style={{alignItems:'flex-start',display: "flex"}}
                            >
                                <Option value="male">Nam</Option>
                                <Option value="female">Nữ</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="weight"
                            label="Cân nặng (kg)">
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            name="height"
                            label="Chiều cao (cm)">
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            name="PAL"
                            label="Mức độ hoạt động ">
                            <Select
                            >
                                <Option value="1.4">Ít</Option>
                                <Option value="1.6">Vừa</Option>
                                <Option value="1.8">Nhiều</Option>
                            </Select>
                        </Form.Item>
                    </Form> : <></>
                }</div>
                <div className="steps-action">
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Previous
                        </Button>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default ModalCalo;