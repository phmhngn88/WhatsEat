import React from "react";
import "./Shop.css";
import Collapsible from "react-collapsible";
import { Link } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";

const Shop = () => {
  return (
    <div className="shop-cpn">
      <div className="shop-cpn-fluid">
        <div className="shop-cpn-container">
          <div className="collapse-side-bar">
            <Collapsible
              trigger={["Quản Lý Shop", <BsChevronDown />]}
              triggerStyle={{ fontWeight: "900", fontSize: "1rem" }}
            >
              <div>
                <Link to="/">Đánh giá Shop</Link>
              </div>
              <div>
                <Link to="/">Hồ sơ Shop</Link>
              </div>
              <div>
                <Link to="/">Danh mục của Shop</Link>
              </div>
            </Collapsible>
            <Collapsible
              trigger={["Quản Lý Đơn Hàng", <BsChevronDown />]}
              triggerStyle={{ fontWeight: "900", fontSize: "1rem" }}
            >
              <div>
                <Link to="/">Tất cả đơn</Link>
              </div>
              <div>
                <Link to="/">Đơn hủy</Link>
              </div>
              <div>
                <Link to="/">Trả hàng/hoàn tiền</Link>
              </div>
            </Collapsible>
            <Collapsible
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
          <div className="content-container">Content Container</div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
