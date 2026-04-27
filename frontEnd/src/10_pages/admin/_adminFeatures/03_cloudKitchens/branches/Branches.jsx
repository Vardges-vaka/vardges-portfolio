import { useBranches } from "./03_branches_hooks/_branches_hooks.index.js";
import {
  Branches_viewToggle,
  Branches_list,
  Branches_tablePlaceholder,
  Branches_mapView,
  Branches_addForm,
  Branches_detail,
  Branches_confirmModal,
  Branches_discardModal,
  Branches_deleteModal,
  Branches_mapViewNoKey,
} from "./01_branches_comps/_branches_comps.index.js";
import { googleMaps_apiKey } from "./branches.config.js";
import "./_styles/branches.css";

const Branches = () => {
  const { states, compProps } = useBranches();
  const { viewMode, showAddForm, confirmModal, discardModal, deleteModal } =
    states;

  const renederMapView = () => {
    if (!googleMaps_apiKey.trim()) {
      return <Branches_mapViewNoKey t={t} />;
    }
    return (
      <Branches_mapView
        branches={compProps.Branches_mapView_props.branches}
        isLoading={compProps.Branches_mapView_props.isLoading}
        error={compProps.Branches_mapView_props.error}
        t={compProps.Branches_mapView_props.t}
        onViewBranch={compProps.Branches_mapView_props.onViewBranch}
        googleMaps_apiKey={googleMaps_apiKey}
      />
    );
  };

  return (
    <div className="branches">
      <Branches_viewToggle {...compProps.Branches_viewToggle_props} />

      {viewMode === "list" && (
        <Branches_list {...compProps.Branches_list_props} />
      )}
      {viewMode === "table" && (
        <Branches_tablePlaceholder
          {...compProps.Branches_tablePlaceholder_props}
        />
      )}
      {viewMode === "map" && renederMapView()}
      {viewMode === "detail" && (
        <Branches_detail {...compProps.Branches_detail_props} />
      )}

      {showAddForm && (
        <Branches_addForm {...compProps.Branches_addForm_props} />
      )}
      {confirmModal.isOpen && (
        <Branches_confirmModal {...compProps.Branches_confirmModal_props} />
      )}
      {discardModal.isOpen && (
        <Branches_discardModal {...compProps.Branches_discardModal_props} />
      )}
      {deleteModal.isOpen && (
        <Branches_deleteModal {...compProps.Branches_deleteModal_props} />
      )}
    </div>
  );
};

export default Branches;
