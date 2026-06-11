import { Input_text } from "../../../../../../../../01_components/_components.index.js";
import { TAGLINE_INFO } from "../../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import {
  RussianFlag,
  BritishFlag,
  ArabicFlag,
} from "../../../../../../../../00_assets/_assets.index.js";
const SOCIAL_NAME_OPTIONS = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "tikTok", label: "TikTok" },
  { value: "linkedIn", label: "LinkedIn" },
  { value: "youtube", label: "YouTube" },
  { value: "twitter", label: "Twitter / X" },
  { value: "other", label: "Other" },
];
const CK_setup_brand_fields_socials = ({ states, handlers, t }) => {
  const v = states.values ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);
  const setBool = (name) => (e) => handlers.onChange?.(name, e.target.checked);
  const socials = v.socials ?? [];

  return (
    <section className="cK_setup_form_section">
      <div className="cK_setup_form_sectionHead">
        <h4 className="cK_setup_form_sectionTitle">Socials</h4>
        <button
          type="button"
          className="cK_setup_form_ghostBtn"
          onClick={handlers.onAddSocial}>
          + Add social
        </button>
      </div>

      {socials.length === 0 ? (
        <p className="cK_setup_form_hint">No social accounts yet.</p>
      ) : (
        socials.map((s, i) => (
          <div key={i} className="cK_setup_form_social">
            <div className="cK_setup_form_socialHead">
              <span className="cK_setup_form_socialIdx">#{i + 1}</span>
              <label className="cK_setup_form_check">
                <input
                  type="checkbox"
                  checked={!!s.isActive}
                  onChange={setBool(`socials.${i}.isActive`)}
                />
                Active
              </label>
              <button
                type="button"
                className="cK_setup_form_ghostBtn cK_setup_form_ghostBtn_danger"
                onClick={() => handlers.onRemoveSocial?.(i)}>
                Remove
              </button>
            </div>
            <div className="cK_setup_form_row">
              <label className="cK_setup_form_field">
                <span className="cK_setup_form_label">Platform</span>
                <select
                  className="cK_setup_form_input"
                  value={s.name ?? ""}
                  onChange={set(`socials.${i}.name`)}>
                  <option value="">— select —</option>
                  {SOCIAL_NAME_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="cK_setup_form_field">
                <span className="cK_setup_form_label">Link</span>
                <input
                  className="cK_setup_form_input"
                  type="text"
                  value={s.link ?? ""}
                  onChange={set(`socials.${i}.link`)}
                />
              </label>
            </div>
            <label className="cK_setup_form_field">
              <span className="cK_setup_form_label">Console link</span>
              <input
                className="cK_setup_form_input"
                type="text"
                value={s.consoleLink ?? ""}
                onChange={set(`socials.${i}.consoleLink`)}
              />
            </label>
            <label className="cK_setup_form_field">
              <span className="cK_setup_form_label">Notes</span>
              <input
                className="cK_setup_form_input"
                type="text"
                value={s.notes ?? ""}
                onChange={set(`socials.${i}.notes`)}
              />
            </label>
          </div>
        ))
      )}
    </section>
  );
};

export default CK_setup_brand_fields_socials;
