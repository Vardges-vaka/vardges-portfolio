import React, { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
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
  const handleMouseEnter = useCallback(
    (index, event) => {
      setHoveredItem(index);
      // Calculate tooltip position relative to viewport
      const rect = event.currentTarget.getBoundingClientRect();
      const position = {
        top: rect.top + rect.height / 2, // Center vertically with item
      };
      setTooltipPosition(position);

      // Debug log
      console.log(
        "Tooltip hover - Index:",
        index,
        "Position:",
        position,
        "isPinned:",
        isPinned
      );
    },
    [isPinned]
  );

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

  // Debug: Log pin state changes
  console.log(
    "AdminSideBar render - isPinned:",
    isPinned,
    "hoveredItem:",
    hoveredItem
  );

  // Render tooltip using portal to escape sidebar overflow
  const renderTooltip = () => {
    if (isPinned || hoveredItem === null) return null;

    const item = sideBaritems?.[hoveredItem];
    if (!item?.label) return null;

    console.log("🎯 TOOLTIP RENDERING via PORTAL!", {
      label: item.label,
      index: hoveredItem,
      top: tooltipPosition.top,
      isPinned,
    });

    return createPortal(
      <div
        className="adminSideBar__tooltip"
        style={{
          top: `${tooltipPosition.top}px`,
          transform: "translateY(-50%)",
        }}
        data-label={item.label}
        data-index={hoveredItem}>
        <span>{item.label}</span>
      </div>,
      document.body // Render at body level, outside all containers
    );
  };

  return (
    <>
      {renderTooltip()}
      <div
        className={`adminSideBar ${
          isPinned ? "adminSideBar--pinned" : "adminSideBar--unpinned"
        }`}>
        {/* Pin/Unpin Toggle Button */}
        <div className="adminSideBar__pinToggle">
          <button
            className="adminSideBar__pinButton"
            onClick={togglePin}
            aria-label={isPinned ? "Unpin sidebar" : "Pin sidebar"}
            title={isPinned ? "Unpin sidebar" : "Pin sidebar"}>
            {isPinned ? (
              // Pinned icon (push pin pointing down)
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M16 9V4H17C17.55 4 18 3.55 18 3C18 2.45 17.55 2 17 2H7C6.45 2 6 2.45 6 3C6 3.55 6.45 4 7 4H8V9C8 10.66 6.66 12 5 12V14H11V22L13 20L15 22V14H21V12C19.34 12 18 10.66 18 9H16Z" />
              </svg>
            ) : (
              // Unpinned icon (push pin at angle)
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M14 4V9C14 10.12 14.37 11.16 15 12H9C9.65 11.15 10 10.1 10 9V4H14M17 2H7C6.45 2 6 2.45 6 3C6 3.55 6.45 4 7 4H8V9C8 10.66 6.66 12 5 12V14H11V22H13V14H19V12C17.34 12 16 10.66 16 9V4H17C17.55 4 18 3.55 18 3C18 2.45 17.55 2 17 2Z" />
              </svg>
            )}
          </button>
        </div>

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
