import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { ICON_BY_KIND } from "./NotificationIcons.jsx";
import { VALID_KINDS, DEFAULT_DURATION } from "../notification.constants.js";

const NotificationToast = ({ notification, onClose }) => {
  const {
    kind,
    title,
    message,
    duration = DEFAULT_DURATION,
    exiting = false,
  } = notification;

  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const remainingRef = useRef(duration);
  const startedAtRef = useRef(null);

  // If duration changes (e.g. update() promotes a loading toast to success),
  // reset the remaining countdown to the new full duration.
  useEffect(() => {
    remainingRef.current = duration;
  }, [duration]);

  // Auto-dismiss timer — pauses on hover, stops while exiting, skipped for duration <= 0.
  useEffect(() => {
    if (duration <= 0 || exiting || paused) return undefined;

    startedAtRef.current = Date.now();
    timerRef.current = setTimeout(onClose, remainingRef.current);

    return () => {
      clearTimeout(timerRef.current);
      if (startedAtRef.current) {
        remainingRef.current = Math.max(
          0,
          remainingRef.current - (Date.now() - startedAtRef.current)
        );
      }
    };
  }, [paused, duration, exiting, onClose]);

  const role = kind === "error" || kind === "warning" ? "alert" : "status";
  const ariaLive =
    kind === "error" || kind === "warning" ? "assertive" : "polite";
  const Icon = ICON_BY_KIND[kind] || ICON_BY_KIND.info;
  const showProgress = duration > 0 && !exiting;
  const showClose = kind !== "loading";

  const classes = [
    "notificationToast",
    `notificationToast--${kind}`,
    paused ? "notificationToast--paused" : "",
    exiting ? "notificationToast--exiting" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      role={role}
      aria-live={ariaLive}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={showProgress ? { "--toast-duration": `${duration}ms` } : undefined}
    >
      <span className="notificationToast__icon" aria-hidden="true">
        <Icon />
      </span>
      <div className="notificationToast__body">
        {title && <div className="notificationToast__title">{title}</div>}
        {message && (
          <div className="notificationToast__message">{message}</div>
        )}
      </div>
      {showClose && (
        <button
          type="button"
          className="notificationToast__close"
          onClick={onClose}
          aria-label="Close notification"
        >
          ×
        </button>
      )}
      {showProgress && (
        <div className="notificationToast__progress" aria-hidden="true" />
      )}
    </div>
  );
};

NotificationToast.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string.isRequired,
    kind: PropTypes.oneOf(VALID_KINDS).isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
    duration: PropTypes.number,
    exiting: PropTypes.bool,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

NotificationToast.displayName = "NotificationToast";

export default NotificationToast;
