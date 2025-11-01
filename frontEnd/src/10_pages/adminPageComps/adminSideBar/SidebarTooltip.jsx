import React from "react";
import { createPortal } from "react-dom";

const SidebarTooltip = ({ label, position }) => {
  if (!label) return null;

  return createPortal(
    <div
      className="adminSideBar__tooltip"
      style={{
        top: `${position.top}px`,
        transform: "translateY(-50%)",
      }}>
      <span>{label}</span>
    </div>,
    document.body
  );
};

export default SidebarTooltip;
