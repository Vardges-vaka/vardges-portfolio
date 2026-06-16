import Input_url from "../../inputs/Input_url.jsx";
import Input_textArea from "../../inputs/Input_textArea.jsx";
import "../../_styles/cards/card_social_disabled.css";

const READONLY_INPUT_PROPS = {
  labelProps: { isActive: false },
  hintsProps: { isActive: false },
  sizeType: "sm",
  autoValidate: true,
  readOnly: true,
  readOnlyMaxChars: 10,
};

const Card_social_disabled = ({
  label = "Social",
  link = "",
  notes = "",
  consoleLink = "",
  backgroundImage = "",
  badge = "Inactive",
  enableText = "Activate",
  onActiveChange,
  className = "",
}) => {
  const rootClass = ["card_social_disabled", className]
    .filter(Boolean)
    .join(" ");

  const backStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : undefined;

  const handleEnable = (event) => {
    event.stopPropagation();
    onActiveChange?.(true);
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <div className={rootClass}>
      <div
        className="card_social_disabled__card"
        tabIndex={0}
        aria-label={`${label} — inactive`}>
        <div
          className="card_social_disabled__frontBg"
          style={backStyle}
          aria-hidden="true"
        />

        <div className="card_social_disabled__frontContent">
          {badge ? (
            <small className="card_social_disabled__badge">{badge}</small>
          ) : null}
          <img
            src={backgroundImage}
            alt={label}
            className="card_social_disabled__iconn"
          />
          <strong className="card_social_disabled__name">{label}</strong>
          <div className="card_social_disabled__form">
            <Input_url
              {...READONLY_INPUT_PROPS}
              placeholder="Link — https://…"
              value={link}
            />
            <Input_url
              {...READONLY_INPUT_PROPS}
              value={notes}
              placeholder="Notes"
            />
            <Input_textArea
              {...READONLY_INPUT_PROPS}
              maxLength={Math.max(consoleLink.length + 100, 100)}
              rows={2}
              lengthProps={{ isActive: false }}
              placeholder="Enter your Brand's description in few words"
              value={consoleLink}
            />
          </div>
        </div>

        <div className="card_social_disabled__overlay">
          <span
            className="card_social_disabled__shutter card_social_disabled__shutter--topRight"
            aria-hidden="true"
          />
          <span
            className="card_social_disabled__shutter card_social_disabled__shutter--bottomLeft"
            aria-hidden="true"
          />
          <div className="card_social_disabled__overlayAction">
            {backgroundImage ? (
              <img
                src={backgroundImage}
                alt=""
                aria-hidden="true"
                className="card_social_disabled__overlayIcon"
              />
            ) : null}
            <button
              type="button"
              className="card_social_disabled__enableBtn"
              onClick={handleEnable}
              onMouseDown={stopPropagation}>
              {enableText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card_social_disabled;
