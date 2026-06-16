/**
 * USE CASE: Options split into labelled sections (like `<optgroup>`).
 * Use for menu categories, status buckets, or any grouped taxonomy.
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
import GenericSelect from "./GenericSelect.jsx";
import {
  Select_fieldShell,
  Select_optionContent,
} from "./select_childComps/_select_childComps.index.js";
import { Select_richControl } from "./select_childComps/Select_controls.jsx";
import {
  SELECT_SIZE_TYPES,
  OPTIONS_TYPES,
  normalizeSelectOptions,
  normalizeOptionsType,
  isRichOptionsType,
  useSelectSingleValue,
  useSelectClickOutside,
} from "./select_helpers/_select_helpers.index.js";
import "../_styles/selects/select_grouped.css";

const Select_grouped = forwardRef(function Select_grouped(
  {
    labelProps = {},
    leftIconProps = {},
    rightIconProps = {},
    hintsProps = {},

    groups = [],
    optionsType = "leftIcon",
    optionValueKey = "value",
    optionLabelKey = "label",
    groupLabelKey = "label",
    optionsKey = "options",
    placeholder = "— select from group —",
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

  const groupedOptions = useMemo(() => {
    return groups.flatMap((group) => {
      const groupLabel = group[groupLabelKey] ?? "";
      const items = group[optionsKey] ?? [];
      return normalizeSelectOptions(items, {
        optionValueKey,
        optionLabelKey,
        optionsType: resolvedOptionsType,
      }).map((opt) => ({ ...opt, groupLabel }));
    });
  }, [
    groups,
    groupLabelKey,
    optionsKey,
    optionValueKey,
    optionLabelKey,
    resolvedOptionsType,
  ]);

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
      groupedOptions.find(
        (opt) => String(opt.value) === String(resolvedValue),
      ) ?? null,
    [groupedOptions, resolvedValue],
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

  const renderGroupedMenuItems = () => {
    let lastGroup = null;

    return groupedOptions.flatMap((opt) => {
      const nodes = [];

      if (opt.groupLabel && opt.groupLabel !== lastGroup) {
        lastGroup = opt.groupLabel;
        nodes.push(
          <li
            key={`group-${opt.groupLabel}`}
            className="select_field__menuGroupLabel"
            role="presentation">
            {opt.groupLabel}
          </li>,
        );
      }

      const isSelected = String(opt.value) === String(resolvedValue ?? "");

      nodes.push(
        <li
          key={`${opt.groupLabel}-${opt.value}-${opt.ariaLabel}`}
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
            handleSelectOption(opt);
            setIsOpen(false);
          }}>
          <Select_optionContent
            option={opt}
            optionsType={resolvedOptionsType}
            sizeType={sizeType}
          />
        </li>,
      );

      return nodes;
    });
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
      normalizedOptions={groupedOptions}
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
      renderMenuItems={renderGroupedMenuItems}
    />
  ) : (
    <GenericSelect
      ref={ref}
      baseStyle
      className="select_field__native"
      value={resolvedValue}
      defaultValue={undefined}
      onChange={(e) => {
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
      {groups.map((group) => {
        const groupLabel = group[groupLabelKey] ?? "";
        const items = group[optionsKey] ?? [];
        const normalized = normalizeSelectOptions(items, {
          optionValueKey,
          optionLabelKey,
          optionsType: resolvedOptionsType,
        });

        return (
          <optgroup key={groupLabel} label={groupLabel}>
            {normalized.map((opt) => (
              <option
                key={`${opt.value}-${opt.ariaLabel}`}
                value={opt.value}
                disabled={opt.disabled}>
                {opt.label || opt.ariaLabel}
              </option>
            ))}
          </optgroup>
        );
      })}
    </GenericSelect>
  );

  return (
    <Select_fieldShell
      variantClass="select_grouped"
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

Select_grouped.propTypes = {
  labelProps: PropTypes.object,
  leftIconProps: PropTypes.object,
  rightIconProps: PropTypes.object,
  hintsProps: PropTypes.object,
  groups: PropTypes.arrayOf(PropTypes.object),
  optionsType: PropTypes.oneOf(OPTIONS_TYPES),
  optionValueKey: PropTypes.string,
  optionLabelKey: PropTypes.string,
  groupLabelKey: PropTypes.string,
  optionsKey: PropTypes.string,
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

Select_grouped.displayName = "Select_grouped";

export default Select_grouped;
