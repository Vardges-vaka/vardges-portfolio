import { forwardRef } from "react";
import PropTypes from "prop-types";
import { mapDataProps } from "./input_helpers/mapDataProps.js";
import "../_styles/inputs/genericInput.css";

/**
 * Low-level `<input>` primitive for all typed input wrappers.
 *
 * Pass field metadata via `data_*` props — they are mapped to `data-*` attributes
 * and read back from `e.target.dataset` in handlers:
 *
 *   data_name="brand"           → dataset.name
 *   data_field_name="tagline"   → dataset.fieldName
 */
const GenericInput = forwardRef(function GenericInput(allProps, ref) {
  const { dataAttributes, rest: propsAfterData } = mapDataProps(allProps);

  const {
    // 1. Styling / CSS
    className,
    baseStyle = false,
    style,

    // 2. Basic identity / input definition
    type,
    name,
    id,

    // 3. Controlled / uncontrolled value props
    value,
    defaultValue,
    checked,
    defaultChecked,

    // 4. User guidance / UX
    placeholder,
    autoComplete,
    autoFocus,
    title,
    inputMode,
    enterKeyHint,
    spellCheck,

    // 5. State / behavior
    disabled,
    readOnly,
    required,
    hidden,
    tabIndex,

    // 6. Validation / constraints
    min,
    max,
    minLength,
    maxLength,
    step,
    pattern,

    // 7. Size / display-related input behavior
    size,

    // 8. File input props
    multiple,
    accept,
    capture,

    // 9. Datalist / autocomplete list connection
    list,

    // 10. Form association / form submission behavior
    form,
    formAction,
    formEncType,
    formMethod,
    formNoValidate,
    formTarget,

    // 11. Text direction metadata
    dirname,

    // 12. Accessibility / semantics (native data-* / aria-* can also pass via rest)
    role,

    // 13. Event handlers
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

  let resolvedClassName = className ?? "";

  if (baseStyle) {
    resolvedClassName = resolvedClassName
      ? `GenericInput ${resolvedClassName}`
      : "GenericInput";
  }

  return (
    <input
      ref={ref}
      className={resolvedClassName || undefined}
      style={style}
      type={type}
      name={name}
      id={id}
      value={value}
      defaultValue={defaultValue}
      checked={checked}
      defaultChecked={defaultChecked}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      hidden={hidden}
      tabIndex={tabIndex}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      title={title}
      inputMode={inputMode}
      enterKeyHint={enterKeyHint}
      spellCheck={spellCheck}
      min={min}
      max={max}
      minLength={minLength}
      maxLength={maxLength}
      step={step}
      pattern={pattern}
      size={size}
      multiple={multiple}
      accept={accept}
      capture={capture}
      list={list}
      form={form}
      formAction={formAction}
      formEncType={formEncType}
      formMethod={formMethod}
      formNoValidate={formNoValidate}
      formTarget={formTarget}
      dirname={dirname}
      role={role}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onInput={onInput}
      onInvalid={onInvalid}
      onSelect={onSelect}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      {...rest}
      {...dataAttributes}
    />
  );
});

GenericInput.propTypes = {
  // Styling
  className: PropTypes.string,
  baseStyle: PropTypes.bool,
  style: PropTypes.object,

  // Identity
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  id: PropTypes.string,

  // Value
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,

  // UX
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  title: PropTypes.string,
  inputMode: PropTypes.oneOf([
    "none",
    "text",
    "tel",
    "url",
    "email",
    "numeric",
    "decimal",
    "search",
  ]),
  enterKeyHint: PropTypes.oneOf([
    "enter",
    "done",
    "go",
    "next",
    "previous",
    "search",
    "send",
  ]),
  spellCheck: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  // State
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  hidden: PropTypes.bool,
  tabIndex: PropTypes.number,

  // Validation / constraints
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pattern: PropTypes.string,

  // Display
  size: PropTypes.number,

  // File
  multiple: PropTypes.bool,
  accept: PropTypes.string,
  capture: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(["user", "environment"]),
  ]),

  // Datalist
  list: PropTypes.string,

  // Form association
  form: PropTypes.string,
  formAction: PropTypes.string,
  formEncType: PropTypes.string,
  formMethod: PropTypes.string,
  formNoValidate: PropTypes.bool,
  formTarget: PropTypes.string,

  // Text direction
  dirname: PropTypes.string,

  // A11y
  role: PropTypes.string,

  // Events
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onInput: PropTypes.func,
  onInvalid: PropTypes.func,
  onSelect: PropTypes.func,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
};

GenericInput.displayName = "GenericInput";

export { mapDataProps };
export default GenericInput;
