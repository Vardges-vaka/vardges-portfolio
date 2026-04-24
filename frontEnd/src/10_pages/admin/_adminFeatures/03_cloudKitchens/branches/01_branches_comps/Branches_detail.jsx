import Branches_simpleMap from "./Branches_simpleMap.jsx";
import Branches_salesPlaceholder from "./Branches_salesPlaceholder.jsx";
import {
  Branches_detail_basic,
  Branches_detail_location,
  Branches_detail_contact,
  Branches_detail_operations,
  Branches_detail_costs,
  Branches_detail_contract,
  Branches_detail_notes,
  Branches_detail_brands,
  Branches_detail_employees,
  Branches_detail_equipments,
  Branches_detail_coverage,
  Branches_detail_files,
} from "./branches_childComps/_branches_childComps.index.js";
import { TrashIcon } from "./Branches_icons/_branches_icons.index.js";
import { SECTION_KEYS } from "../05_branches_cnst/_branches_cnst.index.js";
import "../_styles/branches_detail.css";

// Maps section keys → their component. The detail view rendering logic
// drives which sections appear in which layout slot from SECTION_LAYOUT.
const SECTION_COMPONENT = {
  [SECTION_KEYS.basic]: Branches_detail_basic,
  [SECTION_KEYS.location]: Branches_detail_location,
  [SECTION_KEYS.contact]: Branches_detail_contact,
  [SECTION_KEYS.operations]: Branches_detail_operations,
  [SECTION_KEYS.costs]: Branches_detail_costs,
  [SECTION_KEYS.contract]: Branches_detail_contract,
  [SECTION_KEYS.notes]: Branches_detail_notes,
};

// Bottom-strip placeholders. Each component is static — it just renders
// "Coming soon" branded chrome, no props besides t.
const PLACEHOLDER_COMPONENT = {
  brands: Branches_detail_brands,
  employees: Branches_detail_employees,
  equipments: Branches_detail_equipments,
  coverage: Branches_detail_coverage,
  files: Branches_detail_files,
};

const Branches_detail = ({
  branch,
  isBulkEdit,
  isSaving,
  error,
  layout,
  sectionProps,
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
            onClick={onBack}
          >
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
          onClick={onBack}
        >
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
          return <Comp key={k} t={t} />;
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
            disabled={isSaving}
          >
            {t("actions.cancel")}
          </button>
          <button
            type="button"
            className="branchesDetail__bulkSaveBtn"
            onClick={onBulkSubmit}
            disabled={isSaving}
          >
            {isSaving ? t("saving") : t("actions.saveAll")}
          </button>
        </div>
      ) : (
        <div className="branchesDetail__deleteFooter">
          <button
            type="button"
            className="branchesDetail__deleteBtn"
            onClick={onDeleteRequest}
          >
            <TrashIcon size={16} />
            {t("actions.deleteBranch")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Branches_detail;
