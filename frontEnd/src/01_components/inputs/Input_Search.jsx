/**
 * USE CASE: Search / filter text field.
 * Defaults: Search icon (left), Clear icon (right, always visible),
 * optional 2nd-right icon via secondaryRightIconProps (with onClick).
 * Uses type="text" + role="searchbox" — not type="search" — so the browser
 * does not inject its own clear button alongside our custom icons.
 */
import {
  forwardRef,
  useId,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import {
  Input_label,
  Input_icon,
  Input_hints,
} from "./input_childComps/_input_childComps.index.js";
import GenericInput from "./GenericInput.jsx";
import { INPUT_SIZE_TYPES } from "./input_helpers/inputSizeTypes.js";
import {
  LABEL_INLINE_POSITIONS,
  LABEL_POSITIONS,
  HINT_TEXT_POSITIONS,
  LABEL_TEXT_POSITIONS,
  normalizeLabelPosition,
} from "./input_helpers/inputLabelLayout.js";
import "../_styles/inputs/input_search.css";

const DEFAULT_SEARCH_LEFT_ICON = {
  isActive: true,
  type: "lucide",
  lucidIcon: "Search",
  decorative: true,
};

const DEFAULT_CLEAR_ICON = {
  isActive: true,
  type: "lucide",
  lucidIcon: "X",
  title: "Clear search",
  className: "input_search__clearIcon",
};

const Input_search = forwardRef(function Input_search(
  {
    labelProps = {},
    leftIconProps = {},
    clearIconProps = {},
    secondaryRightIconProps = {},
    hintsProps = {},
    onClear,

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
    onInput,
    ...inputProps
  },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const hintId = `${id}-hint`;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const resolvedValue = isControlled ? value : internalValue;

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const hasValue = String(resolvedValue ?? "").length > 0;

  const resolvedLeftIcon = useMemo(
    () => ({
      ...DEFAULT_SEARCH_LEFT_ICON,
      ...leftIconProps,
    }),
    [leftIconProps],
  );

  const handleChange = useCallback(
    (e) => {
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e);
    },
    [isControlled, onChange],
  );

  const handleInput = useCallback(
    (e) => {
      if (!isControlled) setInternalValue(e.target.value);
      onInput?.(e);
    },
    [isControlled, onInput],
  );

  const handleClear = useCallback(
    (event) => {
      event?.preventDefault?.();
      event?.stopPropagation?.();
      if (disabled) return;

      const empty = "";

      if (!isControlled) setInternalValue(empty);

      onChange?.({
        target: { value: empty, name, id },
        currentTarget: { value: empty, name, id },
      });

      onClear?.();
    },
    [disabled, isControlled, onChange, onClear, name, id],
  );

  const resolvedClearIcon = useMemo(() => {
    const isClearActive = clearIconProps.isActive ?? true;

    return {
      ...DEFAULT_CLEAR_ICON,
      ...clearIconProps,
      isActive: isClearActive && !disabled,
      onClick: disabled ? undefined : (clearIconProps.onClick ?? handleClear),
      className: [
        "input_search__clearIcon",
        !hasValue && "input_search__clearIcon--empty",
        clearIconProps.className,
      ]
        .filter(Boolean)
        .join(" "),
    };
  }, [clearIconProps, hasValue, disabled, handleClear]);

  const resolvedSecondaryRightIcon = useMemo(
    () => ({
      className: "input_search__secondaryIcon",
      ...secondaryRightIconProps,
    }),
    [secondaryRightIconProps],
  );

  const describedBy = hintsProps.isActive ? hintId : undefined;

  const labelPosition = normalizeLabelPosition(labelProps.position);
  const inlinePosition = labelProps.inlinePosition ?? "before";
  const isLabelActive = Boolean(labelProps.isActive && labelProps.message);
  const isInlineLabel = isLabelActive && labelPosition === "inline";

  const rootClass = [
    baseStyle && "input_search",
    baseStyle && `input_search--${sizeType}`,
    isInlineLabel && "input_search--labelInline",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const fieldWrapClass = [
    "input_search__fieldWrap",
    resolvedLeftIcon.isActive && "input_search__fieldWrap--withLeftIcon",
    (resolvedClearIcon.isActive || resolvedSecondaryRightIcon.isActive) &&
      "input_search__fieldWrap--withRightIcons",
    disabled && "input_search__fieldWrap--disabled",
    hintsProps.isActive &&
      hintsProps.type === "error" &&
      "input_search__fieldWrap--error",
    hintsProps.isActive &&
      hintsProps.type === "success" &&
      "input_search__fieldWrap--success",
  ]
    .filter(Boolean)
    .join(" ");

  const inlineRowClass = [
    "input_search__inlineRow",
    `input_search__inlineRow--label${inlinePosition}`,
  ].join(" ");

  const sharedSize = { sizeType };

  const labelElement = isLabelActive ? (
    <Input_label
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

  const rightIcons = (
    <div className="input_search__rightIcons">
      {resolvedSecondaryRightIcon.isActive ? (
        <Input_icon baseStyle {...sharedSize} {...resolvedSecondaryRightIcon} />
      ) : null}
      {resolvedClearIcon.isActive ? (
        <Input_icon baseStyle {...sharedSize} {...resolvedClearIcon} />
      ) : null}
    </div>
  );

  const fieldRow = (
    <div className={fieldWrapClass}>
      <Input_icon baseStyle {...sharedSize} {...resolvedLeftIcon} />

      <GenericInput
        ref={ref}
        inputMode="search"
        autoComplete="off"
        enterKeyHint="search"
        baseStyle
        id={id}
        name={name}
        className="input_search__input"
        disabled={disabled}
        required={required}
        value={resolvedValue}
        defaultValue={undefined}
        aria-invalid={
          hintsProps.isActive && hintsProps.type === "error" ? true : undefined
        }
        aria-describedby={describedBy}
        onChange={handleChange}
        onInput={handleInput}
        {...inputProps}
        type="text"
        role="searchbox"
      />

      {rightIcons}
    </div>
  );

  const hintsElement = (
    <Input_hints
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

const iconPropsShape = PropTypes.shape({
  isActive: PropTypes.bool,
  type: PropTypes.oneOf(["lucide", "svg"]),
  lucidIcon: PropTypes.string,
  svg_src: PropTypes.string,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  title: PropTypes.string,
  className: PropTypes.string,
});

Input_search.propTypes = {
  labelProps: PropTypes.shape({
    isActive: PropTypes.bool,
    message: PropTypes.node,
    htmlFor: PropTypes.string,
    required: PropTypes.bool,
    position: PropTypes.oneOf([...LABEL_POSITIONS, "down"]),
    inlinePosition: PropTypes.oneOf(LABEL_INLINE_POSITIONS),
    textPosition: PropTypes.oneOf(LABEL_TEXT_POSITIONS),
    className: PropTypes.string,
    iconProps: PropTypes.object,
    onHover: PropTypes.func,
    onClick: PropTypes.func,
    title: PropTypes.string,
  }),
  leftIconProps: iconPropsShape,
  clearIconProps: iconPropsShape,
  secondaryRightIconProps: iconPropsShape,
  hintsProps: PropTypes.shape({
    isActive: PropTypes.bool,
    type: PropTypes.oneOf(["hint", "error", "success"]),
    message: PropTypes.node,
    textPosition: PropTypes.oneOf(HINT_TEXT_POSITIONS),
    className: PropTypes.string,
  }),
  onClear: PropTypes.func,
  className: PropTypes.string,
  baseStyle: PropTypes.bool,
  sizeType: PropTypes.oneOf(INPUT_SIZE_TYPES),
  id: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onInput: PropTypes.func,
};

Input_search.displayName = "Input_search";

export default Input_search;
