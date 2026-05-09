import { FileIcon } from "../Brands_icons/_brands_icons.index.js";
import { Brands_detail_sectionShell } from "./_brands_childComps.index.js";
import { hydrateBrandForm } from "../../02_brands_helpers/_brands_helpers.index.js";
import "../../_styles/brands_detail_basic.css";

const TEXT_FIELDS = ["country", "city", "emirate", "dateOfRegistration"];
const BOOL_FIELDS = ["hasTradeLicense", "hasVATCertificate", "hasTradeMark"];

const Brands_detail_legal = (props) => {
  const { brand, draft, onDraftChange, t } = props;
  const source = draft ?? hydrateBrandForm(brand).legal;
  const registeredIn = source?.registeredIn ?? {};

  return (
    <Brands_detail_sectionShell
      {...props}
      rootClass="brandsDetailLegal"
      title={t("sections.legal")}
      icon={<FileIcon />}
      renderReadonly={() => (
        <div className="brandsDetailBasic_readonly">
          {TEXT_FIELDS.map((field) => (
            <p key={field}>
              <strong>{t(`fields.${field}`)}:</strong>{" "}
              {registeredIn[field] || t("empty.noValue")}
            </p>
          ))}
          {BOOL_FIELDS.map((field) => (
            <p key={field}>
              <strong>{t(`fields.${field}`)}:</strong>{" "}
              {registeredIn[field] ? t("badges.yes") : t("badges.no")}
            </p>
          ))}
        </div>
      )}
      renderEditable={() => (
        <div className="brandsDetailBasic_form">
          {TEXT_FIELDS.map((field) => (
            <label className="brandsDetailBasic_field" key={field}>
              <span>{t(`fields.${field}`)}</span>
              <input
                type={field === "dateOfRegistration" ? "date" : "text"}
                value={registeredIn[field] ?? ""}
                onChange={(event) =>
                  onDraftChange(`registeredIn.${field}`, event.target.value)
                }
              />
            </label>
          ))}
          {BOOL_FIELDS.map((field) => (
            <label className="brandsDetailBasic_toggle" key={field}>
              <input
                type="checkbox"
                checked={!!registeredIn[field]}
                onChange={(event) =>
                  onDraftChange(`registeredIn.${field}`, event.target.checked)
                }
              />
              <span>{t(`fields.${field}`)}</span>
            </label>
          ))}
        </div>
      )}
    />
  );
};

export default Brands_detail_legal;
