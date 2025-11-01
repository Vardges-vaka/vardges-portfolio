import React from "react";
import { Pin, PinOff } from "lucide-react";

import { useThemeContext } from "../../../02_context/context.index";

const SidebarPinButton = ({ isPinned, onToggle }) => {
  const { strokeColor } = useThemeContext();
  return (
    <div className="adminSideBar__pinToggle">
      <button
        className="adminSideBar__pinButton"
        onClick={onToggle}
        aria-label={isPinned ? "Unpin sidebar" : "Pin sidebar"}
        title={isPinned ? "Unpin sidebar" : "Pin sidebar"}>
        {isPinned ? (
          <Pin
            size={20}
            strokeWidth={1}
            stroke={strokeColor}
            color={strokeColor}
          />
        ) : (
          <PinOff
            size={20}
            strokeWidth={1}
            stroke={strokeColor}
            color={strokeColor}
          />
        )}
      </button>
    </div>
  );
};

export default SidebarPinButton;
