import React, { useState, useCallback, useEffect } from "react";
import SidebarTooltip from "./SidebarTooltip";
import SidebarPinButton from "./SidebarPinButton";
import "./_styles/adminSideBar.css";

const AdminSideBar = ({ sideBaritems, onClick, isActive }) => {
  // Pin/Unpin state managed internally in the sidebar
  const [isPinned, setIsPinned] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0 });

  // Toggle pin/unpin handler
  const togglePin = useCallback(() => {
    setIsPinned((prev) => !prev);
  }, []);

  // Handle mouse enter to set tooltip position
  const handleMouseEnter = useCallback((index, event) => {
    setHoveredItem(index);
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + rect.height / 2,
    });
  }, []);

  // Update CSS custom property when pin state changes
  // This allows the content wrapper to adjust its margin dynamically
  useEffect(() => {
    const updateSidebarWidth = () => {
      const width = window.innerWidth;
      let sidebarWidth;

      if (width <= 480) {
        // Mobile - always collapsed
        sidebarWidth = "60px";
      } else if (width <= 768) {
        // Tablet
        sidebarWidth = isPinned ? "180px" : "60px";
      } else {
        // Desktop
        sidebarWidth = isPinned ? "220px" : "70px";
      }

      document.documentElement.style.setProperty(
        "--sidebar-width",
        sidebarWidth
      );
    };

    // Initial update
    updateSidebarWidth();

    // Listen for window resize to adjust responsively
    window.addEventListener("resize", updateSidebarWidth);

    return () => {
      window.removeEventListener("resize", updateSidebarWidth);
    };
  }, [isPinned]);

  // Get current hovered item for tooltip
  const getTooltipLabel = () => {
    if (isPinned || hoveredItem === null) return null;
    return sideBaritems?.[hoveredItem]?.label || null;
  };

  return (
    <>
      <SidebarTooltip label={getTooltipLabel()} position={tooltipPosition} />
      <div
        className={`adminSideBar ${
          isPinned ? "adminSideBar--pinned" : "adminSideBar--unpinned"
        }`}>
        <SidebarPinButton isPinned={isPinned} onToggle={togglePin} />

        {/* Sidebar Items */}
        <div className="adminSideBar__itemsWrapper">
          {sideBaritems?.map((item, index) => {
            const isItemActive = isActive(item) === "active";

            return (
              <div
                key={index}
                className={`adminSideBar__item ${
                  isItemActive ? "adminSideBar__item--active" : ""
                }`}
                onClick={() => onClick(item)}
                onMouseEnter={(e) => handleMouseEnter(index, e)}
                onMouseLeave={() => setHoveredItem(null)}
                role="button"
                tabIndex={0}
                aria-label={item.label}>
                <div className="adminSideBar__itemContent">
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="adminSideBar__itemIcon"
                  />
                  {isPinned && (
                    <span className="adminSideBar__itemLabel">
                      {item.label}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AdminSideBar;
