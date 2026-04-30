import {
  Branches_simpleMap,
  Branches_salesPlaceholder,
} from "./branches_childComps/branches_detailView/_branches_detailView.index.js";
import {
  Branches_detailView_basicField,
  Branches_detailView_locationField,
  Branches_detailView_contactField,
  Branches_detailView_operationsField,
  Branches_detailView_costsField,
  Branches_detailView_contractField,
  Branches_detailView_notesField,
  Branches_detailView_brandsField,
  Branches_detailView_employeesField,
  Branches_detailView_equipmentsField,
  Branches_detailView_coverageField,
  Branches_detailView_filesField,
} from "./branches_childComps/branches_detailView/branches_detailView_fields/_branches_detailView_fields.index.js";
import { TrashIcon } from "./branches_childComps/Branches_icons/_branches_icons.index.js";
import {
  SECTION_KEYS,
  PLACEHOLDER_SECTION_KEYS,
} from "../05_branches_cnst/_branches_cnst.index.js";
import "../_styles/branches_detail.css";

// Maps section keys → their component. The detail view rendering logic
// drives which sections appear in which layout slot from SECTION_LAYOUT.
const SECTION_COMPONENT = {
  [SECTION_KEYS.basic]: Branches_detailView_basicField,
  [SECTION_KEYS.location]: Branches_detailView_locationField,
  [SECTION_KEYS.contact]: Branches_detailView_contactField,
  [SECTION_KEYS.operations]: Branches_detailView_operationsField,
  [SECTION_KEYS.costs]: Branches_detailView_costsField,
  [SECTION_KEYS.contract]: Branches_detailView_contractField,
  [SECTION_KEYS.notes]: Branches_detailView_notesField,
};

// Bottom-strip placeholders. Each component is static — it just renders
// "Coming soon" branded chrome, no props besides t.
const PLACEHOLDER_COMPONENT = {
  brands: Branches_detailView_brandsField,
  employees: Branches_detailView_employeesField,
  equipments: Branches_detailView_equipmentsField,
  coverage: Branches_detailView_coverageField,
  files: Branches_detailView_filesField,
};

const Branches_detailView = ({
  branch,
  isBulkEdit,
  isSaving,
  error,
  layout,
  sectionProps,
  filesFieldProps,
  onBack,
  onBulkSubmit,
  onBulkCancel,
  onDeleteRequest,
  t,
}) => {
  // Guard — the parent only mounts us when a branch is selected, but the
  // user could have raced a delete.
  if (!branch) {
    return (
      <div className="branchesDetail">
        <div className="branchesDetail__toolbar">
          <button
            type="button"
            className="branchesDetail__backBtn"
            onClick={onBack}>
            ← {t("actions.back")}
          </button>
        </div>
        <p className="branchesDetail__missing">{t("empty.branchGone")}</p>
      </div>
    );
  }

  const renderSection = (sectionKey) => {
    const Comp = SECTION_COMPONENT[sectionKey];
    const props = sectionProps?.[sectionKey];
    if (!Comp || !props) return null;
    return <Comp key={sectionKey} {...props} />;
  };

  return (
    <div className="branchesDetail">
      {/* Toolbar */}
      <div className="branchesDetail__toolbar">
        <button
          type="button"
          className="branchesDetail__backBtn"
          onClick={onBack}>
          ← {t("actions.back")}
        </button>
        <h2 className="branchesDetail__title">{branch.name}</h2>
        {isBulkEdit && (
          <span className="branchesDetail__bulkBadge">
            {t("bulkEditBadge")}
          </span>
        )}
      </div>

      {error && <p className="branchesDetail__error">{error}</p>}

      {/* Two-column body */}
      <div className="branchesDetail__columns">
        {/* LEFT: basic + location + simple map */}
        <div className="branchesDetail__left">
          {layout.leftColumn.map((k) => renderSection(k))}
          <Branches_simpleMap branch={branch} t={t} />
        </div>

        {/* RIGHT: collapsible section cards */}
        <div className="branchesDetail__right">
          {layout.rightColumn.map((k) => renderSection(k))}
        </div>
      </div>

      {/* BOTTOM STRIP: placeholder sections (brands / employees / ...) */}
      <div className="branchesDetail__bottomStrip">
        {layout.bottomStrip.map((k) => {
          const Comp = PLACEHOLDER_COMPONENT[k];
          if (!Comp) return null;
          const extraProps =
            k === PLACEHOLDER_SECTION_KEYS.files && filesFieldProps
              ? filesFieldProps
              : {};
          return <Comp key={k} t={t} {...extraProps} />;
        })}
      </div>

      {/* Sales placeholder */}
      <Branches_salesPlaceholder t={t} />

      {/* Footer — bulk mode: Cancel + Save all; read mode: Delete branch */}
      {isBulkEdit ? (
        <div className="branchesDetail__bulkFooter">
          <button
            type="button"
            className="branchesDetail__bulkCancelBtn"
            onClick={onBulkCancel}
            disabled={isSaving}>
            {t("actions.cancel")}
          </button>
          <button
            type="button"
            className="branchesDetail__bulkSaveBtn"
            onClick={onBulkSubmit}
            disabled={isSaving}>
            {isSaving ? t("saving") : t("actions.saveAll")}
          </button>
        </div>
      ) : (
        <div className="branchesDetail__deleteFooter">
          <button
            type="button"
            className="branchesDetail__deleteBtn"
            onClick={onDeleteRequest}>
            <TrashIcon size={16} />
            {t("actions.deleteBranch")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Branches_detailView;
