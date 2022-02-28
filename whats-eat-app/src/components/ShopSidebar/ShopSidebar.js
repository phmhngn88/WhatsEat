import React from "react";
import "./ShopSidebar.css";
import Collapsible from "react-collapsible";
import { Link } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";

const ShopSidebar = () => {
  return (
    <div className="collapse-side-bar">
      <Collapsible
        open={true}
        trigger={["Quản Lý Shop", <BsChevronDown />]}
        triggerStyle={{ fontWeight: "900", fontSize: "1rem" }}
      >
        <div>
          <Link to="/shop/profile">Hồ sơ Shop</Link>
        </div>
        <div>
          <Link to="/">Danh mục của Shop</Link>
        </div>
        <div>
          <Link to="#">Đánh giá Shop</Link>
        </div>
      </Collapsible>
      <Collapsible
        open={true}
        trigger={["Quản Lý Đơn Hàng", <BsChevronDown />]}
        triggerStyle={{ fontWeight: "900", fontSize: "1rem" }}
      >
        <div>
          <Link to="/shop/orders">Tất cả đơn</Link>
        </div>
        <div>
          <Link to="/">Đơn hủy</Link>
        </div>
        <div>
          <Link to="/">Trả hàng/hoàn tiền</Link>
        </div>
      </Collapsible>
      <Collapsible
        open={true}
        trigger={["Quản Lý Sản Phẩm", <BsChevronDown />]}
        triggerStyle={{ fontWeight: "900", fontSize: "1rem" }}
      >
        <div>
          <Link to="/">tất cả sản phẩm</Link>
        </div>
        <div>
          <Link to="/">thêm sản phẩm</Link>
        </div>
        <div>
          <Link to="/">sản phẩm vi phạm</Link>
        </div>
      </Collapsible>
      <Collapsible
        open={true}
        trigger={["Thiết Lập Shop", <BsChevronDown />]}
        triggerStyle={{ fontWeight: "900", fontSize: "1rem" }}
      >
        <div>
          <Link to="/">Địa chỉ</Link>
        </div>
        <div>
          <Link to="/">Tài khoản</Link>
        </div>
      </Collapsible>
    </div>
  );
};

export default ShopSidebar;
