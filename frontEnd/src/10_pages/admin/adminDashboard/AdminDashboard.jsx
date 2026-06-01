import React from "react";
import { useAdminDashboard } from "./02_adminDashboard.hooks/_adminDashboard.hooks.index.js";
import is_Debug from "./_adminDashboard.config.js";
import { AdminSideBar } from "../../adminPageComps/_adminPageComps.index.js";
import { renderSubsection } from "./04_adminDashboard.helpers/_adminDashboard.helpers.index.js";
import "./00_styles/adminDashboard.css";

const isDebug = is_Debug.ui;

const AdminDashboard = () => {
  const { states, handlers, ActiveSubsection_states } = useAdminDashboard();

  isDebug && console.log("AdminDashboard rendered");

  const ActiveSubsection = renderSubsection({
    states: { ...ActiveSubsection_states },
    isDebug,
  });
  return (
    <div className="adminDashboard">
      <AdminSideBar
        sideBaritems={states.sideBaritems}
        onClick={handlers.onClickSideBarItem}
        isActive={handlers.isActive}
      />
      <div className="adminDashboard__contentWrapper">
        <ActiveSubsection />
      </div>
    </div>
  );
};

export default React.memo(AdminDashboard);
