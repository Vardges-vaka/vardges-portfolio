import { getRefDisplayName } from "../02_brands_helpers/_brands_helpers.index.js";
import "../_styles/brands_addForm.css";

const SOCIAL_KEYS = [
  "instagram",
  "facebook",
  "tikTok",
  "linkedIn",
  "youtube",
  "twitter",
];

const Brands_addForm = ({
  draft,
  branchesList,
  isSaving,
  error,
  onChange,
  onDraftChange,
  onBranchToggle,
  onSubmit,
  onCancel,
  t,
}) => {
  const selectedBranches = Array.isArray(draft?.branches) ? draft.branches : [];

  return (
    <div className="brandsAddForm" role="dialog" aria-modal="true">
      <div className="brandsAddForm_panel">
        <h2 className="brandsAddForm_title">{t("addBrand")}</h2>
        <p className="brandsAddForm_hint">{t("addFormHint")}</p>
        {error && <p className="brandsAddForm_error">{error}</p>}

        <label className="brandsAddForm_field">
          <span>{t("fields.name")}</span>
          <input
            className="brandsAddForm_input"
            value={draft?.name?.value ?? ""}
            onChange={(event) => onChange(event.target.value)}
            placeholder={t("fields.namePlaceholder")}
            autoFocus
          />
        </label>

        <div className="brandsAddForm_grid">
          {["en", "ru", "ar"].map((lang) => (
            <label className="brandsAddForm_field" key={lang}>
              <span>{t(`fields.translation_${lang}`)}</span>
              <input
                className="brandsAddForm_input"
                value={draft?.name?.translations?.[lang] ?? ""}
                onChange={(event) =>
                  onDraftChange(`name.translations.${lang}`, event.target.value)
                }
              />
            </label>
          ))}
        </div>

        <div className="brandsAddForm_grid">
          {SOCIAL_KEYS.map((key) => (
            <label className="brandsAddForm_field" key={key}>
              <span>{t(`fields.${key}`)}</span>
              <input
                className="brandsAddForm_input"
                value={draft?.socials?.[key]?.link ?? ""}
                onChange={(event) =>
                  onDraftChange(`socials.${key}.link`, event.target.value)
                }
              />
            </label>
          ))}
        </div>

        <div className="brandsAddForm_field">
          <span>{t("sections.branches")}</span>
          <div className="brandsAddForm_chips">
            {(branchesList ?? []).map((branch) => {
              const id = branch?._id;
              const isSelected = selectedBranches.includes(id);
              return (
                <button
                  type="button"
                  key={id}
                  className={
                    "brandsAddForm_chip" +
                    (isSelected ? " brandsAddForm_chip--active" : "")
                  }
                  onClick={() => onBranchToggle(id)}>
                  {getRefDisplayName(branch)}
                </button>
              );
            })}
            {(branchesList ?? []).length === 0 && (
              <small>{t("empty.noBranches")}</small>
            )}
          </div>
        </div>

        <div className="brandsAddForm_actions">
          <button
            type="button"
            className="brandsAddForm_btn"
            onClick={onCancel}
            disabled={isSaving}>
            {t("actions.cancel")}
          </button>
          <button
            type="button"
            className="brandsAddForm_btn brandsAddForm_btn--primary"
            onClick={onSubmit}
            disabled={isSaving}>
            {isSaving ? t("saving") : t("actions.create")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Brands_addForm;
