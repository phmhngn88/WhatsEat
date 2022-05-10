import React from "react";
import "./AdminSidebar.css";
import Collapsible from "react-collapsible";
import { Link } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";

const AdminSidebar = () => {
  return (
    <div className="collapse-side-bar">
      <Collapsible
        open={true}
        trigger={["Quản Lý Shop", <BsChevronDown />]}
        triggerStyle={{ fontWeight: "900", fontSize: "1rem" }}
      >
        <div>
          <Link to="/">Tất cả Shop</Link>
        </div>
        <div>
          <Link to="/">Shop vi phạm</Link>
        </div>

      </Collapsible>
      <Collapsible
        open={true}
        trigger={["Quản Lý Yêu Cầu Đăng Ký Cửa Hàng", <BsChevronDown />]}
        triggerStyle={{ fontWeight: "900", fontSize: "1rem" }}
      >
        <div>
          <Link to="/">Tất cả yêu cầu </Link>
        </div>
        <div>
          <Link to="/">Yêu cầu đã duyệt</Link>
        </div>
        <div>
          <Link to="/">Yêu cầu đã hủy</Link>
        </div>
      </Collapsible>
    </div>
  );
};

export default AdminSidebar;
