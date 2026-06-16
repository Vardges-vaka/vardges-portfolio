import "../../_styles/cards/card_social_summary.css";

const Card_social_summary = ({
  activeCount = 0,
  disabledCount = 0,
  missingLabels = [],
  otherCount = 0,
  showAllText = "Show all",
  onShowAll,
  className = "",
}) => {
  const rootClass = ["card_social_summary", className].filter(Boolean).join(" ");
  const missingText =
    missingLabels.length > 0 ? missingLabels.join(", ") : "None";
  const otherText =
    otherCount > 0
      ? `${otherCount} custom platform${otherCount === 1 ? "" : "s"} in grid`
      : "None";

  const handleShowAll = (event) => {
    event.stopPropagation();
    onShowAll?.();
  };

  return (
    <div className={rootClass}>
      <div className="card_social_summary__card" tabIndex={0} aria-label="Socials summary">
        <div className="card_social_summary__glow" aria-hidden="true" />

        <div className="card_social_summary__content">
          <small className="card_social_summary__badge">Overview</small>
          <h5 className="card_social_summary__title">Socials</h5>

          <dl className="card_social_summary__stats">
            <div className="card_social_summary__stat card_social_summary__stat--active">
              <dt>Active socials</dt>
              <dd>{activeCount}</dd>
            </div>
            <div className="card_social_summary__stat card_social_summary__stat--disabled">
              <dt>Disabled socials</dt>
              <dd>{disabledCount}</dd>
            </div>
            <div className="card_social_summary__stat card_social_summary__stat--missing">
              <dt>Missing socials</dt>
              <dd>{missingText}</dd>
            </div>
            <div className="card_social_summary__stat card_social_summary__stat--other">
              <dt>Other platforms</dt>
              <dd>{otherText}</dd>
            </div>
          </dl>

          <button
            type="button"
            className="card_social_summary__showBtn"
            onClick={handleShowAll}
            onMouseDown={(event) => event.stopPropagation()}>
            {showAllText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card_social_summary;
