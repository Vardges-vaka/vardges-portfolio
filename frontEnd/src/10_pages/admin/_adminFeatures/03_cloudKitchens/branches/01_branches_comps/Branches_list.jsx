import { Branches_list_item } from "./branches_childComps/_branches_childComps.index.js";
import "../_styles/branches_list.css";

// Simple list surface. The Delete flow lives inside the detail view now;
// list items only carry View / Edit / Add Files / Add Coverage buttons.
const Branches_list = ({
  branches,
  isLoading,
  error,
  onShowAddForm,
  onView,
  onEdit,
  onAddFiles,
  onAddCoverage,
  t,
}) => {
  return (
    <div className="branchesList">
      <div className="branchesList__header">
        <h2 className="branchesList__title">{t("title")}</h2>
        <button
          type="button"
          className="branchesList__addBtn"
          onClick={onShowAddForm}
        >
          + {t("addBranch")}
        </button>
      </div>

      {error && <p className="branchesList__error">{error}</p>}

      {isLoading && <p className="branchesList__loading">{t("loading")}</p>}

      {!isLoading && branches.length === 0 && (
        <p className="branchesList__empty">{t("empty.noBranches")}</p>
      )}

      <div className="branchesList__items">
        {branches.map((branch) => (
          <Branches_list_item
            key={branch._id}
            branch={branch}
            onView={onView}
            onEdit={onEdit}
            onAddFiles={onAddFiles}
            onAddCoverage={onAddCoverage}
            t={t}
          />
        ))}
      </div>
    </div>
  );
};

export default Branches_list;
