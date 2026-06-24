import {
  forwardRef,
  useId,
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import {
  Field_label,
  Field_icon,
  Field_hints,
} from "../fieldParts/_fieldParts.index.js";
import GenericSelect from "./GenericSelect.jsx";
import { Select_optionContent } from "./select_childComps/_select_childComps.index.js";
import {
  SELECT_SIZE_TYPES,
  OPTIONS_TYPES,
  normalizeSelectOptions,
  isRichOptionsType,
  normalizeOptionsType,
} from "./select_helpers/_select_helpers.index.js";
import {
  LABEL_INLINE_POSITIONS,
  LABEL_POSITIONS,
  HINT_TEXT_POSITIONS,
  LABEL_TEXT_POSITIONS,
  normalizeLabelPosition,
} from "../fieldParts/field_helpers/fieldLabelLayout.js";
import "../_styles/selects/select_static.css";

const DEFAULT_CHEVRON = {
  isActive: true,
  type: "lucide",
  lucidIcon: "ChevronDown",
  decorative: true,
};

const Select_static = forwardRef(function Select_static(
  {
    labelProps = {},
    leftIconProps = {},
    rightIconProps = {},
    hintsProps = {},

    options = [],
    optionsType = "textOnly",
    optionValueKey = "value",
    optionLabelKey = "label",
    placeholder = "— select —",
    placeholderValue = "",

    className,
    baseStyle = true,
    sizeType = "md",

    id: idProp,
    disabled,
    readOnly = false,
    required,
    value,
    defaultValue,
    name,
    onChange,
    onBlur,
    onFocus,
    onOpenChange,
    ...selectProps
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

  const useRichPicker = isRichOptionsType(resolvedOptionsType);
  const isInteractive = !disabled && !readOnly;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const resolvedValue = isControlled ? value : internalValue;

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

  const selectedOption = useMemo(
    () =>
      normalizedOptions.find(
        (opt) => String(opt.value) === String(resolvedValue),
      ) ?? null,
    [normalizedOptions, resolvedValue],
  );

  const fireChange = useCallback(
    (newValue) => {
      if (!isControlled) setInternalValue(newValue);

      onChange?.({
        target: {
          value: newValue,
          name,
          id,
        },
        currentTarget: {
          value: newValue,
          name,
          id,
        },
      });
    },
    [isControlled, onChange, name, id],
  );

  const handleSelectOption = useCallback(
    (opt) => {
      if (!isInteractive || opt.disabled) return;
      fireChange(opt.value);
      setIsOpen(false);
      hiddenInputRef.current?.focus?.();
    },
    [isInteractive, fireChange],
  );

  const toggleOpen = useCallback(() => {
    if (!isInteractive) return;
    setIsOpen((prev) => !prev);
  }, [isInteractive]);

  useEffect(() => {
    if (readOnly) setIsOpen(false);
  }, [readOnly]);

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event) => {
      if (!wrapRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown, true);
    return () =>
      document.removeEventListener("mousedown", handlePointerDown, true);
  }, [isOpen]);

  const labelPosition = normalizeLabelPosition(labelProps.position);
  const inlinePosition = labelProps.inlinePosition ?? "before";
  const isLabelActive = Boolean(labelProps.isActive && labelProps.message);
  const isInlineLabel = isLabelActive && labelPosition === "inline";

  const resolvedRightIcon = readOnly
    ? { isActive: false }
    : rightIconProps.isActive
      ? rightIconProps
      : DEFAULT_CHEVRON;

  const rootClass = [
    baseStyle && "select_static",
    baseStyle && `select_static--${sizeType}`,
    isInlineLabel && "select_static--labelInline",
    useRichPicker && "select_static--rich",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const fieldWrapClass = [
    "select_static__fieldWrap",
    leftIconProps.isActive && "select_static__fieldWrap--withLeftIcon",
    resolvedRightIcon.isActive &&
      "select_static__fieldWrap--withRightIcon",
    useRichPicker && "select_static__fieldWrap--rich",
    isOpen && isInteractive && "select_static__fieldWrap--open",
    disabled && "select_static__fieldWrap--disabled",
    readOnly && "select_static__fieldWrap--readOnly",
    hintsProps.isActive &&
      hintsProps.type === "error" &&
      "select_static__fieldWrap--error",
    hintsProps.isActive &&
      hintsProps.type === "success" &&
      "select_static__fieldWrap--success",
  ]
    .filter(Boolean)
    .join(" ");

  const inlineRowClass = [
    "select_static__inlineRow",
    `select_static__inlineRow--label${inlinePosition}`,
  ].join(" ");

  const sharedSize = { sizeType };

  const labelElement = isLabelActive ? (
    <Field_label
      baseStyle
      {...sharedSize}
      {...labelProps}
      htmlFor={labelProps.htmlFor ?? id}
      required={required ?? labelProps.required}
      position={labelPosition}
      inlinePosition={inlinePosition}
      textPosition={labelProps.textPosition ?? "left"}
    />
  ) : null;

  const sharedFieldA11y = {
    id,
    name: readOnly ? undefined : name,
    disabled,
    required,
    "aria-invalid":
      hintsProps.isActive && hintsProps.type === "error" ? true : undefined,
    "aria-describedby": hintsProps.isActive ? hintId : undefined,
  };

  const readOnlyValueContent = selectedOption ? (
    <Select_optionContent
      option={selectedOption}
      optionsType={resolvedOptionsType}
      sizeType={sizeType}
      className="select_static__readOnlyContent"
    />
  ) : (
    <Select_optionContent
      placeholder
      placeholderText={placeholder}
      optionsType={resolvedOptionsType}
      sizeType={sizeType}
      className="select_static__readOnlyContent"
    />
  );

  const readOnlyControl = (
    <>
      <input
        ref={setRef}
        type="hidden"
        name={name}
        value={resolvedValue ?? ""}
        required={required}
        tabIndex={-1}
        aria-hidden="true"
      />
      <div
        className="select_static__readOnly"
        id={id}
        aria-readonly="true"
        title={
          selectedOption?.ariaLabel ||
          selectedOption?.label ||
          (resolvedValue ? String(resolvedValue) : undefined)
        }>
        {readOnlyValueContent}
      </div>
    </>
  );

  const nativeControl = (
    <GenericSelect
      ref={ref}
      baseStyle
      className="select_static__select"
      value={resolvedValue}
      defaultValue={undefined}
      onChange={(e) => {
        if (readOnly) return;
        if (!isControlled) setInternalValue(e.target.value);
        onChange?.(e);
      }}
      onBlur={onBlur}
      onFocus={onFocus}
      {...sharedFieldA11y}
      {...selectProps}>
      <option value={placeholderValue} disabled={required}>
        {placeholder}
      </option>
      {normalizedOptions.map((opt) => (
        <option
          key={`${opt.value}-${opt.ariaLabel}`}
          value={opt.value}
          disabled={opt.disabled}>
          {opt.label || opt.ariaLabel}
        </option>
      ))}
    </GenericSelect>
  );

  const richControl = (
    <div className="select_static__rich" ref={wrapRef}>
      <input
        ref={setRef}
        type="hidden"
        name={name}
        value={resolvedValue ?? ""}
        required={required}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
      />

      <button
        type="button"
        id={id}
        className="select_static__trigger"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-invalid={sharedFieldA11y["aria-invalid"]}
        aria-describedby={sharedFieldA11y["aria-describedby"]}
        onClick={toggleOpen}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={(e) => {
          if (e.key === "Escape") setIsOpen(false);
          if (e.key === "ArrowDown" && !isOpen) {
            e.preventDefault();
            setIsOpen(true);
          }
        }}>
        {selectedOption ? (
          <Select_optionContent
            option={selectedOption}
            optionsType={resolvedOptionsType}
            sizeType={sizeType}
            className="select_static__triggerContent"
          />
        ) : (
          <Select_optionContent
            placeholder
            placeholderText={placeholder}
            optionsType={resolvedOptionsType}
            sizeType={sizeType}
            className="select_static__triggerContent"
          />
        )}
      </button>

      {isOpen && isInteractive && (
        <ul
          id={listboxId}
          className="select_static__menu"
          role="listbox"
          aria-labelledby={id}>
          {normalizedOptions.map((opt) => {
            const isSelected =
              String(opt.value) === String(resolvedValue ?? "");
            return (
              <li
                key={`${opt.value}-${opt.ariaLabel}`}
                role="option"
                aria-selected={isSelected}
                aria-label={opt.ariaLabel}
                className={[
                  "select_static__menuItem",
                  isSelected && "select_static__menuItem--selected",
                  opt.disabled && "select_static__menuItem--disabled",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelectOption(opt);
                }}>
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

  const fieldControl = readOnly
    ? readOnlyControl
    : useRichPicker
      ? richControl
      : nativeControl;

  const fieldRow = (
    <div className={fieldWrapClass}>
      <Field_icon baseStyle {...sharedSize} {...leftIconProps} />
      {fieldControl}
      <Field_icon baseStyle {...sharedSize} {...resolvedRightIcon} />
    </div>
  );

  const hintsElement = (
    <Field_hints
      baseStyle
      id={hintId}
      {...sharedSize}
      {...hintsProps}
      textPosition={hintsProps.textPosition ?? "left"}
    />
  );

  if (isInlineLabel) {
    return (
      <div className={rootClass}>
        <div className={inlineRowClass}>
          {inlinePosition === "before" ? labelElement : null}
          {fieldRow}
          {inlinePosition === "after" ? labelElement : null}
        </div>
        {hintsElement}
      </div>
    );
  }

  return (
    <div className={rootClass}>
      {labelPosition === "top" ? labelElement : null}
      {fieldRow}
      {labelPosition === "bottom" ? labelElement : null}
      {hintsElement}
    </div>
  );
});

Select_static.propTypes = {
  labelProps: PropTypes.object,
  leftIconProps: PropTypes.object,
  rightIconProps: PropTypes.object,
  hintsProps: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.object),
  optionsType: PropTypes.oneOf(OPTIONS_TYPES),
  optionValueKey: PropTypes.string,
  optionLabelKey: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  baseStyle: PropTypes.bool,
  sizeType: PropTypes.oneOf(SELECT_SIZE_TYPES),
  id: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

Select_static.displayName = "Select_static";

export default Select_static;
