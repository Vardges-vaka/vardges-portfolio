/**
 * USE CASE: Pick one MongoDB document reference from a pre-loaded list.
 * Stores `_id` as the value and shows `name` (or custom keys) in the UI.
 * Typical for brand, kitchen, contract, or any populated ref dropdown.
 */
import {
  forwardRef,
  useId,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import { Select_fieldShell } from "./select_childComps/_select_childComps.index.js";
import {
  Select_nativeControl,
  Select_richControl,
  isRichOptionsType,
} from "./select_childComps/Select_controls.jsx";
import {
  SELECT_SIZE_TYPES,
  OPTIONS_TYPES,
  normalizeSelectOptions,
  normalizeOptionsType,
  useSelectSingleValue,
  useSelectClickOutside,
} from "./select_helpers/_select_helpers.index.js";
import "../_styles/selects/select_relational.css";

const Select_relational = forwardRef(function Select_relational(
  {
    labelProps = {},
    leftIconProps = {},
    rightIconProps = {},
    hintsProps = {},

    options = [],
    optionsType = "leftIcon",
    optionValueKey = "_id",
    optionLabelKey = "name",
    placeholder = "— select record —",
    placeholderValue = "",

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
    ...selectProps
  },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const hintId = `${id}-hint`;
  const listboxId = `${id}-listbox`;

  const resolvedOptionsType = normalizeOptionsType(optionsType);
  const useRichPicker = isRichOptionsType(resolvedOptionsType);

  const normalizedOptions = useMemo(
    () =>
      normalizeSelectOptions(options, {
        optionValueKey,
        optionLabelKey,
        optionsType: resolvedOptionsType,
      }),
    [options, optionValueKey, optionLabelKey, resolvedOptionsType],
  );

  const { isControlled, resolvedValue, fireChange, setInternalValue } =
    useSelectSingleValue({ value, defaultValue, onChange, name, id });

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

  const handleSelectOption = useCallback(
    (opt) => {
      if (disabled || opt.disabled) return;
      fireChange(opt.value);
      hiddenInputRef.current?.focus?.();
    },
    [disabled, fireChange],
  );

  useSelectClickOutside(isOpen, wrapRef, () => setIsOpen(false));

  const sharedFieldA11y = {
    id: useRichPicker ? undefined : id,
    name,
    disabled,
    required,
    "aria-invalid":
      hintsProps.isActive && hintsProps.type === "error" ? true : undefined,
    "aria-describedby": hintsProps.isActive ? hintId : undefined,
  };

  const control = useRichPicker ? (
    <Select_richControl
      wrapRef={wrapRef}
      setRef={setRef}
      id={id}
      listboxId={listboxId}
      name={name}
      disabled={disabled}
      required={required}
      resolvedValue={resolvedValue}
      normalizedOptions={normalizedOptions}
      optionsType={resolvedOptionsType}
      sizeType={sizeType}
      placeholder={placeholder}
      selectedOption={selectedOption}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onSelectOption={handleSelectOption}
      onBlur={onBlur}
      onFocus={onFocus}
      sharedFieldA11y={sharedFieldA11y}
    />
  ) : (
    <Select_nativeControl
      refProp={ref}
      id={id}
      name={name}
      disabled={disabled}
      required={required}
      resolvedValue={resolvedValue}
      placeholder={placeholder}
      placeholderValue={placeholderValue}
      normalizedOptions={normalizedOptions}
      isControlled={isControlled}
      setInternalValue={setInternalValue}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      sharedFieldA11y={sharedFieldA11y}
      selectProps={selectProps}
    />
  );

  return (
    <Select_fieldShell
      variantClass="select_relational"
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
      isRich={useRichPicker}>
      {control}
    </Select_fieldShell>
  );
});

Select_relational.propTypes = {
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
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

Select_relational.displayName = "Select_relational";

export default Select_relational;
