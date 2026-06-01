import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import NotificationToast from "./NotificationToast.jsx";
import "./notificationToast.css";

const NotificationContainer = ({ notifications, onDismiss }) => {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="notificationContainer"
      role="region"
      aria-label="Notifications">
      {notifications.map((n) => (
        <NotificationToast
          key={n.id}
          notification={n}
          onClose={() => onDismiss(n.id)}
        />
      ))}
    </div>,
    document.body,
  );
};

NotificationContainer.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      kind: PropTypes.string.isRequired,
      title: PropTypes.string,
      message: PropTypes.string,
    }),
  ).isRequired,
  onDismiss: PropTypes.func.isRequired,
};

NotificationContainer.displayName = "NotificationContainer";

export default NotificationContainer;
