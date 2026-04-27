import {
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  LinkedInIcon,
  GlobeIcon,
} from "../Brands_icons/_brands_icons.index.js";
import { Brands_detail_sectionShell } from "./_brands_childComps.index.js";
import "../../_styles/brands_detail_socials.css";

const SOCIALS = [
  ["instagram", (size) => <InstagramIcon size={size} />],
  ["facebook", (size) => <FacebookIcon size={size} />],
  ["tikTok", (size) => <TikTokIcon size={size} />],
  ["linkedIn", (size) => <LinkedInIcon size={size} />],
  ["domain", (size) => <GlobeIcon size={size} />],
];

const normalizeSocialHref = (key, value) => {
  const clean = String(value ?? "").trim();
  if (!clean) return "";
  if (/^https?:\/\//i.test(clean)) return clean;

  const withoutAt = clean.replace(/^@+/, "");
  if (key === "instagram") return `https://instagram.com/${withoutAt}`;
  if (key === "facebook") return `https://facebook.com/${withoutAt}`;
  if (key === "tikTok") return `https://tiktok.com/@${withoutAt}`;
  if (key === "linkedIn") return `https://linkedin.com/in/${withoutAt}`;
  return `https://${clean}`;
};

const errorText = (t, code) => (code ? t(`validation.${code}`) : null);

const Brands_detail_socials = (props) => {
  const { brand, draft, fieldErrors, onDraftChange, t } = props;
  const source = draft ?? brand?.socials ?? {};

  return (
    <Brands_detail_sectionShell
      {...props}
      rootClass="brandsDetailSocials"
      title={t("sections.socials")}
      icon={<GlobeIcon />}
      renderReadonly={() => (
        <div className="brandsDetailSocials__rows">
          {SOCIALS.map(([key, renderIcon]) => {
            const value = brand?.socials?.[key];
            const href = normalizeSocialHref(key, value);
            if (!value) return null;

            return (
              <div className="brandsDetailSocials__row" key={key}>
                <span className="brandsDetailSocials__value">
                  {renderIcon(16)} {value}
                </span>
                <a
                  className="brandsDetailSocials__launcher"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(`socialActions.${key}`)}
                </a>
              </div>
            );
          })}
          {!SOCIALS.some(([key]) => brand?.socials?.[key]) && (
            <p className="brandsDetailSocials__empty">{t("empty.noValue")}</p>
          )}
        </div>
      )}
      renderEditable={() => (
        <div className="brandsDetailSocials__form">
          {SOCIALS.map(([key, renderIcon]) => (
            <label className="brandsDetailSocials__field" key={key}>
              <span>{renderIcon(14)} {t(`fields.${key}`)}</span>
              <input
                value={source?.[key] ?? ""}
                onChange={(event) => onDraftChange(key, event.target.value)}
              />
              {fieldErrors?.[key] && <small>{errorText(t, fieldErrors[key])}</small>}
            </label>
          ))}
        </div>
      )}
    />
  );
};

export default Brands_detail_socials;
