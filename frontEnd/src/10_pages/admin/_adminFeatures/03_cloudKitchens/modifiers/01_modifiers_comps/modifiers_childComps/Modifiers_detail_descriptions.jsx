import { Modifiers_detail_sectionShell } from "./_modifiers_childComps.index.js";
import "../../_styles/modifiers_detail_descriptions.css";

const CHANNELS = ["aggregators", "website", "google"];
const LANGS = ["en", "ru", "ar", "hy"];

const errorText = (t, code) => (code ? t(`validation.${code}`) : null);

const Modifiers_detail_descriptions = (props) => {
  const { modifier, draft, fieldErrors, onDraftChange, t } = props;
  const editable = draft ?? {};

  return (
    <Modifiers_detail_sectionShell
      {...props}
      rootClass="modifiersDetailDescriptions"
      title={t("sections.descriptions")}
      renderReadonly={() => (
        <div className="modifiersDetailDescriptions__readonly">
          {CHANNELS.map((channel) => (
            <div key={channel} className="modifiersDetailDescriptions__channel">
              <h4 className="modifiersDetailDescriptions__channelTitle">
                {t(`channels.${channel}`)}
              </h4>
              {LANGS.map((lang) => (
                <p key={lang}>
                  <strong>{lang.toUpperCase()}:</strong>{" "}
                  {modifier?.descriptions?.[channel]?.[lang] || t("empty.noValue")}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
      renderEditable={() => (
        <div className="modifiersDetailDescriptions__form">
          {CHANNELS.map((channel) => (
            <div key={channel} className="modifiersDetailDescriptions__channel">
              <h4 className="modifiersDetailDescriptions__channelTitle">
                {t(`channels.${channel}`)}
              </h4>
              {LANGS.map((lang) => (
                <label
                  key={lang}
                  className="modifiersDetailDescriptions__field"
                >
                  <span>{lang.toUpperCase()}</span>
                  <textarea
                    rows={2}
                    value={editable?.[channel]?.[lang] ?? ""}
                    onChange={(e) =>
                      onDraftChange(`${channel}.${lang}`, e.target.value)
                    }
                    placeholder={`${t(`channels.${channel}`)} (${lang.toUpperCase()})`}
                  />
                  {fieldErrors?.[`${channel}.${lang}`] && (
                    <small>
                      {errorText(t, fieldErrors[`${channel}.${lang}`])}
                    </small>
                  )}
                </label>
              ))}
            </div>
          ))}
        </div>
      )}
    />
  );
};

export default Modifiers_detail_descriptions;
