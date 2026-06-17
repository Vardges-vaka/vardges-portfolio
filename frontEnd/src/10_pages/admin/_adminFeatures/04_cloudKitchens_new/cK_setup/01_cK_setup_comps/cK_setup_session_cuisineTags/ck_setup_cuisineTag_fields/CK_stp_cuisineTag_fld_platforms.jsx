import { AGGREGATOR_PLATFORMS } from "../../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import "../../../_styles/cK_setup_session_cuisineTags/ck_setup_cuisineTag_fields/cK_stp_cuisineTag_fld_platforms.css";

const CK_stp_cuisineTag_fld_platforms = ({ states, handlers, t }) => {
  const v = states.values ?? {};
  const selected = Array.isArray(v.platforms) ? v.platforms : [];

  const togglePlatform = (platformValue) => {
    const next = selected.includes(platformValue)
      ? selected.filter((p) => p !== platformValue)
      : [...selected, platformValue];
    handlers.onChange?.("platforms", next);
  };

  return (
    <section className="cK_stp_cuisineTag_fld_platforms">
      <h4 className="cK_setup_form_sectionTitle">Platforms</h4>
      <p className="cK_stp_cuisineTag_fld_platforms_hint">
        Select which delivery platforms use this tag.
      </p>

      <ul className="cK_stp_cuisineTag_fld_platforms_grid">
        {AGGREGATOR_PLATFORMS.map((platform) => {
          const isChecked = selected.includes(platform.value);
          return (
            <li key={platform.value}>
              <label className="cK_stp_cuisineTag_fld_platforms_chip">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => togglePlatform(platform.value)}
                />
                {platform.logo ? (
                  <img
                    className="cK_stp_cuisineTag_fld_platforms_logo"
                    src={platform.logo}
                    alt=""
                    aria-hidden="true"
                  />
                ) : null}
                <span>{platform.label}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default CK_stp_cuisineTag_fld_platforms;
