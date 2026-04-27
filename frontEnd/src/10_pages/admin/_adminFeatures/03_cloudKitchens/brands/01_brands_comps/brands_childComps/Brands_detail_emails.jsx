import { EmailIcon } from "../Brands_icons/_brands_icons.index.js";
import { Brands_detail_sectionShell } from "./_brands_childComps.index.js";
import "../../_styles/brands_detail_emails.css";

const errorText = (t, code) => (code ? t(`validation.${code}`) : null);

const Brands_detail_emails = (props) => {
  const {
    brand,
    draft,
    fieldErrors,
    onEmailAdd,
    onEmailRemove,
    onEmailChange,
    t,
  } = props;
  const rows = Array.isArray(draft) ? draft : [];
  const readRows = Array.isArray(brand?.emails) ? brand.emails : [];

  return (
    <Brands_detail_sectionShell
      {...props}
      rootClass="brandsDetailEmails"
      title={t("sections.emails")}
      icon={<EmailIcon />}
      renderReadonly={() => (
        <div className="brandsDetailEmails__rows">
          {readRows.length === 0 && (
            <p className="brandsDetailEmails__empty">{t("empty.noEmails")}</p>
          )}
          {readRows.map((row, index) => (
            <div className="brandsDetailEmails__row" key={`${row.email}-${index}`}>
              <div>
                <strong>{row.name || t("empty.noValue")}</strong>
                <span>{row.position || t("empty.noValue")}</span>
                <small>{row.email || t("empty.noValue")}</small>
              </div>
              {row.email && (
                <a className="brandsDetailEmails__launcher" href={`mailto:${row.email}`}>
                  {t("emailActions.email")}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
      renderEditable={() => (
        <div className="brandsDetailEmails__form">
          {rows.map((row, index) => (
            <div className="brandsDetailEmails__editRow" key={index}>
              <label>
                <span>{t("fields.emailName")}</span>
                <input
                  value={row.name ?? ""}
                  onChange={(event) => onEmailChange(index, "name", event.target.value)}
                />
                {fieldErrors?.[`[${index}].name`] && (
                  <small>{errorText(t, fieldErrors[`[${index}].name`])}</small>
                )}
              </label>
              <label>
                <span>{t("fields.emailPosition")}</span>
                <input
                  value={row.position ?? ""}
                  onChange={(event) => onEmailChange(index, "position", event.target.value)}
                />
                {fieldErrors?.[`[${index}].position`] && (
                  <small>{errorText(t, fieldErrors[`[${index}].position`])}</small>
                )}
              </label>
              <label>
                <span>{t("fields.email")}</span>
                <input
                  value={row.email ?? ""}
                  onChange={(event) => onEmailChange(index, "email", event.target.value)}
                />
                {fieldErrors?.[`[${index}].email`] && (
                  <small>{errorText(t, fieldErrors[`[${index}].email`])}</small>
                )}
              </label>
              <button
                type="button"
                className="brandsDetailEmails__removeBtn"
                onClick={() => onEmailRemove(index)}
              >
                {t("actions.removeRow")}
              </button>
            </div>
          ))}
          <button
            type="button"
            className="brandsDetailEmails__addBtn"
            onClick={onEmailAdd}
          >
            + {t("actions.addRow")}
          </button>
        </div>
      )}
    />
  );
};

export default Brands_detail_emails;
