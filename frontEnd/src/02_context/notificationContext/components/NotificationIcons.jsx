import React from "react";

const baseSvgProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const SuccessIcon = () => (
  <svg {...baseSvgProps}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="8 12 11 15 16 9" />
  </svg>
);

export const ErrorIcon = () => (
  <svg {...baseSvgProps}>
    <circle cx="12" cy="12" r="10" />
    <line x1="9" y1="9" x2="15" y2="15" />
    <line x1="15" y1="9" x2="9" y2="15" />
  </svg>
);

export const WarningIcon = () => (
  <svg {...baseSvgProps}>
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export const InfoIcon = () => (
  <svg {...baseSvgProps}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export const LoadingSpinner = () => (
  <svg {...baseSvgProps} className="notificationToast__spinner">
    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
    <path d="M22 12a10 10 0 0 1-10 10" />
  </svg>
);

export const ICON_BY_KIND = {
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon,
  loading: LoadingSpinner,
};
