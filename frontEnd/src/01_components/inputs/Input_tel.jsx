/**
 * USE CASE: Phone / WhatsApp / Telegram contact field with country dial codes.
 * Telegram adds username vs phone segmented toggle. Read-only: copy + open link by default.
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
import {
  DEFAULT_TEL_COUNTRY_CODE,
  findCountryByCode,
} from "./input_helpers/telCountryCodes.js";
import Tel_countrySelect from "./input_helpers/Tel_countrySelect.jsx";
import {
  TEL_KINDS,
  TELEGRAM_MODES,
  DEFAULT_PHONE_LEFT_ICON,
  parseTelNumberValue,
  buildTelNumberValue,
  detectTelegramMode,
  sanitizeTelegramUsername,
  sanitizeNationalNumber,
  getTelValidationStatus,
  getTelStatusRightIcon,
  getTelStatusHints,
  getTelActionHref,
  getTelActionTitle,
  formatReadOnlyTelDisplay,
} from "./input_helpers/telValidation.js";
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
  TelWhatsAppIcon,
  TelTelegramIcon,
} from "./input_helpers/telBrandIcons.jsx";
import { UserRound, Phone } from "lucide-react";
import "../_styles/inputs/input_tel.css";

const BRAND_ICON_PX = { sm: 14, md: 16, lg: 18 };
const MODE_ICON_PX = { sm: 12, md: 13, lg: 15 };

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

const Input_tel = forwardRef(function Input_tel(
  {
    kind = "phone",
    labelProps = {},
    leftIconProps = {},
    rightIconProps = {},
    hintsProps = {},
    autoValidate = true,
    readOnly = false,
    readOnlyMaxChars = 18,
    onCopy,

    className,
    baseStyle = true,
    sizeType = "md",

    id: idProp,
    disabled,
    required,
    value,
    defaultValue,
    countryCode: countryCodeProp,
    defaultCountryCode = DEFAULT_TEL_COUNTRY_CODE,
    telegramMode: telegramModeProp,
    defaultTelegramMode = "username",
    onTelegramModeChange,
    onChange,
    onInput,
    placeholder,
    name,
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

  const isCountryControlled = countryCodeProp !== undefined;
  const isTelegramModeControlled = telegramModeProp !== undefined;

  const initialParsed = parseTelNumberValue(
    defaultValue,
    undefined,
    defaultCountryCode,
  );

  const [internalCountryCode, setInternalCountryCode] = useState(
    countryCodeProp ?? initialParsed.countryCode ?? defaultCountryCode,
  );
  const [internalTelegramMode, setInternalTelegramMode] = useState(
    telegramModeProp ??
      (kind === "telegram"
        ? detectTelegramMode(defaultValue)
        : defaultTelegramMode),
  );

  const resolvedCountryCode = isCountryControlled
    ? countryCodeProp
    : internalCountryCode;

  const resolvedTelegramMode =
    kind === "telegram"
      ? isTelegramModeControlled
        ? telegramModeProp
        : internalTelegramMode
      : "number";

  const usesCountrySelect =
    kind === "phone" ||
    kind === "whatsApp" ||
    (kind === "telegram" && resolvedTelegramMode === "number");

  const parsedValue = useMemo(
    () =>
      parseTelNumberValue(
        resolvedValue,
        undefined,
        resolvedCountryCode || defaultCountryCode,
      ),
    [resolvedValue, resolvedCountryCode, defaultCountryCode],
  );

  const nationalNumber = usesCountrySelect ? parsedValue.nationalNumber : "";

  useEffect(() => {
    if (!usesCountrySelect || isCountryControlled) return;
    setInternalCountryCode(parsedValue.countryCode);
  }, [parsedValue.countryCode, usesCountrySelect, isCountryControlled]);

  useEffect(() => {
    if (kind !== "telegram" || isTelegramModeControlled) return;
    setInternalTelegramMode(detectTelegramMode(resolvedValue));
  }, [resolvedValue, kind, isTelegramModeControlled]);

  const validationStatus = useMemo(
    () =>
      autoValidate
        ? getTelValidationStatus(kind, resolvedValue, {
            telegramMode: resolvedTelegramMode,
          })
        : "empty",
    [autoValidate, kind, resolvedValue, resolvedTelegramMode],
  );

  const trimmedValue = String(resolvedValue ?? "").trim();
  const showReadOnlyActions = readOnly && Boolean(trimmedValue);
  const actionHref = getTelActionHref(kind, resolvedValue, {
    telegramMode: resolvedTelegramMode,
  });
  const canOpenAction = Boolean(actionHref);

  const emitChange = useCallback(
    (nextValue) => {
      if (readOnly) return;
      if (!isControlled) setInternalValue(nextValue);
      onChange?.({
        target: { value: nextValue, name },
        currentTarget: { value: nextValue, name },
      });
    },
    [readOnly, isControlled, onChange, name],
  );

  const handleCountryChange = useCallback(
    (nextCode) => {
      if (!isCountryControlled) setInternalCountryCode(nextCode);
      emitChange(buildTelNumberValue(nextCode, nationalNumber));
    },
    [isCountryControlled, emitChange, nationalNumber],
  );

  const handleNationalChange = useCallback(
    (event) => {
      const nextNational = sanitizeNationalNumber(event.target.value);
      emitChange(buildTelNumberValue(resolvedCountryCode, nextNational));
      onInput?.(event);
    },
    [emitChange, resolvedCountryCode, onInput],
  );

  const handleTelegramUsernameChange = useCallback(
    (event) => {
      const nextUsername = sanitizeTelegramUsername(event.target.value);
      emitChange(nextUsername);
      onInput?.(event);
    },
    [emitChange, onInput],
  );

  const handleTelegramModeSwitch = useCallback(
    (nextMode) => {
      if (readOnly || disabled || nextMode === resolvedTelegramMode) return;

      if (!isTelegramModeControlled) {
        setInternalTelegramMode(nextMode);
      }

      onTelegramModeChange?.(nextMode);
      emitChange("");
    },
    [
      readOnly,
      disabled,
      resolvedTelegramMode,
      isTelegramModeControlled,
      onTelegramModeChange,
      emitChange,
    ],
  );

  const handleCopy = useCallback(
    async (event) => {
      event?.preventDefault?.();
      event?.stopPropagation?.();
      if (!trimmedValue) return;

      try {
        await copyTextToClipboard(trimmedValue);
        onCopy?.(trimmedValue);
      } catch (error) {
        console.warn("Input_tel: copy failed", error);
      }
    },
    [trimmedValue, onCopy],
  );

  const handleOpenAction = useCallback(
    (event) => {
      event?.preventDefault?.();
      event?.stopPropagation?.();
      if (!actionHref) return;
      window.open(actionHref, "_blank", "noopener,noreferrer");
    },
    [actionHref],
  );

  const resolvedLeftIcon = useMemo(
    () => ({
      ...DEFAULT_PHONE_LEFT_ICON,
      ...leftIconProps,
    }),
    [leftIconProps],
  );

  const resolvedRightIcon = useMemo(() => {
    if (readOnly) return { isActive: false };
    if (!autoValidate) return rightIconProps;
    return {
      ...getTelStatusRightIcon(validationStatus),
      ...rightIconProps,
    };
  }, [readOnly, autoValidate, validationStatus, rightIconProps]);

  const resolvedHints = useMemo(() => {
    if (!autoValidate) return hintsProps;

    const autoHints = getTelStatusHints(validationStatus, kind);

    if (hintsProps.isActive) {
      return hintsProps;
    }

    return autoHints;
  }, [autoValidate, validationStatus, kind, hintsProps]);

  const displayValue = useMemo(() => {
    if (readOnly) {
      return formatReadOnlyTelDisplay(resolvedValue, readOnlyMaxChars);
    }

    if (kind === "telegram" && resolvedTelegramMode === "username") {
      const username = sanitizeTelegramUsername(resolvedValue);
      return username ? `@${username}` : "";
    }

    if (usesCountrySelect) return nationalNumber;
    return resolvedValue;
  }, [
    readOnly,
    resolvedValue,
    readOnlyMaxChars,
    kind,
    resolvedTelegramMode,
    usesCountrySelect,
    nationalNumber,
  ]);

  const resolvedPlaceholder = useMemo(() => {
    if (placeholder) return placeholder;
    if (kind === "telegram" && resolvedTelegramMode === "username") {
      return "@username";
    }
    return "501234567";
  }, [placeholder, kind, resolvedTelegramMode]);

  const describedBy = resolvedHints.isActive ? hintId : undefined;

  const labelPosition = normalizeLabelPosition(labelProps.position);
  const inlinePosition = labelProps.inlinePosition ?? "before";
  const isLabelActive = Boolean(labelProps.isActive && labelProps.message);
  const isInlineLabel = isLabelActive && labelPosition === "inline";

  const rootClass = [
    baseStyle && "input_tel",
    baseStyle && `input_tel--${sizeType}`,
    baseStyle && `input_tel--${kind}`,
    isInlineLabel && "input_tel--labelInline",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const fieldWrapClass = [
    "input_tel__fieldWrap",
    resolvedLeftIcon.isActive && "input_tel__fieldWrap--withLeftIcon",
    usesCountrySelect && "input_tel__fieldWrap--withCountry",
    kind === "telegram" && "input_tel__fieldWrap--withModeToggle",
    resolvedRightIcon.isActive && "input_tel__fieldWrap--withRightIcon",
    showReadOnlyActions && "input_tel__fieldWrap--withActions",
    readOnly && "input_tel__fieldWrap--readOnly",
    disabled && "input_tel__fieldWrap--disabled",
    resolvedHints.isActive &&
      resolvedHints.type === "error" &&
      "input_tel__fieldWrap--error",
    resolvedHints.isActive &&
      resolvedHints.type === "success" &&
      "input_tel__fieldWrap--success",
  ]
    .filter(Boolean)
    .join(" ");

  const inlineRowClass = [
    "input_tel__inlineRow",
    `input_tel__inlineRow--label${inlinePosition}`,
  ].join(" ");

  const sharedSize = { sizeType };
  const brandIconSize = BRAND_ICON_PX[sizeType] ?? BRAND_ICON_PX.md;
  const modeIconSize = MODE_ICON_PX[sizeType] ?? MODE_ICON_PX.md;

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

  const renderKindIcon = () => {
    if (leftIconProps.isActive === false) return null;

    if (kind === "whatsApp") {
      return (
        <span className="input_tel__brandIconWrap" aria-hidden="true">
          <TelWhatsAppIcon
            size={brandIconSize}
            className="input_tel__brandIcon input_tel__brandIcon--whatsApp"
          />
        </span>
      );
    }

    if (kind === "telegram") {
      return (
        <span className="input_tel__brandIconWrap" aria-hidden="true">
          <TelTelegramIcon
            size={brandIconSize}
            className="input_tel__brandIcon input_tel__brandIcon--telegram"
          />
        </span>
      );
    }

    return <Input_icon baseStyle {...sharedSize} {...resolvedLeftIcon} />;
  };


  const telegramModeToggle =
    kind === "telegram" && !readOnly ? (
      <div
        className="input_tel__modeToggle"
        role="group"
        aria-label="Telegram contact type">
        <button
          type="button"
          className={[
            "input_tel__modeBtn",
            resolvedTelegramMode === "username" && "input_tel__modeBtn--active",
          ]
            .filter(Boolean)
            .join(" ")}
          disabled={disabled}
          aria-pressed={resolvedTelegramMode === "username"}
          aria-label="Username"
          title="Telegram username"
          onClick={() => handleTelegramModeSwitch("username")}>
          <UserRound
            size={modeIconSize}
            strokeWidth={2.1}
            className="input_tel__modeBtnIcon"
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          className={[
            "input_tel__modeBtn",
            resolvedTelegramMode === "number" && "input_tel__modeBtn--active",
          ]
            .filter(Boolean)
            .join(" ")}
          disabled={disabled}
          aria-pressed={resolvedTelegramMode === "number"}
          aria-label="Phone number"
          title="Phone number"
          onClick={() => handleTelegramModeSwitch("number")}>
          <Phone
            size={modeIconSize}
            strokeWidth={2.1}
            className="input_tel__modeBtnIcon"
            aria-hidden="true"
          />
        </button>
      </div>
    ) : null;

  const countrySelect =
    usesCountrySelect && !readOnly ? (
      <Tel_countrySelect
        id={`${id}-country`}
        sizeType={sizeType}
        value={resolvedCountryCode}
        disabled={disabled}
        onChange={handleCountryChange}
      />
    ) : null;

  const readOnlyCountryMeta = useMemo(() => {
    if (!readOnly || !usesCountrySelect || !parsedValue.countryCode) {
      return null;
    }

    return findCountryByCode(parsedValue.countryCode);
  }, [readOnly, usesCountrySelect, parsedValue.countryCode]);

  const readOnlyCountry = readOnlyCountryMeta ? (
    <span
      className="input_tel__readOnlyCountry"
      title={readOnlyCountryMeta.name}>
      <img
        src={readOnlyCountryMeta.flag}
        alt=""
        className="input_tel__countryFlag"
        aria-hidden="true"
      />
      <span className="input_tel__readOnlyCode">{readOnlyCountryMeta.code}</span>
    </span>
  ) : null;

  const readOnlyActions = showReadOnlyActions ? (
    <div className="input_tel__actions">
      <Input_icon
        baseStyle
        {...sharedSize}
        isActive
        type="lucide"
        lucidIcon="Copy"
        title="Copy"
        className="input_tel__actionIcon"
        onClick={handleCopy}
      />
      <Input_icon
        baseStyle
        {...sharedSize}
        isActive
        type="lucide"
        lucidIcon="ExternalLink"
        title={getTelActionTitle(kind, canOpenAction)}
        className={[
          "input_tel__actionIcon",
          !canOpenAction && "input_tel__actionIcon--disabled",
        ]
          .filter(Boolean)
          .join(" ")}
        decorative={!canOpenAction}
        onClick={canOpenAction ? handleOpenAction : undefined}
      />
    </div>
  ) : null;

  const handleMainChange =
    kind === "telegram" && resolvedTelegramMode === "username"
      ? handleTelegramUsernameChange
      : usesCountrySelect
        ? handleNationalChange
        : undefined;

  const inputType =
    kind === "telegram" && resolvedTelegramMode === "username"
      ? "text"
      : "tel";

  const inputMode =
    kind === "telegram" && resolvedTelegramMode === "username"
      ? "text"
      : "tel";

  const fieldRow = (
    <div className={fieldWrapClass}>
      {renderKindIcon()}
      {telegramModeToggle}
      {countrySelect}
      {readOnlyCountry}

      <GenericInput
        ref={ref}
        type={inputType}
        inputMode={inputMode}
        autoComplete={kind === "telegram" ? "off" : "tel"}
        baseStyle
        id={id}
        name={name}
        className="input_tel__input"
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        value={displayValue}
        defaultValue={undefined}
        placeholder={resolvedPlaceholder}
        title={
          readOnly && trimmedValue ? trimmedValue : inputProps.title
        }
        aria-invalid={
          resolvedHints.isActive && resolvedHints.type === "error"
            ? true
            : undefined
        }
        aria-describedby={describedBy}
        onChange={handleMainChange}
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
      textPosition={resolvedHints.textPosition ?? hintsProps.textPosition ?? "left"}
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

Input_tel.propTypes = {
  kind: PropTypes.oneOf(TEL_KINDS),
  labelProps: PropTypes.object,
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
  countryCode: PropTypes.string,
  defaultCountryCode: PropTypes.string,
  telegramMode: PropTypes.oneOf(TELEGRAM_MODES),
  defaultTelegramMode: PropTypes.oneOf(TELEGRAM_MODES),
  onTelegramModeChange: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
};

Input_tel.displayName = "Input_tel";

export default Input_tel;
