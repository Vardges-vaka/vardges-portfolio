import { EmailIcon, GlobeIcon } from "../Brands_icons/_brands_icons.index.js";
import { Brands_detail_sectionShell } from "./_brands_childComps.index.js";
import Brands_detail_website_nameServers from "./Brands_detail_website_nameServers.jsx";
import Brands_detail_website_dns from "./Brands_detail_website_dns.jsx";
import Brands_detail_website_renewal from "./Brands_detail_website_renewal.jsx";
import {
  EMPTY_EMAIL_ROW,
  hydrateBrandForm,
} from "../../02_brands_helpers/_brands_helpers.index.js";
import "../../_styles/brands_detail_emails.css";
import "../../_styles/brands_detail_socials.css";
import "../../_styles/brands_detail_website_sub.css";

const FIELDS = [
  "link",
  "domain",
  "registrar",
  "consoleLink",
  "status",
  "dnsStatus",
  "whois",
];

const Brands_detail_website = (props) => {
  const { brand, draft, fieldErrors, onDraftChange, onDraftReplace, t } = props;
  const source = draft ?? hydrateBrandForm(brand).website;
  const emails = Array.isArray(source?.emails) ? source.emails : [];

  const setEmails = (nextEmails) => onDraftChange("emails", nextEmails);

  return (
    <Brands_detail_sectionShell
      {...props}
      rootClass="brandsDetailWebsite"
      title={t("sections.website")}
      icon={<GlobeIcon />}
      renderReadonly={() => {
        const website = hydrateBrandForm(brand).website;
        return (
          <div className="brandsDetailSocials_rows">
            {FIELDS.filter((field) => website?.[field]).map((field) => (
              <p key={field}>
                <strong>{t(`fields.${field}`)}:</strong> {website[field]}
              </p>
            ))}
            {(website.emails ?? []).map((row, index) => (
              <p key={`${row.email}-${index}`}>
                <EmailIcon size={14} /> {row.email || t("empty.noValue")}
              </p>
            ))}
            {!FIELDS.some((field) => website?.[field]) &&
              website.emails.length === 0 && (
                <p className="brandsDetailSocials_empty">
                  {t("empty.noValue")}
                </p>
              )}
          </div>
        );
      }}
      renderEditable={() => (
        <div className="brandsDetailSocials_form">
          <label className="brandsDetailBasic_toggle">
            <input
              type="checkbox"
              checked={source?.isActive !== false}
              onChange={(event) =>
                onDraftChange("isActive", event.target.checked)
              }
            />
            <span>{t("fields.isActive")}</span>
          </label>

          {FIELDS.map((field) => (
            <label className="brandsDetailSocials_field" key={field}>
              <span>{t(`fields.${field}`)}</span>
              <input
                value={source?.[field] ?? ""}
                onChange={(event) => onDraftChange(field, event.target.value)}
              />
            </label>
          ))}

          <label className="brandsDetailSocials_field">
            <span>{t("fields.expiresOn")}</span>
            <input
              type="date"
              value={source?.expiresOn ?? ""}
              onChange={(event) =>
                onDraftChange("expiresOn", event.target.value)
              }
            />
          </label>

          <label className="brandsDetailSocials_field">
            <span>{t("fields.lastRenewedOn")}</span>
            <input
              type="date"
              value={source?.lastRenewedOn ?? ""}
              onChange={(event) =>
                onDraftChange("lastRenewedOn", event.target.value)
              }
            />
          </label>

          <label className="brandsDetailBasic_toggle">
            <input
              type="checkbox"
              checked={!!source?.autoRenew}
              onChange={(event) =>
                onDraftChange("autoRenew", event.target.checked)
              }
            />
            <span>{t("fields.autoRenew")}</span>
          </label>

          <label className="brandsDetailSocials_field">
            <span>{t("fields.notes")}</span>
            <textarea
              value={source?.notes ?? ""}
              onChange={(event) => onDraftChange("notes", event.target.value)}
              rows={3}
            />
          </label>

          <Brands_detail_website_nameServers
            draft={source}
            fieldErrors={fieldErrors}
            onDraftChange={onDraftChange}
            t={t}
          />

          <Brands_detail_website_dns
            draft={source}
            fieldErrors={fieldErrors}
            onDraftChange={onDraftChange}
            t={t}
          />

          <Brands_detail_website_renewal
            draft={source}
            fieldErrors={fieldErrors}
            onDraftChange={onDraftChange}
            t={t}
          />

          <div className="brandsDetailEmails_form">
            <h4>{t("sections.emails")}</h4>
            {emails.map((row, index) => (
              <div className="brandsDetailEmails_editRow" key={index}>
                {["name", "position", "email"].map((field) => (
                  <label key={field}>
                    <span>
                      {t(
                        `fields.${
                          field === "name"
                            ? "emailName"
                            : field === "position"
                              ? "emailPosition"
                              : field
                        }`,
                      )}
                    </span>
                    <input
                      value={row?.[field] ?? ""}
                      onChange={(event) => {
                        const next = emails.slice();
                        next[index] = { ...row, [field]: event.target.value };
                        setEmails(next);
                      }}
                    />
                  </label>
                ))}
                <button
                  type="button"
                  className="brandsDetailEmails_removeBtn"
                  onClick={() =>
                    setEmails(
                      emails.filter((_, itemIndex) => itemIndex !== index),
                    )
                  }>
                  {t("actions.removeRow")}
                </button>
              </div>
            ))}
            <button
              type="button"
              className="brandsDetailEmails_addBtn"
              onClick={() =>
                onDraftReplace({
                  ...source,
                  emails: [...emails, { ...EMPTY_EMAIL_ROW }],
                })
              }>
              + {t("actions.addRow")}
            </button>
          </div>
        </div>
      )}
    />
  );
};

export default Brands_detail_website;
