import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Input_date from "./Input_date.jsx";
import {
  Input_label,
  Input_hints,
} from "./input_childComps/_input_childComps.index.js";
import { INPUT_SIZE_TYPES } from "./input_helpers/inputSizeTypes.js";
import {
  LABEL_INLINE_POSITIONS,
  LABEL_POSITIONS,
  HINT_TEXT_POSITIONS,
  normalizeLabelPosition,
} from "./input_helpers/inputLabelLayout.js";
import {
  WORKING_HOURS_WEEKDAYS,
  formatWorkingHoursValue,
  normalizeTimePart,
  parseWorkingHoursValue,
} from "./input_helpers/workingHoursValue.js";
import "../_styles/inputs/input_workingHours.css";

/**
 * Working-hours picker — weekday chips + two native time inputs (Input_date type="time").
 * Stores a human-readable string, e.g. "Sun–Thu, 09:00–18:00".
 */
const Input_workingHours = ({
  labelProps = {},
  hintsProps = {},
  className,
  baseStyle = true,
  sizeType = "md",
  value = "",
  disabled = false,
  required = false,
  onChange,
}) => {
  const parsedFromValue = useMemo(
    () => parseWorkingHoursValue(value),
    [value],
  );
  const [draft, setDraft] = useState(parsedFromValue);

  useEffect(() => {
    setDraft(parsedFromValue);
  }, [parsedFromValue]);

  const labelPosition = normalizeLabelPosition(labelProps.position);
  const isLabelActive = Boolean(labelProps.isActive && labelProps.message);

  const rootClass = [
    baseStyle && "input_workingHours",
    baseStyle && `input_workingHours--${sizeType}`,
    disabled && "input_workingHours--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const emitChange = (patch) => {
    const nextDraft = { ...draft, ...patch };
    setDraft(nextDraft);
    onChange?.({ target: { value: formatWorkingHoursValue(nextDraft) } });
  };

  const handleOpenChange = (event) => {
    emitChange({ open: normalizeTimePart(event.target.value) });
  };

  const handleCloseChange = (event) => {
    emitChange({ close: normalizeTimePart(event.target.value) });
  };

  const toggleDay = (dayId) => {
    if (disabled) return;

    const days = draft.days.includes(dayId)
      ? draft.days.filter((id) => id !== dayId)
      : [...draft.days, dayId];

    emitChange({ days });
  };

  const labelElement = isLabelActive ? (
    <Input_label
      baseStyle
      sizeType={sizeType}
      {...labelProps}
      required={required ?? labelProps.required}
      position={labelPosition}
      inlinePosition={labelProps.inlinePosition ?? "before"}
      textPosition={labelProps.textPosition ?? "left"}
    />
  ) : null;

  return (
    <div className={rootClass}>
      {labelPosition !== "bottom" ? labelElement : null}

      <div className="input_workingHours__days" role="group" aria-label="Working days">
        {WORKING_HOURS_WEEKDAYS.map((day) => {
          const isSelected = draft.days.includes(day.id);

          return (
            <button
              key={day.id}
              type="button"
              className={[
                "input_workingHours__dayBtn",
                isSelected && "input_workingHours__dayBtn--selected",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-pressed={isSelected}
              disabled={disabled}
              onClick={() => toggleDay(day.id)}>
              {day.label}
            </button>
          );
        })}
      </div>

      <div className="input_workingHours__times">
        <Input_date
          type="time"
          sizeType={sizeType}
          disabled={disabled}
          required={required}
          value={draft.open}
          onChange={handleOpenChange}
          labelProps={{ isActive: true, message: "Opens" }}
          hintsProps={{ isActive: false }}
        />

        <span className="input_workingHours__timeSep" aria-hidden="true">
          –
        </span>

        <Input_date
          type="time"
          sizeType={sizeType}
          disabled={disabled}
          required={required}
          value={draft.close}
          onChange={handleCloseChange}
          labelProps={{ isActive: true, message: "Closes" }}
          hintsProps={{ isActive: false }}
        />
      </div>

      <Input_hints
        baseStyle
        sizeType={sizeType}
        {...hintsProps}
        isActive={
          hintsProps.isActive ??
          Boolean(formatWorkingHoursValue(draft) || hintsProps.message)
        }
        type={hintsProps.type ?? "hint"}
        message={
          hintsProps.message ??
          (formatWorkingHoursValue(draft) || "Select days and opening hours")
        }
        textPosition={hintsProps.textPosition ?? "left"}
      />

      {labelPosition === "bottom" ? labelElement : null}
    </div>
  );
};

Input_workingHours.propTypes = {
  labelProps: PropTypes.shape({
    isActive: PropTypes.bool,
    message: PropTypes.node,
    htmlFor: PropTypes.string,
    required: PropTypes.bool,
    position: PropTypes.oneOf([...LABEL_POSITIONS, "down"]),
    inlinePosition: PropTypes.oneOf(LABEL_INLINE_POSITIONS),
    textPosition: PropTypes.oneOf(["left", "center", "right"]),
    className: PropTypes.string,
  }),
  hintsProps: PropTypes.shape({
    isActive: PropTypes.bool,
    type: PropTypes.oneOf(["hint", "error", "success"]),
    message: PropTypes.node,
    textPosition: PropTypes.oneOf(HINT_TEXT_POSITIONS),
    className: PropTypes.string,
  }),
  className: PropTypes.string,
  baseStyle: PropTypes.bool,
  sizeType: PropTypes.oneOf(INPUT_SIZE_TYPES),
  value: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Input_workingHours;
