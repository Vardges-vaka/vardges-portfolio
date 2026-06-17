/**
 * USE CASE: Pick multiple values from a fixed list (tags, cuisines, permissions).
 * Value is a comma-separated string in onChange (or pass an array — parsed internally).
 * Uses a rich checkbox-style dropdown; stays open while toggling items.
 */
import {
  forwardRef,
  useId,
  useMemo,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import { Select_fieldShell, Select_optionContent } from "./select_childComps/_select_childComps.index.js";
import {
  SELECT_SIZE_TYPES,
  OPTIONS_TYPES,
  normalizeSelectOptions,
  normalizeOptionsType,
  useSelectMultiValue,
  useSelectClickOutside,
} from "./select_helpers/_select_helpers.index.js";
import "../_styles/selects/select_multi.css";

const Select_multi = forwardRef(function Select_multi(
  {
    labelProps = {},
    leftIconProps = {},
    rightIconProps = {},
    hintsProps = {},

    options = [],
    optionsType = "leftIcon",
    optionValueKey = "value",
    optionLabelKey = "label",
    placeholder = "— select items —",
    emptySummary = "None selected",

    className,
    baseStyle = true,
    sizeType = "md",

    id: idProp,
    disabled,
    required,
    value,
    defaultValue,
    name,
    onChange,
    onBlur,
    onFocus,
    onOpenChange,
  },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const hintId = `${id}-hint`;
  const listboxId = `${id}-listbox`;

  const resolvedOptionsType = normalizeOptionsType(optionsType);

  const normalizedOptions = useMemo(
    () =>
      normalizeSelectOptions(options, {
        optionValueKey,
        optionLabelKey,
        optionsType: resolvedOptionsType,
      }),
    [options, optionValueKey, optionLabelKey, resolvedOptionsType],
  );

  const { resolvedValues, toggleValue } = useSelectMultiValue({
    value,
    defaultValue,
    onChange,
    name,
    id,
  });

  const [isOpen, setIsOpen] = useState(false);
  const wrapRef = useRef(null);
  const hiddenInputRef = useRef(null);

  const setRef = useCallback(
    (node) => {
      hiddenInputRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const summaryText = useMemo(() => {
    if (!resolvedValues.length) return emptySummary;
    const labels = resolvedValues
      .map(
        (val) =>
          normalizedOptions.find((opt) => String(opt.value) === String(val))
            ?.label,
      )
      .filter(Boolean);
    return labels.length ? labels.join(", ") : emptySummary;
  }, [resolvedValues, normalizedOptions, emptySummary]);

  const handleSelectOption = useCallback(
    (opt) => {
      if (disabled || opt.disabled) return;
      toggleValue(opt.value);
    },
    [disabled, toggleValue],
  );

  useSelectClickOutside(isOpen, wrapRef, () => setIsOpen(false));

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  const sharedFieldA11y = {
    "aria-invalid":
      hintsProps.isActive && hintsProps.type === "error" ? true : undefined,
    "aria-describedby": hintsProps.isActive ? hintId : undefined,
  };

  const control = (
    <div className="select_field__rich select_multi__rich" ref={wrapRef}>
      <input
        ref={setRef}
        type="hidden"
        name={name}
        value={resolvedValues.join(",")}
        required={required && resolvedValues.length === 0}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
      />

      <button
        type="button"
        id={id}
        className="select_field__trigger select_multi__trigger"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-invalid={sharedFieldA11y["aria-invalid"]}
        aria-describedby={sharedFieldA11y["aria-describedby"]}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={(e) => {
          if (e.key === "Escape") setIsOpen(false);
          if (e.key === "ArrowDown" && !isOpen) {
            e.preventDefault();
            setIsOpen(true);
          }
        }}>
        <span className="select_field__multiSummary select_multi__summary">
          {summaryText || placeholder}
        </span>
      </button>

      {isOpen && !disabled && (
        <ul
          id={listboxId}
          className="select_field__menu select_multi__menu"
          role="listbox"
          aria-labelledby={id}
          aria-multiselectable="true">
          {normalizedOptions.map((opt) => {
            const isSelected = resolvedValues.some(
              (v) => String(v) === String(opt.value),
            );

            return (
              <li
                key={`${opt.value}-${opt.ariaLabel}`}
                role="option"
                aria-selected={isSelected}
                aria-label={opt.ariaLabel}
                className={[
                  "select_field__menuItem",
                  "select_multi__menuItem",
                  isSelected && "select_field__menuItem--selected",
                  opt.disabled && "select_field__menuItem--disabled",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelectOption(opt);
                }}>
                <span
                  className={[
                    "select_multi__check",
                    isSelected && "select_multi__check--on",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-hidden="true"
                />
                <Select_optionContent
                  option={opt}
                  optionsType={resolvedOptionsType}
                  sizeType={sizeType}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );

  return (
    <Select_fieldShell
      variantClass="select_multi"
      sizeType={sizeType}
      baseStyle={baseStyle}
      className={className}
      labelProps={labelProps}
      leftIconProps={leftIconProps}
      rightIconProps={rightIconProps}
      hintsProps={hintsProps}
      disabled={disabled}
      required={required}
      id={id}
      isOpen={isOpen}
      isRich>
      {control}
    </Select_fieldShell>
  );
});

Select_multi.propTypes = {
  labelProps: PropTypes.object,
  leftIconProps: PropTypes.object,
  rightIconProps: PropTypes.object,
  hintsProps: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.object),
  optionsType: PropTypes.oneOf(OPTIONS_TYPES),
  optionValueKey: PropTypes.string,
  optionLabelKey: PropTypes.string,
  placeholder: PropTypes.string,
  emptySummary: PropTypes.string,
  className: PropTypes.string,
  baseStyle: PropTypes.bool,
  sizeType: PropTypes.oneOf(SELECT_SIZE_TYPES),
  id: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ]),
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

Select_multi.displayName = "Select_multi";

export default Select_multi;
