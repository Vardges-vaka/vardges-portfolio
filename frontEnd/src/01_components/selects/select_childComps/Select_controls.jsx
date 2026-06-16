import { useCallback } from "react";
import PropTypes from "prop-types";
import GenericSelect from "../GenericSelect.jsx";
import {
  Select_optionContent,
} from "./_select_childComps.index.js";
import {
  OPTIONS_TYPES,
  isRichOptionsType,
} from "../select_helpers/selectOptionsTypes.js";
import { SELECT_SIZE_TYPES } from "../select_helpers/SELECT_SIZE_TYPES.js";

/**
 * Native `<select>` control styled for Select_fieldShell.
 */
const Select_nativeControl = ({
  refProp,
  resolvedValue,
  placeholder,
  placeholderValue,
  hidePlaceholder = false,
  normalizedOptions,
  isControlled,
  setInternalValue,
  onChange,
  onBlur,
  onFocus,
  sharedFieldA11y,
  selectProps = {},
}) => (
  <GenericSelect
    ref={refProp}
    baseStyle
    className="select_field__native"
    value={resolvedValue}
    defaultValue={undefined}
    onChange={(e) => {
      if (!isControlled) setInternalValue?.(e.target.value);
      onChange?.(e);
    }}
    onBlur={onBlur}
    onFocus={onFocus}
    {...sharedFieldA11y}
    {...selectProps}>
    {!hidePlaceholder && (
      <option value={placeholderValue} disabled={sharedFieldA11y?.required}>
        {placeholder}
      </option>
    )}
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

/**
 * Custom dropdown for icon-rich option layouts.
 */
const Select_richControl = ({
  wrapRef,
  setRef,
  id,
  listboxId,
  name,
  disabled,
  required,
  resolvedValue,
  normalizedOptions,
  optionsType,
  sizeType,
  placeholder,
  selectedOption,
  isOpen,
  setIsOpen,
  onSelectOption,
  onBlur,
  onFocus,
  sharedFieldA11y,
  renderMenuExtra,
  renderMenuItems,
  closeOnSelect = true,
  multiValues = null,
}) => {
  const toggleOpen = useCallback(() => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  }, [disabled, setIsOpen]);

  const defaultRenderMenuItems = () =>
    normalizedOptions.map((opt) => {
      const isSelected = multiValues
        ? multiValues.some((v) => String(v) === String(opt.value))
        : String(opt.value) === String(resolvedValue ?? "");

      return (
        <li
          key={`${opt.value}-${opt.ariaLabel}`}
          role="option"
          aria-selected={isSelected}
          aria-label={opt.ariaLabel}
          className={[
            "select_field__menuItem",
            isSelected && "select_field__menuItem--selected",
            opt.disabled && "select_field__menuItem--disabled",
          ]
            .filter(Boolean)
            .join(" ")}
          onMouseDown={(e) => {
            e.preventDefault();
            onSelectOption(opt);
            if (closeOnSelect) setIsOpen(false);
          }}>
          <Select_optionContent
            option={opt}
            optionsType={optionsType}
            sizeType={sizeType}
          />
        </li>
      );
    });

  return (
    <div className="select_field__rich" ref={wrapRef}>
      <input
        ref={setRef}
        type="hidden"
        name={name}
        value={
          multiValues ? multiValues.join(",") : (resolvedValue ?? "")
        }
        required={required}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
      />

      <button
        type="button"
        id={id}
        className="select_field__trigger"
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
            optionsType={optionsType}
            sizeType={sizeType}
            className="select_field__triggerContent"
          />
        ) : (
          <Select_optionContent
            placeholder
            placeholderText={placeholder}
            optionsType={optionsType}
            sizeType={sizeType}
            className="select_field__triggerContent"
          />
        )}
      </button>

      {isOpen && !disabled && (
        <ul
          id={listboxId}
          className="select_field__menu"
          role="listbox"
          aria-labelledby={id}
          aria-multiselectable={multiValues ? true : undefined}>
          {renderMenuExtra?.()}
          {(renderMenuItems ?? defaultRenderMenuItems)()}
        </ul>
      )}
    </div>
  );
};

Select_nativeControl.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  resolvedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  placeholderValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hidePlaceholder: PropTypes.bool,
  normalizedOptions: PropTypes.array,
  isControlled: PropTypes.bool,
  setInternalValue: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  sharedFieldA11y: PropTypes.object,
  selectProps: PropTypes.object,
  refProp: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

Select_richControl.propTypes = {
  id: PropTypes.string,
  listboxId: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  resolvedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  normalizedOptions: PropTypes.array,
  optionsType: PropTypes.oneOf(OPTIONS_TYPES),
  sizeType: PropTypes.oneOf(SELECT_SIZE_TYPES),
  placeholder: PropTypes.string,
  selectedOption: PropTypes.object,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  onSelectOption: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  sharedFieldA11y: PropTypes.object,
  renderMenuExtra: PropTypes.func,
  renderMenuItems: PropTypes.func,
  closeOnSelect: PropTypes.bool,
  multiValues: PropTypes.array,
  wrapRef: PropTypes.object,
  setRef: PropTypes.func,
};

export { Select_nativeControl, Select_richControl, isRichOptionsType };
