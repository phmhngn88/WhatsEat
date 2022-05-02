import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Form, DatePicker, Select } from 'antd';
const { Option } = Select;
const ModalCalo = ({ isModalVisible, handleOk, handleCancel}) => {
    const [gender, setGender] = useState(1)
    const [pal, setPal] = useState(0)
    const [year, setYear] = useState('')

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
            <Modal title="Bảng tính calo hằng ngày" visible={isModalVisible} onOk={onClick} onCancel={handleCancel}>
                <Form labelCol={{
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
                        <DatePicker onChange={onChange} picker="year" />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Giới tính">
                        <Select
                            value={gender}
                            style={{
                                width: 150,
                                margin: '0 8px',
                            }}
                            onChange={onGenderChange}
                        >
                            <Option value="0">Nam</Option>
                            <Option value="1">Nữ</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="PAL"
                        label="Mức độ hoạt động ">
                        <Select
                            value={pal}
                            style={{
                                width: 150,
                                margin: '0 8px',
                            }}
                            onChange={onPALChange}
                        >
                            <Option value="0">Ít</Option>
                            <Option value="1">Vừa</Option>
                            <Option value="2">Nhiều</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalCalo;