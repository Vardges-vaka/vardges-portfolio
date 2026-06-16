/**
 * USE CASE: URL text field with built-in http/https prefix validation.
 * Defaults: Link icon (left), status icon (right), and hints driven by value.
 * Read-only: hides https://, http://, and www. — shows up to 10 chars + copy/open actions.
 */
import { forwardRef, useId, useState, useEffect, useCallback, useMemo } from "react";
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
import {
  getUrlValidationStatus,
  DEFAULT_URL_LEFT_ICON,
  getUrlStatusRightIcon,
  getUrlStatusHints,
  formatReadOnlyUrlDisplay,
  canOpenUrlValue,
} from "./input_helpers/urlValidation.js";
import "../_styles/inputs/input_url.css";

const copyTextToClipboard = async (text) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

const Input_url = forwardRef(function Input_url(
  {
    labelProps = {},
    leftIconProps = {},
    rightIconProps = {},
    hintsProps = {},
    autoValidate = true,
    readOnly = false,
    readOnlyMaxChars = 10,
    onCopy,

    className,
    baseStyle = true,
    sizeType = "md",

    id: idProp,
    disabled,
    required,
    value,
    defaultValue,
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

  const validationStatus = useMemo(
    () => (autoValidate ? getUrlValidationStatus(resolvedValue) : "empty"),
    [autoValidate, resolvedValue],
  );

  const trimmedValue = String(resolvedValue ?? "").trim();
  const showReadOnlyActions = readOnly && Boolean(trimmedValue);
  const canOpenUrl = canOpenUrlValue(trimmedValue);

  const displayValue = useMemo(() => {
    if (!readOnly) return resolvedValue;
    return formatReadOnlyUrlDisplay(resolvedValue, readOnlyMaxChars);
  }, [readOnly, resolvedValue, readOnlyMaxChars]);

  const resolvedLeftIcon = useMemo(
    () => ({
      ...DEFAULT_URL_LEFT_ICON,
      ...leftIconProps,
    }),
    [leftIconProps],
  );

  const resolvedRightIcon = useMemo(() => {
    if (readOnly) {
      return { isActive: false };
    }

    if (!autoValidate) {
      return rightIconProps;
    }

    return {
      ...getUrlStatusRightIcon(validationStatus),
      ...rightIconProps,
    };
  }, [readOnly, autoValidate, validationStatus, rightIconProps]);

  const resolvedHints = useMemo(() => {
    if (!autoValidate) {
      return hintsProps;
    }

    return {
      ...getUrlStatusHints(validationStatus),
      ...hintsProps,
    };
  }, [autoValidate, validationStatus, hintsProps]);

  const handleChange = useCallback(
    (e) => {
      if (readOnly) return;
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e);
    },
    [readOnly, isControlled, onChange],
  );

  const handleInput = useCallback(
    (e) => {
      if (readOnly) return;
      if (!isControlled) setInternalValue(e.target.value);
      onInput?.(e);
    },
    [readOnly, isControlled, onInput],
  );

  const handleCopyUrl = useCallback(
    async (event) => {
      event?.preventDefault?.();
      event?.stopPropagation?.();
      if (!trimmedValue) return;

      try {
        await copyTextToClipboard(trimmedValue);
        onCopy?.(trimmedValue);
      } catch (error) {
        console.warn("Input_url: copy failed", error);
      }
    },
    [trimmedValue, onCopy],
  );

  const handleOpenUrl = useCallback(
    (event) => {
      event?.preventDefault?.();
      event?.stopPropagation?.();
      if (!trimmedValue || !canOpenUrl) return;
      window.open(trimmedValue, "_blank", "noopener,noreferrer");
    },
    [trimmedValue, canOpenUrl],
  );

  const describedBy = resolvedHints.isActive ? hintId : undefined;

  const labelPosition = normalizeLabelPosition(labelProps.position);
  const inlinePosition = labelProps.inlinePosition ?? "before";
  const isLabelActive = Boolean(labelProps.isActive && labelProps.message);
  const isInlineLabel = isLabelActive && labelPosition === "inline";

  const rootClass = [
    baseStyle && "input_url",
    baseStyle && `input_url--${sizeType}`,
    isInlineLabel && "input_url--labelInline",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const fieldWrapClass = [
    "input_url__fieldWrap",
    resolvedLeftIcon.isActive && "input_url__fieldWrap--withLeftIcon",
    resolvedRightIcon.isActive && "input_url__fieldWrap--withRightIcon",
    showReadOnlyActions && "input_url__fieldWrap--withActions",
    readOnly && "input_url__fieldWrap--readOnly",
    disabled && "input_url__fieldWrap--disabled",
    resolvedHints.isActive &&
      resolvedHints.type === "error" &&
      "input_url__fieldWrap--error",
    resolvedHints.isActive &&
      resolvedHints.type === "success" &&
      "input_url__fieldWrap--success",
    autoValidate &&
      validationStatus === "secure" &&
      "input_url__fieldWrap--success",
    autoValidate &&
      validationStatus === "insecure" &&
      "input_url__fieldWrap--warning",
  ]
    .filter(Boolean)
    .join(" ");

  const inlineRowClass = [
    "input_url__inlineRow",
    `input_url__inlineRow--label${inlinePosition}`,
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

  const readOnlyActions = showReadOnlyActions ? (
    <div className="input_url__actions">
      <Input_icon
        baseStyle
        {...sharedSize}
        isActive
        type="lucide"
        lucidIcon="Copy"
        title="Copy URL"
        className="input_url__actionIcon"
        onClick={handleCopyUrl}
      />
      <Input_icon
        baseStyle
        {...sharedSize}
        isActive
        type="lucide"
        lucidIcon="ExternalLink"
        title={canOpenUrl ? "Open in new tab" : "Enter a valid http(s) URL to open"}
        className={[
          "input_url__actionIcon",
          !canOpenUrl && "input_url__actionIcon--disabled",
        ]
          .filter(Boolean)
          .join(" ")}
        decorative={!canOpenUrl}
        onClick={canOpenUrl ? handleOpenUrl : undefined}
      />
    </div>
  ) : null;

  const fieldRow = (
    <div className={fieldWrapClass}>
      <Input_icon baseStyle {...sharedSize} {...resolvedLeftIcon} />

      <GenericInput
        ref={ref}
        type="url"
        inputMode="url"
        autoComplete="url"
        baseStyle
        id={id}
        className="input_url__input"
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        value={displayValue}
        defaultValue={undefined}
        title={
          readOnly && trimmedValue
            ? trimmedValue
            : inputProps.title
        }
        aria-invalid={
          resolvedHints.isActive && resolvedHints.type === "error"
            ? true
            : undefined
        }
        aria-describedby={describedBy}
        onChange={handleChange}
        onInput={handleInput}
        {...inputProps}
      />

      {readOnlyActions}
      {!readOnly ? (
        <Input_icon baseStyle {...sharedSize} {...resolvedRightIcon} />
      ) : null}
    </div>
  );

  const hintsElement = (
    <Input_hints
      baseStyle
      id={hintId}
      {...sharedSize}
      {...resolvedHints}
      textPosition={resolvedHints.textPosition ?? "left"}
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

Input_url.propTypes = {
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
  leftIconProps: PropTypes.object,
  rightIconProps: PropTypes.object,
  hintsProps: PropTypes.shape({
    isActive: PropTypes.bool,
    type: PropTypes.oneOf(["hint", "error", "success"]),
    message: PropTypes.node,
    textPosition: PropTypes.oneOf(HINT_TEXT_POSITIONS),
    className: PropTypes.string,
  }),
  autoValidate: PropTypes.bool,
  readOnly: PropTypes.bool,
  readOnlyMaxChars: PropTypes.number,
  onCopy: PropTypes.func,
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

Input_url.displayName = "Input_url";

export default Input_url;
