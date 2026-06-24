/**
 * USE CASE: Password fields with kind-specific layouts.
 * createNew — password + strength + confirm
 * AuthLogIn — single password with visibility toggle
 * change — current + new (strength) + confirm
 */
import {
  forwardRef,
  useId,
  useState,
  useCallback,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import {
  Input_label,
  Input_icon,
  Input_hints,
  Input_pswStrenght,
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
  PASSWORD_KINDS,
  PASSWORD_REQUIREMENT_KEYS,
  PASSWORD_REQUIREMENT_LABELS,
  getPasswordRequirements,
  allPasswordRequirementsMet,
  getConfirmMatchStatus,
  DEFAULT_CONFIRM_HINT,
  AUTH_LOG_IN_KIND_OF,
  PASSWORD_FIELD_ICON_ROLES,
} from "./input_helpers/passwordValidation.js";
import "../_styles/inputs/input_password.css";

const PasswordRequirementsList = ({ password }) => {
  const requirements = getPasswordRequirements(password);

  return (
    <ul className="input_password__requirements">
      {PASSWORD_REQUIREMENT_KEYS.map((key) => {
        const met = requirements[key];

        return (
          <li
            key={key}
            className={`input_password__requirement input_password__requirement--${met ? "met" : "unmet"}`}>
            <span className="input_password__requirementMark" aria-hidden="true">
              {met ? "✓" : "○"}
            </span>
            <span>{PASSWORD_REQUIREMENT_LABELS[key]}</span>
          </li>
        );
      })}
    </ul>
  );
};

PasswordRequirementsList.propTypes = {
  password: PropTypes.string,
};

const PasswordFieldBlock = ({
  fieldId,
  strengthId,
  labelProps = {},
  hintsProps = {},
  leftIconProps = {},
  defaultLeftIcon = PASSWORD_FIELD_ICON_ROLES.lock,
  rightIconProps = {},
  sizeType = "md",
  disabled = false,
  required = false,
  value = "",
  onChange,
  onInput,
  name,
  placeholder,
  autoComplete,
  autoValidate = false,
  showStrength = false,
  strengthProps = {},
  showRequirements = false,
  showVisibleToggle = true,
  visible: visibleProp,
  onVisibleChange,
  inputRef,
  inputProps = {},
}) => {
  const hintId = `${fieldId}-hint`;
  const [internalVisible, setInternalVisible] = useState(false);
  const isVisibleControlled = visibleProp !== undefined;
  const visible = isVisibleControlled ? visibleProp : internalVisible;

  const toggleVisible = useCallback(() => {
    const next = !visible;
    if (!isVisibleControlled) setInternalVisible(next);
    onVisibleChange?.(next);
  }, [visible, isVisibleControlled, onVisibleChange]);

  const resolvedLeftIcon = useMemo(
    () => ({
      ...defaultLeftIcon,
      ...leftIconProps,
    }),
    [defaultLeftIcon, leftIconProps],
  );

  const defaultEyeIcon = useMemo(
    () => ({
      isActive: showVisibleToggle,
      type: "lucide",
      lucidIcon: visible ? "EyeOff" : "Eye",
      onClick: toggleVisible,
      title: visible ? "Hide password" : "Show password",
    }),
    [showVisibleToggle, visible, toggleVisible],
  );

  const resolvedRightIcon = useMemo(
    () => ({
      ...defaultEyeIcon,
      ...rightIconProps,
    }),
    [defaultEyeIcon, rightIconProps],
  );

  const requirements = useMemo(
    () => getPasswordRequirements(value),
    [value],
  );

  const allRequirementsMet = allPasswordRequirementsMet(requirements);
  const hasValue = String(value ?? "").length > 0;

  const resolvedHints = useMemo(() => {
    if (hintsProps.isActive) return hintsProps;
    if (!autoValidate) return { isActive: false };

    if (showRequirements) {
      return { isActive: false };
    }

    return { isActive: false };
  }, [hintsProps, autoValidate, showRequirements]);

  const fieldHasError =
    autoValidate &&
    showRequirements &&
    hasValue &&
    !allRequirementsMet;

  const fieldHasSuccess =
    autoValidate && showRequirements && hasValue && allRequirementsMet;

  const labelPosition = normalizeLabelPosition(labelProps.position);
  const inlinePosition = labelProps.inlinePosition ?? "before";
  const isLabelActive = Boolean(labelProps.isActive && labelProps.message);
  const isInlineLabel = isLabelActive && labelPosition === "inline";

  const sharedSize = { sizeType };

  const fieldWrapClass = [
    "input_password__fieldWrap",
    resolvedLeftIcon.isActive && "input_password__fieldWrap--withLeftIcon",
    resolvedRightIcon.isActive &&
      "input_password__fieldWrap--withRightIcon",
    disabled && "input_password__fieldWrap--disabled",
    fieldHasError && "input_password__fieldWrap--error",
    fieldHasSuccess && "input_password__fieldWrap--success",
    resolvedHints.isActive &&
      resolvedHints.type === "error" &&
      "input_password__fieldWrap--error",
    resolvedHints.isActive &&
      resolvedHints.type === "success" &&
      "input_password__fieldWrap--success",
  ]
    .filter(Boolean)
    .join(" ");

  const inlineRowClass = [
    "input_password__inlineRow",
    `input_password__inlineRow--label${inlinePosition}`,
  ].join(" ");

  const describedByIds = [
    showStrength && hasValue ? strengthId : null,
    resolvedHints.isActive ? hintId : null,
    showRequirements && hasValue ? `${fieldId}-requirements` : null,
  ]
    .filter(Boolean)
    .join(" ");

  const labelElement = isLabelActive ? (
    <Input_label
      baseStyle
      {...sharedSize}
      {...labelProps}
      htmlFor={labelProps.htmlFor ?? fieldId}
      required={required ?? labelProps.required}
      position={labelPosition}
      inlinePosition={inlinePosition}
      textPosition={labelProps.textPosition ?? "left"}
    />
  ) : null;

  const fieldRow = (
    <div className={fieldWrapClass}>
      <Input_icon baseStyle {...sharedSize} {...resolvedLeftIcon} />

      <GenericInput
        ref={inputRef}
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        baseStyle
        id={fieldId}
        name={name}
        className="input_password__input"
        disabled={disabled}
        required={required}
        value={value}
        placeholder={placeholder}
        aria-invalid={fieldHasError ? true : undefined}
        aria-describedby={describedByIds || undefined}
        onChange={onChange}
        onInput={onInput}
        {...inputProps}
      />

      <Input_icon baseStyle {...sharedSize} {...resolvedRightIcon} />
    </div>
  );

  const strengthElement =
    showStrength && hasValue ? (
      <Input_pswStrenght
        id={strengthId}
        baseStyle
        {...sharedSize}
        {...strengthProps}
        password={value}
      />
    ) : null;

  const requirementsElement =
    showRequirements && autoValidate && hasValue ? (
      <div
        id={`${fieldId}-requirements`}
        className="input_password__requirementsWrap">
        <PasswordRequirementsList password={value} />
      </div>
    ) : null;

  const hintsElement = (
    <Input_hints
      baseStyle
      id={hintId}
      {...sharedSize}
      {...resolvedHints}
      textPosition={resolvedHints.textPosition ?? "left"}
    />
  );

  const fieldContent = isInlineLabel ? (
    <div className={inlineRowClass}>
      {inlinePosition === "before" ? labelElement : null}
      {fieldRow}
      {inlinePosition === "after" ? labelElement : null}
    </div>
  ) : (
    <>
      {labelPosition === "top" ? labelElement : null}
      {fieldRow}
      {labelPosition === "bottom" ? labelElement : null}
    </>
  );

  return (
    <div className="input_password__fieldBlock">
      {fieldContent}
      {strengthElement}
      {requirementsElement}
      {hintsElement}
    </div>
  );
};

PasswordFieldBlock.propTypes = {
  fieldId: PropTypes.string.isRequired,
  strengthId: PropTypes.string,
  labelProps: PropTypes.object,
  hintsProps: PropTypes.object,
  leftIconProps: PropTypes.object,
  defaultLeftIcon: PropTypes.object,
  rightIconProps: PropTypes.object,
  sizeType: PropTypes.oneOf(INPUT_SIZE_TYPES),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  autoValidate: PropTypes.bool,
  showStrength: PropTypes.bool,
  strengthProps: PropTypes.object,
  showRequirements: PropTypes.bool,
  showVisibleToggle: PropTypes.bool,
  visible: PropTypes.bool,
  onVisibleChange: PropTypes.func,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  inputProps: PropTypes.object,
};

const Input_password = forwardRef(function Input_password(
  {
    kind = "AuthLogIn",
    kindOf = "password",

    labelProps = {},
    confirmLabelProps = {},
    currentLabelProps = {},

    hintsProps = {},
    confirmHintsProps = {},
    currentHintsProps = {},

    leftIconProps = {},
    confirmLeftIconProps = {},
    currentLeftIconProps = {},
    rightIconProps = {},
    confirmRightIconProps = {},
    currentRightIconProps = {},

    strengthProps = {},

    autoValidate = true,
    showStrength = true,

    className,
    baseStyle = true,
    sizeType = "md",

    disabled = false,
    required = false,

    value = "",
    onChange,
    onInput,

    confirmValue = "",
    onConfirmChange,
    onConfirmInput,

    currentValue = "",
    onCurrentChange,
    onCurrentInput,

    showPassword,
    onShowPasswordChange,
    showConfirm,
    onShowConfirmChange,
    showCurrent,
    onShowCurrentChange,

    name,
    confirmName,
    currentName,

    placeholder,
    confirmPlaceholder,
    currentPlaceholder,
  },
  ref,
) {
  const autoId = useId();
  const passwordId = `${autoId}-password`;
  const confirmId = `${autoId}-confirm`;
  const currentId = `${autoId}-current`;
  const strengthId = `${autoId}-strength`;

  const resolvedConfirmHints = useMemo(() => {
    if (confirmHintsProps.isActive) return confirmHintsProps;
    if (!autoValidate) return { isActive: false };

    const status = getConfirmMatchStatus(value, confirmValue);

    if (status === "empty") {
      return {
        isActive: true,
        type: "hint",
        message: DEFAULT_CONFIRM_HINT,
      };
    }

    if (status === "match") {
      return {
        isActive: true,
        type: "success",
        message: "Passwords match.",
      };
    }

    return {
      isActive: true,
      type: "error",
      message: "Passwords do not match.",
    };
  }, [confirmHintsProps, autoValidate, value, confirmValue]);

  const confirmHasError =
    autoValidate &&
    String(confirmValue ?? "").length > 0 &&
    getConfirmMatchStatus(value, confirmValue) === "mismatch";

  const rootClass = [
    baseStyle && "input_password",
    baseStyle && `input_password--${sizeType}`,
    baseStyle && `input_password--${kind}`,
    kind === "AuthLogIn" &&
      baseStyle &&
      `input_password--kindOf-${kindOf}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const sharedFieldProps = {
    sizeType,
    disabled,
    required,
    autoValidate,
    strengthProps,
  };

  const authLogInLeftIcon =
    kindOf === "authKey"
      ? PASSWORD_FIELD_ICON_ROLES.authKey
      : PASSWORD_FIELD_ICON_ROLES.lock;

  if (kind === "AuthLogIn") {
    return (
      <div className={rootClass}>
        <PasswordFieldBlock
          fieldId={passwordId}
          inputRef={ref}
          {...sharedFieldProps}
          defaultLeftIcon={authLogInLeftIcon}
          leftIconProps={leftIconProps}
          labelProps={labelProps}
          hintsProps={hintsProps}
          rightIconProps={rightIconProps}
          value={value}
          onChange={onChange}
          onInput={onInput}
          name={name}
          placeholder={placeholder}
          autoComplete={
            kindOf === "authKey" ? "one-time-code" : "current-password"
          }
          visible={showPassword}
          onVisibleChange={onShowPasswordChange}
        />
      </div>
    );
  }

  if (kind === "createNew") {
    return (
      <div className={rootClass}>
        <PasswordFieldBlock
          fieldId={passwordId}
          strengthId={strengthId}
          inputRef={ref}
          {...sharedFieldProps}
          defaultLeftIcon={PASSWORD_FIELD_ICON_ROLES.new}
          leftIconProps={leftIconProps}
          labelProps={labelProps}
          hintsProps={hintsProps}
          rightIconProps={rightIconProps}
          value={value}
          onChange={onChange}
          onInput={onInput}
          name={name}
          placeholder={placeholder}
          autoComplete="new-password"
          showStrength={showStrength}
          showRequirements
          visible={showPassword}
          onVisibleChange={onShowPasswordChange}
        />

        <PasswordFieldBlock
          fieldId={confirmId}
          {...sharedFieldProps}
          defaultLeftIcon={PASSWORD_FIELD_ICON_ROLES.confirm}
          leftIconProps={confirmLeftIconProps}
          labelProps={confirmLabelProps}
          hintsProps={resolvedConfirmHints}
          rightIconProps={confirmRightIconProps}
          value={confirmValue}
          onChange={onConfirmChange}
          onInput={onConfirmInput}
          name={confirmName}
          placeholder={confirmPlaceholder}
          autoComplete="new-password"
          visible={showConfirm}
          onVisibleChange={onShowConfirmChange}
          inputProps={{
            "aria-invalid": confirmHasError ? true : undefined,
          }}
        />
      </div>
    );
  }

  return (
    <div className={rootClass}>
      <PasswordFieldBlock
        fieldId={currentId}
        {...sharedFieldProps}
        defaultLeftIcon={PASSWORD_FIELD_ICON_ROLES.lock}
        leftIconProps={currentLeftIconProps}
        labelProps={currentLabelProps}
        hintsProps={currentHintsProps}
        rightIconProps={currentRightIconProps}
        value={currentValue}
        onChange={onCurrentChange}
        onInput={onCurrentInput}
        name={currentName}
        placeholder={currentPlaceholder}
        autoComplete="current-password"
        visible={showCurrent}
        onVisibleChange={onShowCurrentChange}
      />

      <PasswordFieldBlock
        fieldId={passwordId}
        strengthId={strengthId}
        inputRef={ref}
        {...sharedFieldProps}
        defaultLeftIcon={PASSWORD_FIELD_ICON_ROLES.new}
        leftIconProps={leftIconProps}
        labelProps={labelProps}
        hintsProps={hintsProps}
        rightIconProps={rightIconProps}
        value={value}
        onChange={onChange}
        onInput={onInput}
        name={name}
        placeholder={placeholder}
        autoComplete="new-password"
        showStrength={showStrength}
        showRequirements
        visible={showPassword}
        onVisibleChange={onShowPasswordChange}
      />

      <PasswordFieldBlock
        fieldId={confirmId}
        {...sharedFieldProps}
        defaultLeftIcon={PASSWORD_FIELD_ICON_ROLES.confirm}
        leftIconProps={confirmLeftIconProps}
        labelProps={confirmLabelProps}
        hintsProps={resolvedConfirmHints}
        rightIconProps={confirmRightIconProps}
        value={confirmValue}
        onChange={onConfirmChange}
        onInput={onConfirmInput}
        name={confirmName}
        placeholder={confirmPlaceholder}
        autoComplete="new-password"
        visible={showConfirm}
        onVisibleChange={onShowConfirmChange}
        inputProps={{
          "aria-invalid": confirmHasError ? true : undefined,
        }}
      />
    </div>
  );
});

Input_password.propTypes = {
  kind: PropTypes.oneOf(PASSWORD_KINDS),
  kindOf: PropTypes.oneOf(AUTH_LOG_IN_KIND_OF),

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
  confirmLabelProps: PropTypes.object,
  currentLabelProps: PropTypes.object,

  hintsProps: PropTypes.shape({
    isActive: PropTypes.bool,
    type: PropTypes.oneOf(["hint", "error", "success"]),
    message: PropTypes.node,
    textPosition: PropTypes.oneOf(HINT_TEXT_POSITIONS),
    className: PropTypes.string,
  }),
  confirmHintsProps: PropTypes.object,
  currentHintsProps: PropTypes.object,

  leftIconProps: PropTypes.object,
  confirmLeftIconProps: PropTypes.object,
  currentLeftIconProps: PropTypes.object,
  rightIconProps: PropTypes.object,
  confirmRightIconProps: PropTypes.object,
  currentRightIconProps: PropTypes.object,

  strengthProps: PropTypes.object,

  autoValidate: PropTypes.bool,
  showStrength: PropTypes.bool,

  className: PropTypes.string,
  baseStyle: PropTypes.bool,
  sizeType: PropTypes.oneOf(INPUT_SIZE_TYPES),

  disabled: PropTypes.bool,
  required: PropTypes.bool,

  value: PropTypes.string,
  onChange: PropTypes.func,
  onInput: PropTypes.func,

  confirmValue: PropTypes.string,
  onConfirmChange: PropTypes.func,
  onConfirmInput: PropTypes.func,

  currentValue: PropTypes.string,
  onCurrentChange: PropTypes.func,
  onCurrentInput: PropTypes.func,

  showPassword: PropTypes.bool,
  onShowPasswordChange: PropTypes.func,
  showConfirm: PropTypes.bool,
  onShowConfirmChange: PropTypes.func,
  showCurrent: PropTypes.bool,
  onShowCurrentChange: PropTypes.func,

  name: PropTypes.string,
  confirmName: PropTypes.string,
  currentName: PropTypes.string,

  placeholder: PropTypes.string,
  confirmPlaceholder: PropTypes.string,
  currentPlaceholder: PropTypes.string,
};

Input_password.displayName = "Input_password";

export default Input_password;
