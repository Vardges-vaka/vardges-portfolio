import Input_url from "../../inputs/Input_url.jsx";
import Input_textArea from "../../inputs/Input_textArea.jsx";
import "../../_styles/cards/card_social_active.css";

const URL_INPUT_PROPS = {
  labelProps: { isActive: false },
  hintsProps: { isActive: false },
  sizeType: "sm",
  readOnly: false,
  readOnlyMaxChars: 10,
};

const Card_social_active = ({
  label = "Social",
  link = "",
  notes = "",
  consoleLink = "",
  onFieldChange,
  isActive = true,
  onActiveChange,
  badge = "Active",
  backgroundImage = "",
  className = "",
}) => {
  const rootClass = ["card_social_active", className].filter(Boolean).join(" ");

  const backStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : undefined;

  const handleFieldChange = (field) => (event) => {
    event.stopPropagation();
    onFieldChange?.(field, event.target.value);
  };

  const handleToggleChange = (event) => {
    event.stopPropagation();
    onActiveChange?.(event.target.checked);
  };

  const stopToggleClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className={rootClass}>
      <div
        className="card_social_active__card"
        tabIndex={0}
        aria-label={label ? `${label} social account` : "Social account"}>
        <label
          className="card_social_active__toggle"
          title={isActive ? "Disable social" : "Enable social"}
          onClick={stopToggleClick}
          onMouseDown={stopToggleClick}>
          <input
            type="checkbox"
            className="card_social_active__toggleInput"
            checked={isActive}
            onChange={handleToggleChange}
            aria-label={`${label} active toggle`}
          />
          <span className="card_social_active__toggleTrack" aria-hidden="true">
            <span className="card_social_active__toggleThumb" />
          </span>
        </label>

        <div className="card_social_active__content">
          <div className="card_social_active__back">
            <div className="card_social_active__backContent">
              {backgroundImage ? (
                <img
                  className="card_social_active__backBrand"
                  src={backgroundImage}
                  alt=""
                  aria-hidden="true"
                />
              ) : null}
              {/* <strong className="card_social_active__name">{label}</strong> */}
            </div>
          </div>

          <div className="card_social_active__front">
            <div
              className="card_social_active__frontBg"
              style={backStyle}
              aria-hidden="true"
            />

            <div className="card_social_active__frontContent">
              {badge ? (
                <small className="card_social_active__badge">{badge}</small>
              ) : null}
              <strong className="card_social_active__name">{label}</strong>
              <div className="card_social_active__form">
                <Input_url
                  {...URL_INPUT_PROPS}
                  placeholder="Link — https://…"
                  value={link}
                  onChange={handleFieldChange("link")}
                  autoValidate={true}
                />
                <Input_url
                  {...URL_INPUT_PROPS}
                  value={notes}
                  placeholder="Notes"
                  onChange={handleFieldChange("notes")}
                  autoValidate={true}
                />
                <Input_textArea
                  labelProps={{ isActive: false }}
                  hintsProps={{ isActive: false }}
                  sizeType="sm"
                  readOnly={false}
                  maxLength={consoleLink.length + 100}
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
      </div>
    </div>
  );
};

export default Card_social_active;
