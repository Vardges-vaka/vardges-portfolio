import { MenuItems_detail_sectionShell } from "./_menuItems_childComps.index.js";
import "../../_styles/menuItems_detail_descriptions.css";

const CHANNELS = ["aggregators", "website", "google"];
const LANGS = ["en", "ru", "ar"];
const errorText = (t, code) => (code ? t(`validation.${code}`) : null);

const MenuItems_detail_descriptions = (props) => {
  const { menuItem, draft, fieldErrors, onDraftChange, t } = props;
  const editable = draft ?? {};

  return (
    <MenuItems_detail_sectionShell
      {...props}
      rootClass="menuItemsDetailDescriptions"
      title={t("sections.descriptions")}
      renderReadonly={() => (
        <div className="menuItemsDetailDescriptions__readonly">
          {CHANNELS.map((channel) => (
            <div key={channel} className="menuItemsDetailDescriptions__channel">
              <h4 className="menuItemsDetailDescriptions__channelTitle">
                {t(`channels.${channel}`)}
              </h4>
              {LANGS.map((lang) => (
                <p key={lang}>
                  <strong>{lang.toUpperCase()}:</strong>{" "}
                  {menuItem?.descriptions?.[channel]?.[lang] || t("empty.noValue")}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
      renderEditable={() => (
        <div className="menuItemsDetailDescriptions__form">
          {CHANNELS.map((channel) => (
            <div key={channel} className="menuItemsDetailDescriptions__channelEdit">
              <h4 className="menuItemsDetailDescriptions__channelTitle">
                {t(`channels.${channel}`)}
              </h4>
              {LANGS.map((lang) => (
                <label key={lang} className="menuItemsDetailDescriptions__field">
                  <span>{lang.toUpperCase()}</span>
                  <textarea
                    value={editable?.[channel]?.[lang] ?? ""}
                    onChange={(e) => onDraftChange(`${channel}.${lang}`, e.target.value)}
                    rows={3}
                  />
                  {fieldErrors?.[`${channel}.${lang}`] && (
                    <small>{errorText(t, fieldErrors[`${channel}.${lang}`])}</small>
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

export default MenuItems_detail_descriptions;
