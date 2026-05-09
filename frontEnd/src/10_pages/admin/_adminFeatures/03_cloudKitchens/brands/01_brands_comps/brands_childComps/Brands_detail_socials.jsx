import {
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  LinkedInIcon,
  GlobeIcon,
} from "../Brands_icons/_brands_icons.index.js";
import { Brands_detail_sectionShell } from "./_brands_childComps.index.js";
import { hydrateBrandForm } from "../../02_brands_helpers/_brands_helpers.index.js";
import "../../_styles/brands_detail_socials.css";

const SOCIALS = [
  ["instagram", (size) => <InstagramIcon size={size} />],
  ["facebook", (size) => <FacebookIcon size={size} />],
  ["tikTok", (size) => <TikTokIcon size={size} />],
  ["linkedIn", (size) => <LinkedInIcon size={size} />],
  ["youtube", (size) => <GlobeIcon size={size} />],
  ["twitter", (size) => <GlobeIcon size={size} />],
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
  if (key === "youtube") return `https://youtube.com/${withoutAt}`;
  if (key === "twitter") return `https://x.com/${withoutAt}`;
  return `https://${clean}`;
};

const errorText = (t, code) => (code ? t(`validation.${code}`) : null);

const Brands_detail_socials = (props) => {
  const { brand, draft, fieldErrors, onDraftChange, t } = props;
  const source = draft ?? hydrateBrandForm(brand).socials;

  return (
    <Brands_detail_sectionShell
      {...props}
      rootClass="brandsDetailSocials"
      title={t("sections.socials")}
      icon={<GlobeIcon />}
      renderReadonly={() => {
        const readSocials = hydrateBrandForm(brand).socials;
        return (
          <div className="brandsDetailSocials_rows">
            {SOCIALS.map(([key, renderIcon]) => {
              const value = readSocials?.[key]?.link;
              const href = normalizeSocialHref(key, value);
              if (!value) return null;

              return (
                <div className="brandsDetailSocials_row" key={key}>
                  <span className="brandsDetailSocials_value">
                    {renderIcon(16)} {value}
                  </span>
                  <a
                    className="brandsDetailSocials_launcher"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer">
                    {t(`socialActions.${key}`)}
                  </a>
                </div>
              );
            })}
            {!SOCIALS.some(([key]) => readSocials?.[key]?.link) && (
              <p className="brandsDetailSocials_empty">{t("empty.noValue")}</p>
            )}
          </div>
        );
      }}
      renderEditable={() => (
        <div className="brandsDetailSocials_form">
          {SOCIALS.map(([key, renderIcon]) => (
            <label className="brandsDetailSocials_field" key={key}>
              <span>
                {renderIcon(14)} {t(`fields.${key}`)}
              </span>
              <input
                value={source?.[key]?.link ?? ""}
                onChange={(event) =>
                  onDraftChange(`${key}.link`, event.target.value)
                }
              />
              {fieldErrors?.[`${key}.link`] && (
                <small>{errorText(t, fieldErrors[`${key}.link`])}</small>
              )}
            </label>
          ))}
        </div>
      )}
    />
  );
};

export default Brands_detail_socials;
