import { Branches_list_item } from "./_branches_comps.index.js";
import "../_styles/branches_list.css";

const Branches_list = ({ branches, isLoading, selectedId, onSelect, onDelete, onShowAddForm, t }) => {
  return (
    <div className="branchesList">
      <div className="branchesList__header">
        <h2 className="branchesList__title">{t("title")}</h2>
        <button className="branchesList__addBtn" onClick={onShowAddForm}>
          + {t("addBranch")}
        </button>
      </div>

      {isLoading && <p>{t("loading")}</p>}

      {!isLoading && branches.length === 0 && (
        <p className="branchesList__empty">{t("noBranches")}</p>
      )}

      {branches.map((branch) => (
        <Branches_list_item
          key={branch._id}
          branch={branch}
          isSelected={selectedId === branch._id}
          onSelect={onSelect}
          onDelete={onDelete}
          t={t}
        />
      ))}
    </div>
  );
};

export default Branches_list;
