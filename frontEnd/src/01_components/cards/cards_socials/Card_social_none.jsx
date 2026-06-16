import { useEffect, useState } from "react";
import Input_text from "../../inputs/Input_text.jsx";
import Input_url from "../../inputs/Input_url.jsx";
import Input_textArea from "../../inputs/Input_textArea.jsx";
import "../../_styles/cards/card_social_none.css";

const INPUT_PROPS = {
  labelProps: { isActive: false },
  hintsProps: { isActive: false },
  sizeType: "sm",
};

const URL_INPUT_PROPS = {
  ...INPUT_PROPS,
  autoValidate: true,
  readOnly: false,
  readOnlyMaxChars: 10,
};

const Card_social_none = ({
  label = "Social",
  platformValue = "",
  icon = null,
  customName = "",
  link = "",
  notes = "",
  consoleLink = "",
  isAdding = false,
  showNameInput = false,
  addText = "Add",
  badge = "New",
  onAdd,
  onFieldChange,
  className = "",
}) => {
  const [adding, setAdding] = useState(isAdding);
  const rootClass = ["card_social_none", className].filter(Boolean).join(" ");

  useEffect(() => {
    setAdding(isAdding);
  }, [isAdding]);

  const backStyle = icon ? { backgroundImage: `url(${icon})` } : undefined;

  const handleFieldChange = (field) => (event) => {
    event.stopPropagation();
    onFieldChange?.(field, event.target.value);
  };

  const handleAdd = (event) => {
    event.stopPropagation();
    setAdding(true);
    onAdd?.(platformValue);
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  if (adding) {
    return (
      <div className={rootClass}>
        <div
          className="card_social_none__card card_social_none__card--adding"
          tabIndex={0}
          aria-label={`Add ${label} social account`}>
          <div
            className="card_social_none__frontBg"
            style={backStyle}
            aria-hidden="true"
          />

          <div className="card_social_none__frontContent">
            {badge ? (
              <small className="card_social_none__badge">{badge}</small>
            ) : null}

            {showNameInput ? (
              <Input_text
                {...INPUT_PROPS}
                placeholder="Platform name"
                value={customName}
                onChange={handleFieldChange("customName")}
              />
            ) : (
              <strong className="card_social_none__name">{label}</strong>
            )}

            <div className="card_social_none__form">
              <Input_url
                {...URL_INPUT_PROPS}
                placeholder="Link — https://…"
                value={link}
                onChange={handleFieldChange("link")}
              />
              <Input_url
                {...URL_INPUT_PROPS}
                value={notes}
                placeholder="Notes"
                onChange={handleFieldChange("notes")}
              />
              <Input_textArea
                {...INPUT_PROPS}
                maxLength={Math.max(consoleLink.length + 100, 100)}
                rows={2}
                lengthProps={{ isActive: true }}
                placeholder="Enter your Brand's description in few words"
                value={consoleLink}
                onChange={handleFieldChange("consoleLink")}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={rootClass}>
      <div
        className="card_social_none__card"
        tabIndex={0}
        aria-label={`${label} — not linked`}>
        <div
          className="card_social_none__frontBg card_social_none__frontBg--empty"
          style={backStyle}
          aria-hidden="true"
        />

        <div className="card_social_none__emptyContent">
          {icon ? (
            <img
              className="card_social_none__icon"
              src={icon}
              alt=""
              aria-hidden="true"
            />
          ) : (
            <span className="card_social_none__placeholderIcon">+</span>
          )}
          <span className="card_social_none__label">{label}</span>
        </div>

        <div className="card_social_none__overlay">
          <span
            className="card_social_none__shutter card_social_none__shutter--topLeft"
            aria-hidden="true"
          />
          <span
            className="card_social_none__shutter card_social_none__shutter--topRight"
            aria-hidden="true"
          />
          <span
            className="card_social_none__shutter card_social_none__shutter--bottomRight"
            aria-hidden="true"
          />
          <span
            className="card_social_none__shutter card_social_none__shutter--bottomLeft"
            aria-hidden="true"
          />
          <div className="card_social_none__overlayAction">
            {icon ? (
              <img
                src={icon}
                alt=""
                aria-hidden="true"
                className="card_social_none__overlayIcon"
              />
            ) : null}
            <button
              type="button"
              className="card_social_none__addBtn"
              onClick={handleAdd}
              onMouseDown={stopPropagation}>
              {addText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card_social_none;
