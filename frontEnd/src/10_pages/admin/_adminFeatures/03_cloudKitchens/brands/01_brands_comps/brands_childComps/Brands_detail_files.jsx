import { FileIcon } from "../Brands_icons/_brands_icons.index.js";
import { Brands_detail_sectionShell } from "./_brands_childComps.index.js";
import Brands_detail_files_contracts from "./Brands_detail_files_contracts.jsx";
import {
  EMPTY_FILE_REF_ROW,
  hydrateBrandForm,
} from "../../02_brands_helpers/_brands_helpers.index.js";
import "../../_styles/brands_detail_files.css";
import "../../_styles/brands_detail_files_contracts.css";

const FILE_FIELDS = [
  ["logos.highRes", "highRes"],
  ["logos.svg", "svg"],
  ["logos.png", "png"],
  ["logos.jpg", "jpg"],
  ["logos.pdf", "pdf"],
  ["logos.ico", "ico"],
  ["branding.brandBook", "brandBook"],
  ["branding.brandOverview", "brandOverview"],
  ["legal.vatCertificate", "vatCertificate"],
  ["legal.tradeLicense", "tradeLicense"],
  ["legal.tradeMark", "tradeMark"],
  ["menus.pdf", "menuPdf"],
  ["menus.excel", "menuExcel"],
  ["menus.word", "menuWord"],
  ["recipe.pdf", "recipePdf"],
  ["recipe.excel", "recipeExcel"],
  ["recipe.word", "recipeWord"],
];

const getByPath = (source, path) =>
  String(path)
    .split(".")
    .reduce((cursor, key) => (cursor ? cursor[key] : undefined), source);

