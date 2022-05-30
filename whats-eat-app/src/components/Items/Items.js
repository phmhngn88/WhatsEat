import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Items.css";
import "antd/dist/antd.css";
import { Row, Col, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Product from "../Product/Product";

const Items = ({ products, storeId }) => {
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.userInfo.token);

  const onDeleteProduct = (productId) => {
    axios({
      method: "delete",
      url: `https://localhost:7029/api/Store/${storeId}/product/${productId}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    setVisible(false);
  };

  const onCloseModal = () => {
    setVisible(false);
  };

  const showDeleteModal = (name) => {
    setSelectedProduct(name);
    setVisible(true);
  };

  const onUpdateProduct = (productId) => {
    navigate(`/shop/items/update/${productId}`, {
      state: {
        storeId: storeId,
        productId: productId,
      },
    });
  };
  return (
    <div className="items-container">
      <div className="items">
        <Row gutter={[16, 16]}>
          {products.map((item) => {
            const { productId, name, basePrice, weightServing, images } = item;
            return (
              <Col span={6} className="item-col" key={productId}>
                <Product {...item} />
                <button className="btn" onClick={() => showDeleteModal(name)}>
                  Xóa
                </button>
                <button
                  className="btn"
                  onClick={() => onUpdateProduct(productId)}
                >
                  Sửa
                </button>
              </Col>
            );
          })}
        </Row>
      </div>
      <Modal
        title="Xóa sản phẩm"
        visible={visible}
        onOk={() => onDeleteProduct(selectedProduct)}
        onCancel={onCloseModal}
        okText="Đồng ý"
        cancelText="Hủy"
      >
        <p>Bạn có muốn xóa sản phẩm {selectedProduct}</p>
      </Modal>
    </div>
  );
};

export default Items;
