/**
 * USE CASE: Filter a long static list with a search box inside the dropdown.
 * Ideal for countries, cities, SKU lists — keeps the page fast without API calls.
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
  useSelectSingleValue,
  useSelectClickOutside,
} from "./select_helpers/_select_helpers.index.js";
import "../_styles/selects/select_searchable.css";

const Select_searchable = forwardRef(function Select_searchable(
  {
    labelProps = {},
    leftIconProps = {},
    rightIconProps = {},
    hintsProps = {},

    options = [],
    optionsType = "full",
    optionValueKey = "value",
    optionLabelKey = "label",
    placeholder = "— search & select —",
    searchPlaceholder = "Type to filter…",
    noResultsText = "No matches",

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
  },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const hintId = `${id}-hint`;
  const listboxId = `${id}-listbox`;
  const searchId = `${id}-search`;

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

  const { resolvedValue, fireChange } = useSelectSingleValue({
    value,
    defaultValue,
    onChange,
    name,
    id,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredOptions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return normalizedOptions;
    return normalizedOptions.filter((opt) => {
      const label = String(opt.label ?? opt.ariaLabel ?? "").toLowerCase();
      return label.includes(q);
    });
  }, [normalizedOptions, searchQuery]);

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
      setSearchQuery("");
      hiddenInputRef.current?.focus?.();
    },
    [disabled, fireChange],
  );

  useSelectClickOutside(isOpen, wrapRef, () => {
    setIsOpen(false);
    setSearchQuery("");
  });

  const sharedFieldA11y = {
    "aria-invalid":
      hintsProps.isActive && hintsProps.type === "error" ? true : undefined,
    "aria-describedby": hintsProps.isActive ? hintId : undefined,
  };

  const control = (
    <Select_richControl
      wrapRef={wrapRef}
      setRef={setRef}
      id={id}
      listboxId={listboxId}
      name={name}
      disabled={disabled}
      required={required}
      resolvedValue={resolvedValue}
      normalizedOptions={filteredOptions}
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
      renderMenuExtra={() => (
        <li className="select_searchable__searchWrap" role="presentation">
          <input
            id={searchId}
            type="search"
            className="select_field__search select_searchable__search"
            placeholder={searchPlaceholder}
            value={searchQuery}
            autoComplete="off"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          />
        </li>
      )}
      renderMenuItems={() => {
        if (!filteredOptions.length) {
          return (
            <li className="select_field__empty" role="presentation">
              {noResultsText}
            </li>
          );
        }

        return filteredOptions.map((opt) => {
          const isSelected =
            String(opt.value) === String(resolvedValue ?? "");

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
                handleSelectOption(opt);
                setIsOpen(false);
              }}>
              <Select_optionContent
                option={opt}
                optionsType={resolvedOptionsType}
                sizeType={sizeType}
              />
            </li>
          );
        });
      }}
    />
  );

  return (
    <Select_fieldShell
      variantClass="select_searchable"
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

Select_searchable.propTypes = {
  labelProps: PropTypes.object,
  leftIconProps: PropTypes.object,
  rightIconProps: PropTypes.object,
  hintsProps: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.object),
  optionsType: PropTypes.oneOf(OPTIONS_TYPES),
  optionValueKey: PropTypes.string,
  optionLabelKey: PropTypes.string,
  placeholder: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  noResultsText: PropTypes.string,
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

Select_searchable.displayName = "Select_searchable";

export default Select_searchable;
