import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../components/Footer/Footer";
import "./PaymentPage.css";
import axios from "axios";
import { Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../reducers/cart";
import { Modal, Form, Input } from "antd";

const { Option } = Select;

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deliver, setDeliver] = useState();
  const [choosenAddress, setChoosenAddress] = useState();
  const [addressList, setAddressList] = useState([]);
  const [shippingInfoId, setShippingInfoId] = useState();
  const [province, setProvince] = useState(0);
  const [provinceList, setProvinceList] = useState([]);
  const [district, setDistrict] = useState(0);
  const [districtList, setDistrictList] = useState([]);
  const [ward, setWard] = useState(0);
  const [wardList, setWardList] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(1);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.auth.userInfo.token);
  const getTotalPrice = (cartItems) => {
    return cartItems.reduce((total, cartItem) => {
      return cartItem.totalPrice + total;
    }, 0);
  };

  const carts = cartItems.map((item) => {
    const container = {};
    container.productId = item.productId;
    container.quantity = item.quantity;
    return container;
  });

  const [form] = Form.useForm();

  console.log(carts);

  const handleConfirm = () => {
    axios({
      method: "POST",
      url: "https://localhost:7029/api/Customer/order",
      headers: { Authorization: `Bearer ${token}` },
      data: {
        paymentMethodId: paymentMethod,
        shippingInfoId: shippingInfoId,
        productList: carts,
      },
    })
      .then((res) => {
        dispatch(clearCart());
        navigate(`/payment/success`);
      })
      .catch((err) => {
        message.error("Đặt hàng không thành công!");
      });
  };

  const [isAddAddressModalVisible, setIsAddAddressModalVisible] =
    useState(false);
  const [isChooseAddressModalVisible, setIsChooseAddressModalVisible] =
    useState(false);
  const showAddAddressModal = () => {
    setIsAddAddressModalVisible(true);
  };

  const showChooseAddressModal = () => {
    axios({
      method: "GET",
      url: "https://localhost:7029/api/Customer/shippingInfos",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res.data);
        setAddressList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsChooseAddressModalVisible(true);
  };

  const handleCancelAddAddress = () => {
    setIsAddAddressModalVisible(false);
  };

  const handleCancelChooseAddress = () => {
    setIsChooseAddressModalVisible(false);
  };

  const handleGetDistrict = (id) => {
    axios({
      method: "GET",
      url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
      headers: { token: `a11d1949-dc33-11ec-987f-ea8994b0d064` },
      params: {
        province_id: +id,
      },
    })
      .then((res) => {
        setDistrictList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleGetWard = (id) => {
    axios({
      method: "GET",
      url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",
      headers: { token: `a11d1949-dc33-11ec-987f-ea8994b0d064` },
      params: {
        district_id: +id,
      },
    })
      .then((res) => {
        setWardList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitShippingInfo = (values) => {
    console.log({
      phoneNumber: values.phone,
      address: values.address,
      provinceCode: province,
      districtCode: district,
      wardCode: ward,
    });
    setIsAddAddressModalVisible(false);
    axios({
      method: "POST",
      url: "https://localhost:7029/api/Customer/shippingInfos",
      headers: { Authorization: `Bearer ${token}` },
      data: {
        phoneNumber: values.phone,
        address: values.address,
        provinceCode: province,
        districtCode: district,
        wardCode: ward,
      },
    })
      .then((res) => {
        message.success("Thêm địa chỉ thành công!");
      })
      .catch((err) => {
        message.error("Thêm địa chỉ không thành công!");
      });
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://localhost:7029/api/Customer/shippingInfos",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setAddressList(res.data);

        if (res.data.length > 0) {
          setShippingInfoId(res.data[0].shippingInfoId);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
      headers: { token: `a11d1949-dc33-11ec-987f-ea8994b0d064` },
    })
      .then((res) => {
        setProvinceList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="payment">
      <div className="payment-fluid">
        <div className="payment-container">
          <h1 className="hero" style={{ fontWeight: "650" }}>
            Thanh toán đơn hàng
          </h1>
          <div className="address-block">
            <p className="title">Địa chỉ giao hàng</p>
            {addressList.length > 0 ? (
              !choosenAddress ? (
                <div className="info-block">
                  <div>
                    <p className="username">Trần Nhật Hiệp</p>
                    <p className="phone">{addressList[0].phoneNumber}</p>
                    <p className="address">{addressList[0].address}</p>
                  </div>
                </div>
              ) : (
                <div className="info-block">
                  <div>
                    <p className="username">Trần Nhật Hiệp</p>
                    <p className="phone">{choosenAddress.phoneNumber}</p>
                    <p className="address">{choosenAddress.address}</p>
                  </div>
                </div>
              )
            ) : (
              <></>
            )}
            <button
              className="btn btn-add-address"
              onClick={showChooseAddressModal}
            >
              Đổi địa chỉ
            </button>
            <button
              className="btn btn-add-address"
              onClick={showAddAddressModal}
            >
              Thêm địa chỉ
            </button>
            <Modal
              title="Thêm địa chỉ mới"
              visible={isAddAddressModalVisible}
              onOk={form.submit}
              onCancel={handleCancelAddAddress}
              cancelText="Hủy"
              okText="Lưu"
            >
              <Form
                labelCol={{
                  span: 7,
                }}
                wrapperCol={{
                  span: 16,
                }}
                layout="horizontal"
                size="default"
                form={form}
                onFinish={handleSubmitShippingInfo}
              >
                <Form.Item name="name" label="Họ và tên">
                  <Input placeholder="Nhập họ và tên..." />
                </Form.Item>
                <Form.Item name="phone" label="Số điện thoại">
                  <Input placeholder="Nhập số điện thoại..." />
                </Form.Item>
                <Form.Item name="provinceCode" label="Tỉnh">
                  <Select
                    placeholder="Chọn tỉnh"
                    onChange={(value) => {
                      const [code, id] = value.split(".");
                      setProvince(+code);
                      handleGetDistrict(id);
                    }}
                  >
                    {provinceList.map((province) => (
                      <Option
                        key={province.ProvinceID}
                        value={`${province.Code}.${province.ProvinceID}`}
                      >
                        {province.ProvinceName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="districtCode" label="Huyện">
                  <Select
                    placeholder="Chọn huyện"
                    onChange={(value) => {
                      const [code, id] = value.split(".");
                      setDistrict(+code);
                      handleGetWard(id);
                    }}
                  >
                    {districtList.map((district) => (
                      <Option
                        key={district.DistrictID}
                        value={`${district.Code}.${district.DistrictID}`}
                      >
                        {district.DistrictName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="wardCode" label="Xã">
                  <Select
                    placeholder="Chọn xã"
                    onChange={(value) => {
                      setWard(+value);
                    }}
                  >
                    {wardList.map((ward) => (
                      <Option key={ward.WardID} value={ward.Code}>
                        {ward.WardName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="address" label="Địa chỉ chi tiết">
                  <Input placeholder="Nhập địa chỉ chi tiết..." />
                </Form.Item>
              </Form>
            </Modal>
            <Modal
              title="Chọn địa chỉ giao hàng"
              visible={isChooseAddressModalVisible}
              onCancel={handleCancelChooseAddress}
              footer={false}
            >
              {addressList.length > 0 &&
                addressList.map((address) => (
                  <div
                    className="info-block"
                    style={{
                      border: "2px solid #c4c4c4",
                      marginBottom: "1rem",
                      padding: "0.5rem",
                    }}
                    key={address.shippingInfoId}
                    onClick={() => {
                      console.log({ address });
                      setShippingInfoId(address.shippingInfoId);
                      setChoosenAddress(address);
                    }}
                  >
                    <div>
                      <p className="username">Trần Nhật Hiệp</p>
                      <p className="phone">{address.phoneNumber}</p>
                      <p className="address">{address.address}</p>
                    </div>
                  </div>
                ))}
            </Modal>
          </div>
          <div className="products-block">
            <div className="products-box">
              <div className="title">
                <div className="product">Sản phẩm</div>
                <div className="price">Đơn giá</div>
                <div className="quantity">Số lượng/Khối lượng</div>
                <div className="total">Thành tiền</div>
              </div>
              <div className="product-detail">
                {cartItems.map((item) => {
                  const {
                    productId,
                    image,
                    productName,
                    quantity,
                    totalPrice,
                    price,
                    weightServing,
                  } = item;
                  return (
                    <div className="single-item" key={productId}>
                      <div className="info">
                        <img src={image} alt={productName} />
                        <p style={{ fontSize: "1.2rem" }}>
                          {productName} ({weightServing})
                        </p>
                      </div>
                      <h3>
                        {price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </h3>
                      <h3>{quantity}</h3>
                      <h3>
                        {totalPrice.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="message-box">
              <div className="message">
                <p>Lời nhắn:</p>
                <input type="text" placeholder="Nhập lời nhắn..." />
              </div>
              <div className="deliver">
                <div className="title">
                  Đơn vị vận chuyển:
                  <Select
                    labelInValue
                    defaultValue={{ value: 1 }}
                    onChange={(value) => setDeliver(value.value)}
                    bordered={false}
                  >
                    <Option value={1}>Giao hàng nhanh</Option>
                    <Option value={2}>Giao hàng tiết kiệm</Option>
                  </Select>
                </div>
              </div>
            </div>
            <div className="payment-method-box">
              <div className="title">
                Hình thức thanh toán:{" "}
                <Select
                  labelInValue
                  defaultValue={{ value: 1 }}
                  onChange={(value) => {
                    console.log(value);
                    setPaymentMethod(value.value);
                  }}
                  bordered={false}
                >
                  <Option value={1}>Thanh toán khi nhận hàng</Option>
                  <Option value={2}>Thanh toán trả trước</Option>
                </Select>
              </div>
            </div>
            <div className="total-box">
              <p className="total-payment">
                Tổng tiền:{" "}
                <span>
                  {getTotalPrice(cartItems).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </p>
            </div>
          </div>
          <button className="btn confirm-btn" onClick={handleConfirm}>
            xác nhận
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
