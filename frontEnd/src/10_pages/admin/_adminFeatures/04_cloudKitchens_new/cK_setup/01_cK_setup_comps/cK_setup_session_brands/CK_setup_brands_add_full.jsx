import { PRICE_RANGE_OPTIONS } from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import "../../_styles/cK_setup_forms/cK_setup_addForm.css";
import {
  CK_setup_brand_fields_basic,
  CK_setup_brand_fields_socials,
} from "./ck_setup_brand_fields/_ck_setup_brand_fields.index.js";

const SOCIAL_NAME_OPTIONS = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "tikTok", label: "TikTok" },
  { value: "linkedIn", label: "LinkedIn" },
  { value: "youtube", label: "YouTube" },
  { value: "twitter", label: "Twitter / X" },
  { value: "other", label: "Other" },
];

// date -> yyyy-mm-dd for <input type="date">
const dateInput = (v) => {
  if (!v) return "";
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
};

const CK_setup_brands_add_full = ({ states, handlers, t }) => {
  const v = states.values ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);
  const setBool = (name) => (e) => handlers.onChange?.(name, e.target.checked);

  const tagline = v.tagline ?? {};
  const reg = v.registeredIn ?? {};
  const socials = v.socials ?? [];

  return (
    <div className="cK_setup_form">
      <CK_setup_brand_fields_basic states={states} handlers={handlers} t={t} />

      {/* Price Range */}
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Price range</span>
        <select
          className="cK_setup_form_input"
          value={v.priceRange ?? ""}
          onChange={set("priceRange")}>
          <option value="">— select —</option>
          {PRICE_RANGE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      {/* ── Registered in ──────────────────────────────── */}
      <section className="cK_setup_form_section">
        <h4 className="cK_setup_form_sectionTitle">Registered in</h4>
        <div className="cK_setup_form_row">
          <label className="cK_setup_form_field">
            <span className="cK_setup_form_label">Country</span>
            <input
              className="cK_setup_form_input"
              type="text"
              value={reg.country ?? ""}
              onChange={set("registeredIn.country")}
            />
          </label>
          <label className="cK_setup_form_field">
            <span className="cK_setup_form_label">City</span>
            <input
              className="cK_setup_form_input"
              type="text"
              value={reg.city ?? ""}
              onChange={set("registeredIn.city")}
            />
          </label>
          <label className="cK_setup_form_field">
            <span className="cK_setup_form_label">Emirate</span>
            <input
              className="cK_setup_form_input"
              type="text"
              value={reg.emirate ?? ""}
              onChange={set("registeredIn.emirate")}
            />
          </label>
        </div>
        <label className="cK_setup_form_field">
          <span className="cK_setup_form_label">Date of registration</span>
          <input
            className="cK_setup_form_input"
            type="date"
            value={dateInput(reg.dateOfRegistration)}
            onChange={set("registeredIn.dateOfRegistration")}
          />
        </label>
        <div className="cK_setup_form_checks">
          <label className="cK_setup_form_check">
            <input
              type="checkbox"
              checked={!!reg.hasTradeLicense}
              onChange={setBool("registeredIn.hasTradeLicense")}
            />
            Trade licence
          </label>
          <label className="cK_setup_form_check">
            <input
              type="checkbox"
              checked={!!reg.hasVATCertificate}
              onChange={setBool("registeredIn.hasVATCertificate")}
            />
            VAT certificate
          </label>
          <label className="cK_setup_form_check">
            <input
              type="checkbox"
              checked={!!reg.hasTradeMark}
              onChange={setBool("registeredIn.hasTradeMark")}
            />
            Trademark
          </label>
        </div>
      </section>

      <CK_setup_brand_fields_socials
        states={states}
        handlers={handlers}
        t={t}
      />
    </div>
  );
};

export default CK_setup_brands_add_full;
