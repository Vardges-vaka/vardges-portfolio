import { forwardRef, useId, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Input_label,
  Input_hints,
  Input_length,
} from "./input_childComps/_input_childComps.index.js";
import { mapDataProps } from "./input_helpers/mapDataProps.js";
import { INPUT_SIZE_TYPES } from "./input_helpers/inputSizeTypes.js";
import {
  LABEL_INLINE_POSITIONS,
  LABEL_POSITIONS,
  HINT_TEXT_POSITIONS,
  LABEL_TEXT_POSITIONS,
  normalizeLabelPosition,
} from "./input_helpers/inputLabelLayout.js";
import "../_styles/inputs/input_textArea.css";

const TEXTAREA_RESIZE = ["none", "vertical", "horizontal", "both"];

const getCharCount = (val) => String(val ?? "").length;

/**
 * Multi-line field — same label / hint API as Input_text.
 * Optional lengthProps + maxLength shows "127/500" inside the field shell.
 */
const Input_textArea = forwardRef(function Input_textArea(allProps, ref) {
  const { dataAttributes, rest: propsAfterData } = mapDataProps(allProps);

  const {
    labelProps = {},
    hintsProps = {},
    lengthProps = {},

    className,
    baseStyle = true,
    sizeType = "md",
    rows = 4,
    cols,
    wrap,
    resize = "vertical",

    id: idProp,
    disabled,
    readOnly,
    required,
    style,
    name,
    value,
    defaultValue,
    placeholder,
    autoFocus,
    title,
    tabIndex,
    minLength,
    maxLength,
    spellCheck,
    onChange,
    onFocus,
    onBlur,
    onInput,
    onInvalid,
    onSelect,
    onClick,
    onKeyDown,
    onKeyUp,
    ...rest
  } = propsAfterData;

  const autoId = useId();
  const id = idProp ?? autoId;
  const hintId = `${id}-hint`;
  const lengthId = `${id}-length`;

  const showLength = Boolean(lengthProps.isActive && maxLength != null);

  const [charCount, setCharCount] = useState(() =>
    getCharCount(value ?? defaultValue),
  );

  useEffect(() => {
    if (value !== undefined) {
      setCharCount(getCharCount(value));
    }
  }, [value]);

  const handleChange = useCallback(
    (e) => {
      setCharCount(getCharCount(e.target.value));
      onChange?.(e);
    },
    [onChange],
  );

  const handleInput = useCallback(
    (e) => {
      setCharCount(getCharCount(e.target.value));
      onInput?.(e);
    },
    [onInput],
  );

  const describedBy =
    [hintsProps.isActive ? hintId : null, showLength ? lengthId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const labelPosition = normalizeLabelPosition(labelProps.position);
  const inlinePosition = labelProps.inlinePosition ?? "before";
  const isLabelActive = Boolean(labelProps.isActive && labelProps.message);
  const isInlineLabel = isLabelActive && labelPosition === "inline";

  const resizeMod = TEXTAREA_RESIZE.includes(resize) ? resize : "vertical";

  const rootClass = [
    baseStyle && "input_textArea",
    baseStyle && `input_textArea--${sizeType}`,
    baseStyle && `input_textArea--resize${capitalize(resizeMod)}`,
    isInlineLabel && "input_textArea--labelInline",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const fieldWrapClass = [
    "input_textArea__fieldWrap",
    showLength && "input_textArea__fieldWrap--withLength",
    disabled && "input_textArea__fieldWrap--disabled",
    hintsProps.isActive &&
      hintsProps.type === "error" &&
      "input_textArea__fieldWrap--error",
    hintsProps.isActive &&
      hintsProps.type === "success" &&
      "input_textArea__fieldWrap--success",
  ]
    .filter(Boolean)
    .join(" ");

  const inlineRowClass = [
    "input_textArea__inlineRow",
    `input_textArea__inlineRow--label${inlinePosition}`,
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

  const fieldRow = (
    <div className={fieldWrapClass}>
      <textarea
        ref={ref}
        id={id}
        className="input_textArea__textarea"
        style={style}
        name={name}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        rows={rows}
        cols={cols}
        wrap={wrap}
        autoFocus={autoFocus}
        title={title}
        tabIndex={tabIndex}
        minLength={minLength}
        maxLength={maxLength}
        spellCheck={spellCheck}
        aria-invalid={
          hintsProps.isActive && hintsProps.type === "error" ? true : undefined
        }
        aria-describedby={describedBy}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onInput={handleInput}
        onInvalid={onInvalid}
        onSelect={onSelect}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        {...rest}
        {...dataAttributes}
      />
      <Input_length
        baseStyle
        id={lengthId}
        placement="footer"
        {...sharedSize}
        {...lengthProps}
        isActive={showLength}
        current={charCount}
        max={maxLength}
        textPosition={lengthProps.textPosition ?? "right"}
      />
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

function capitalize(str) {
  if (!str) return "Vertical";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

Input_textArea.propTypes = {
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
  hintsProps: PropTypes.shape({
    isActive: PropTypes.bool,
    type: PropTypes.oneOf(["hint", "error", "success"]),
    message: PropTypes.node,
    textPosition: PropTypes.oneOf(HINT_TEXT_POSITIONS),
    className: PropTypes.string,
  }),
  lengthProps: PropTypes.shape({
    isActive: PropTypes.bool,
    textPosition: PropTypes.oneOf(HINT_TEXT_POSITIONS),
    className: PropTypes.string,
  }),
  className: PropTypes.string,
  baseStyle: PropTypes.bool,
  sizeType: PropTypes.oneOf(INPUT_SIZE_TYPES),
  rows: PropTypes.number,
  cols: PropTypes.number,
  wrap: PropTypes.oneOf(["soft", "hard"]),
  resize: PropTypes.oneOf(TEXTAREA_RESIZE),
  id: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

Input_textArea.displayName = "Input_textArea";

export default Input_textArea;
