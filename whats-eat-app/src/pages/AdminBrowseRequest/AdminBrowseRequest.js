import "antd/dist/antd.css";
import React,  {useState, useEffect}from "react";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import Footer from "../../components/Footer/Footer";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import "./AdminBrowseRequest.css";

const AdminBrowseRequest = () => {
  useEffect(() => {
    const header = document.getElementById("header");

    header.classList.add("hidden");

    return () => {
      header.classList.remove("hidden");
    };
  }, []);
  return (
    <div className="admin-browse">
        <AdminNavbar/>
      <div className="admin-browse-fluid">
        <div className="admin-browse-container">
        <AdminSidebar/>
          <div className="content-container"></div>
        </div>
      </div>
      <Footer />
    </div>
  );

};

export default AdminBrowseRequest;
