import React from "react";
import "./_styles/adminSideBar.css";

const AdminSideBar = ({ sideBaritems, onClick, isActive }) => {
  return (
    <div className="adminDashboard_sidebar_items_wrapper">
      {sideBaritems?.map((item, index) => (
        <div
          key={index}
          className={`adminDashboard_sidebar_item ${isActive(item)}`}
          onClick={() => onClick(item)}>
          <img src={item.icon} alt={item.label} />
          <h3>{item.label}</h3>
        </div>
      ))}
    </div>
  );
};

export default AdminSideBar;
