import React, { useState, useEffect } from "react";
import "./AdminNavbar.css";
import {
    AiOutlineLogout
  } from "react-icons/ai";

  const handleLogout = () => {
    localStorage.removeItem("persist:root");
  };

  const AdminNavbar = () => {
      return(
          <main className="admin-navbar">
            <h1> Chào mừng đến với trang quản lý của WhatsEat!</h1>
            <a href="/" className="btn logout-btn" onClick={handleLogout}>
            <AiOutlineLogout className="logout-icon" /> <span>Đăng xuất</span>
            </a>
          </main>
      )
  }
export default AdminNavbar;