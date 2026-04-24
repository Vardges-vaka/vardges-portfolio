// Used by the collapsible section header. Rotates via CSS when `isOpen`.
const ChevronIcon = ({ size = 14, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    <polyline points="6,9 12,15 18,9" />
  </svg>
);

export default ChevronIcon;