const Brands_detail_files = (props) => {
  const { brand, draft, fieldErrors, onDraftChange, t } = props;
  const source = draft ?? hydrateBrandForm(brand).files;

  const packaging = source?.branding?.packaging ?? [];
  const miscellaneous = source?.miscellaneous ?? [];

  const handleAddPackaging = () => {
    onDraftChange("branding.packaging", [
      ...packaging,
      { ...EMPTY_FILE_REF_ROW },
    ]);
  };

  const handleRemovePackaging = (index) => {
    onDraftChange(
      "branding.packaging",
      packaging.filter((_, i) => i !== index),
    );
  };

  const handlePackagingChange = (index, field, value) => {
    const updated = [...packaging];
    updated[index] = { ...updated[index], [field]: value };
    onDraftChange("branding.packaging", updated);
  };

  const handleAddMisc = () => {
    onDraftChange("miscellaneous", [
      ...miscellaneous,
      { ...EMPTY_FILE_REF_ROW },
    ]);
  };

  const handleRemoveMisc = (index) => {
    onDraftChange(
      "miscellaneous",
      miscellaneous.filter((_, i) => i !== index),
    );
  };

  const handleMiscChange = (index, field, value) => {
    const updated = [...miscellaneous];
    updated[index] = { ...updated[index], [field]: value };
    onDraftChange("miscellaneous", updated);
  };

  return (
    <Brands_detail_sectionShell
      {...props}
      rootClass="brandsDetailFiles"
      title={t("sections.files")}
      icon={<FileIcon />}
      renderReadonly={() => {
        const files = hydrateBrandForm(brand).files;
        const filled = FILE_FIELDS.filter(([path]) => getByPath(files, path));

        return (
          <div className="brandsDetailFiles_rows">
            {filled.length === 0 && (
              <p className="brandsDetailFiles_empty">{t("empty.noValue")}</p>
            )}
            {filled.map(([path, label]) => (
              <a
                key={path}
                className="brandsDetailFiles_link"
                href={getByPath(files, path)}
                target="_blank"
                rel="noopener noreferrer">
                {t(`fields.${label}`)}
              </a>
            ))}
          </div>
        );
      }}
      renderEditable={() => (
        <div className="brandsDetailFiles_form">
          <h4 className="brandsDetailFiles_sectionTitle">
            {t("sections.logos")}
          </h4>
          {FILE_FIELDS.slice(0, 6).map(([path, label]) => (
            <label className="brandsDetailFiles_field" key={path}>
              <span>{t(`fields.${label}`)}</span>
              <input
                value={getByPath(source, path) ?? ""}
                onChange={(event) => onDraftChange(path, event.target.value)}
              />
            </label>
          ))}

          <h4 className="brandsDetailFiles_sectionTitle">
            {t("sections.branding")}
          </h4>
          {FILE_FIELDS.slice(6, 8).map(([path, label]) => (
            <label className="brandsDetailFiles_field" key={path}>
              <span>{t(`fields.${label}`)}</span>
              <input
                value={getByPath(source, path) ?? ""}
                onChange={(event) => onDraftChange(path, event.target.value)}
              />
            </label>
          ))}

          <div className="brandsDetailFiles_arraySection">
            <div className="brandsDetailFiles_arrayHeader">
              <h5>{t("sections.packaging")}</h5>
              <button
                type="button"
                className="brandsDetailFiles_addBtn"
                onClick={handleAddPackaging}>
                {t("actions.addPackaging")}
              </button>
            </div>
            {packaging.length === 0 ? (
              <p className="brandsDetailFiles_empty">
                {t("empty.noPackaging")}
              </p>
            ) : (
              packaging.map((item, index) => (
                <div key={index} className="brandsDetailFiles_arrayRow">
                  <input
                    placeholder={t("fields.ref")}
                    value={item.ref ?? ""}
                    onChange={(e) =>
                      handlePackagingChange(index, "ref", e.target.value)
                    }
                  />
                  <input
                    placeholder={t("fields.value")}
                    value={item.value ?? ""}
                    onChange={(e) =>
                      handlePackagingChange(index, "value", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="brandsDetailFiles_removeBtn"
                    onClick={() => handleRemovePackaging(index)}>
                    {t("actions.remove")}
                  </button>
                </div>
              ))
            )}
          </div>

          <h4 className="brandsDetailFiles_sectionTitle">
            {t("sections.legalFiles")}
          </h4>
          {FILE_FIELDS.slice(8, 11).map(([path, label]) => (
            <label className="brandsDetailFiles_field" key={path}>
              <span>{t(`fields.${label}`)}</span>
              <input
                value={getByPath(source, path) ?? ""}
                onChange={(event) => onDraftChange(path, event.target.value)}
              />
            </label>
          ))}

          <h4 className="brandsDetailFiles_sectionTitle">
            {t("sections.menuFiles")}
          </h4>
          {FILE_FIELDS.slice(11, 14).map(([path, label]) => (
            <label className="brandsDetailFiles_field" key={path}>
              <span>{t(`fields.${label}`)}</span>
              <input
                value={getByPath(source, path) ?? ""}
                onChange={(event) => onDraftChange(path, event.target.value)}
              />
            </label>
          ))}

          <h4 className="brandsDetailFiles_sectionTitle">
            {t("sections.recipeFiles")}
          </h4>
          {FILE_FIELDS.slice(14, 17).map(([path, label]) => (
            <label className="brandsDetailFiles_field" key={path}>
              <span>{t(`fields.${label}`)}</span>
              <input
                value={getByPath(source, path) ?? ""}
                onChange={(event) => onDraftChange(path, event.target.value)}
              />
            </label>
          ))}

          <Brands_detail_files_contracts
            draft={source}
            fieldErrors={fieldErrors}
            onDraftChange={onDraftChange}
            t={t}
          />

          <div className="brandsDetailFiles_arraySection">
            <div className="brandsDetailFiles_arrayHeader">
              <h5>{t("sections.miscellaneous")}</h5>
              <button
                type="button"
                className="brandsDetailFiles_addBtn"
                onClick={handleAddMisc}>
                {t("actions.addMisc")}
              </button>
            </div>
            {miscellaneous.length === 0 ? (
              <p className="brandsDetailFiles_empty">
                {t("empty.noMiscFiles")}
              </p>
            ) : (
              miscellaneous.map((item, index) => (
                <div key={index} className="brandsDetailFiles_arrayRow">
                  <input
                    placeholder={t("fields.ref")}
                    value={item.ref ?? ""}
                    onChange={(e) =>
                      handleMiscChange(index, "ref", e.target.value)
                    }
                  />
                  <input
                    placeholder={t("fields.value")}
                    value={item.value ?? ""}
                    onChange={(e) =>
                      handleMiscChange(index, "value", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="brandsDetailFiles_removeBtn"
                    onClick={() => handleRemoveMisc(index)}>
                    {t("actions.remove")}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    />
  );
};

export default Brands_detail_files;
