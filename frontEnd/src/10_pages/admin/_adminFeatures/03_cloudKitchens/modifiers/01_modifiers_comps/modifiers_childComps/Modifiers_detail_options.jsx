import { useState } from "react";
import { Modifiers_detail_sectionShell } from "./_modifiers_childComps.index.js";
import "../../_styles/modifiers_detail_options.css";

const LANGS = ["en", "ru", "ar", "hy"];
const CHANNELS = ["aggregators", "website", "google"];

const errorText = (t, code) => (code ? t(`validation.${code}`) : null);

const OptionReadCard = ({ option, t }) => {
  const nameEn = option?.name?.en || t("empty.noValue");
  const isActive = option?.isActive !== false;

  return (
    <div className="modifiersDetailOptions__readCard">
      <span className="modifiersDetailOptions__readCardName">{nameEn}</span>
      <span className="modifiersDetailOptions__readCardMeta">
        {t("fields.cost")}: {option?.cost ?? 0} | {t("fields.sellingPrice")}:{" "}
        {option?.sellingPrice ?? 0} |{" "}
        {isActive ? t("badges.active") : t("badges.inactive")}
      </span>
    </div>
  );
};

const OptionEditCard = ({
  option,
  index,
  fieldErrors,
  onOptionChange,
  onOptionRemove,
  t,
}) => {
  const [expanded, setExpanded] = useState(true);
  const nameEn = option?.name?.en || `${t("sections.options")} #${index + 1}`;

  return (
    <div className="modifiersDetailOptions__card">
      <div
        className="modifiersDetailOptions__cardHeader"
        onClick={() => setExpanded((prev) => !prev)}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
      >
        <span className="modifiersDetailOptions__cardHeaderLeft">
          {nameEn}
        </span>
        <button
          type="button"
          className="modifiersDetailOptions__removeBtn"
          onClick={(e) => {
            e.stopPropagation();
            onOptionRemove(index);
          }}
        >
          {t("actions.removeRow")}
        </button>
      </div>

      {expanded && (
        <div className="modifiersDetailOptions__cardBody">
          {LANGS.map((lang) => (
            <label key={lang} className="modifiersDetailOptions__field">
              <span>{t("fields.optionName")} ({lang.toUpperCase()})</span>
              <input
                value={option?.name?.[lang] ?? ""}
                onChange={(e) =>
                  onOptionChange(index, `name.${lang}`, e.target.value)
                }
                placeholder={`${t("fields.optionName")} (${lang.toUpperCase()})`}
              />
              {fieldErrors?.[`[${index}].name.${lang}`] && (
                <small>
                  {errorText(t, fieldErrors[`[${index}].name.${lang}`])}
                </small>
              )}
            </label>
          ))}

          {CHANNELS.map((channel) => (
            <div key={channel}>
              <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                {t(`channels.${channel}`)}
              </span>
              {LANGS.map((lang) => (
                <label
                  key={lang}
                  className="modifiersDetailOptions__field"
                >
                  <span>{lang.toUpperCase()}</span>
                  <textarea
                    rows={2}
                    value={option?.descriptions?.[channel]?.[lang] ?? ""}
                    onChange={(e) =>
                      onOptionChange(
                        index,
                        `descriptions.${channel}.${lang}`,
                        e.target.value,
                      )
                    }
                  />
                  {fieldErrors?.[
                    `[${index}].descriptions.${channel}.${lang}`
                  ] && (
                    <small>
                      {errorText(
                        t,
                        fieldErrors[
                          `[${index}].descriptions.${channel}.${lang}`
                        ],
                      )}
                    </small>
                  )}
                </label>
              ))}
            </div>
          ))}

          <div className="modifiersDetailOptions__row">
            <label className="modifiersDetailOptions__field">
              <span>{t("fields.cost")}</span>
              <input
                type="number"
                min="0"
                value={option?.cost ?? 0}
                onChange={(e) =>
                  onOptionChange(index, "cost", Number(e.target.value))
                }
              />
              {fieldErrors?.[`[${index}].cost`] && (
                <small>{errorText(t, fieldErrors[`[${index}].cost`])}</small>
              )}
            </label>
            <label className="modifiersDetailOptions__field">
              <span>{t("fields.sellingPrice")}</span>
              <input
                type="number"
                min="0"
                value={option?.sellingPrice ?? 0}
                onChange={(e) =>
                  onOptionChange(index, "sellingPrice", Number(e.target.value))
                }
              />
              {fieldErrors?.[`[${index}].sellingPrice`] && (
                <small>
                  {errorText(t, fieldErrors[`[${index}].sellingPrice`])}
                </small>
              )}
            </label>
          </div>

          <label className="modifiersDetailOptions__toggle">
            <input
              type="checkbox"
              checked={option?.isActive !== false}
              onChange={(e) =>
                onOptionChange(index, "isActive", e.target.checked)
              }
            />
            <span>{t("fields.isActive")}</span>
          </label>
        </div>
      )}
    </div>
  );
};

const Modifiers_detail_options = (props) => {
  const {
    modifier,
    draft,
    fieldErrors,
    onOptionAdd,
    onOptionRemove,
    onOptionChange,
    t,
  } = props;
  const options = Array.isArray(draft) ? draft : [];
  const readOptions = Array.isArray(modifier?.options) ? modifier.options : [];

  return (
    <Modifiers_detail_sectionShell
      {...props}
      rootClass="modifiersDetailOptions"
      title={t("sections.options")}
      renderReadonly={() => (
        <div className="modifiersDetailOptions__readonly">
          {readOptions.length === 0 && (
            <p>{t("empty.noOptions")}</p>
          )}
          {readOptions.map((opt, index) => (
            <OptionReadCard key={opt._id || index} option={opt} t={t} />
          ))}
        </div>
      )}
      renderEditable={() => (
        <div className="modifiersDetailOptions__form">
          {options.map((opt, index) => (
            <OptionEditCard
              key={opt._id || index}
              option={opt}
              index={index}
              fieldErrors={fieldErrors}
              onOptionChange={onOptionChange}
              onOptionRemove={onOptionRemove}
              t={t}
            />
          ))}
          <button
            type="button"
            className="modifiersDetailOptions__addBtn"
            onClick={onOptionAdd}
          >
            + {t("actions.addRow")}
          </button>
        </div>
      )}
    />
  );
};

export default Modifiers_detail_options;
