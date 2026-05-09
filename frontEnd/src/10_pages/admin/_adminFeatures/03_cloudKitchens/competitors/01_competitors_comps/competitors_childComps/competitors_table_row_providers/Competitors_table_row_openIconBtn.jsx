import "../../../_styles/competitors_table_row_openIconBtn.css";

/** Icon-only control to jump to a detail session (`data-session` + competitor id). */
const Competitors_table_row_openIconBtn = ({
  onClick,
  dataSession,
  competitorId,
  dataEditing = "false",
  title,
  ariaLabel,
  /** Matches competes-with-brands logo thumb (36×36, same radius/border weight). */
  variant,
}) => {
  const btnClass =
    variant === "competesThumb"
      ? "competitors_table_row_openIconBtn competitors_table_row_openIconBtn--competesThumb"
      : "competitors_table_row_openIconBtn";
  return (
    <button
      type="button"
      className={btnClass}
      data-session={dataSession}
      data-competitor-id={competitorId}
      data-editing={dataEditing}
      onClick={onClick}
      title={title}
      aria-label={ariaLabel || title}
    >
      <svg
        className="competitors_table_row_openIconBtn__svg"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
        />
      </svg>
    </button>
  );
};

export default Competitors_table_row_openIconBtn;
