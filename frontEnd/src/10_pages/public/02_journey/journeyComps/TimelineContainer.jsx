import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import TimelineCard from "./TimelineCard.jsx";

/**
 * TimelineContainer Component
 * Container for timeline with vertical line and role cards
 * Supports short and full variants
 */
const TimelineContainer = ({
  roles,
  expandedRoleId,
  onToggleRole,
  variant = "full",
}) => {
  const { t } = useTranslation("tempContent");

  if (!roles || roles.length === 0) {
    return (
      <div className="timelineContainer__empty">{t("ui.empty.roles")}</div>
    );
  }

  const isShort = variant === "short";
  const displayRoles = isShort ? roles.slice(0, 3) : roles;

  return (
    <div
      className={`timelineContainer ${
        isShort ? "timelineContainer--short" : "timelineContainer--full"
      }`}>
      <div className="timelineContainer__line" />
      <div className="timelineContainer__content">
        {displayRoles.map((role) => (
          <div key={role.id} className="timelineContainer__item">
            <div className="timelineContainer__marker">
              <div className="timelineContainer__markerDot" />
            </div>
            <div className="timelineContainer__card">
              <TimelineCard
                role={role}
                isExpanded={expandedRoleId === role.id}
                onToggle={onToggleRole}
                variant={variant}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

TimelineContainer.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.object).isRequired,
  expandedRoleId: PropTypes.number,
  onToggleRole: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["short", "full"]),
};

export default TimelineContainer;
