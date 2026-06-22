import CK_setup_entity_viewOne from "../cK_setup_shared/CK_setup_entity_viewOne.jsx";
import { INTEGRATION_DETAIL_FIELD_LABELS } from "../../02_cK_setup_hlpr/integrationDetail_helpers.js";
import {
  CK_stp_integ_fld_identity,
  CK_stp_integ_fld_status,
  CK_stp_integ_fld_lifecycle,
  CK_stp_integ_fld_links,
  CK_stp_integ_fld_payment,
  CK_stp_integ_fld_loginCredentials,
  CK_stp_integ_fld_kam,
  CK_stp_integ_fld_support,
  CK_stp_integ_fld_scheduledMaintenances,
  CK_stp_integ_fld_brands,
  CK_stp_integ_fld_branches,
  CK_stp_integ_fld_contract,
  CK_stp_integ_fld_files,
  CK_stp_integ_fld_notes,
} from "./ck_setup_integration_fields/_ck_setup_integration_fields.index.js";

const DETAIL_SECTIONS = [
  { key: "identity", Component: CK_stp_integ_fld_identity },
  { key: "status", Component: CK_stp_integ_fld_status, layout: "half" },
  { key: "lifecycle", Component: CK_stp_integ_fld_lifecycle, layout: "half" },
  { key: "links", Component: CK_stp_integ_fld_links },
  { key: "payment", Component: CK_stp_integ_fld_payment },
  { key: "loginCredentials", Component: CK_stp_integ_fld_loginCredentials },
  { key: "kam", Component: CK_stp_integ_fld_kam },
  { key: "support", Component: CK_stp_integ_fld_support },
  { key: "scheduledMaintenances", Component: CK_stp_integ_fld_scheduledMaintenances },
  { key: "brands", Component: CK_stp_integ_fld_brands, layout: "half" },
  { key: "branches", Component: CK_stp_integ_fld_branches, layout: "half" },
  { key: "contract", Component: CK_stp_integ_fld_contract },
  { key: "files", Component: CK_stp_integ_fld_files },
  { key: "notes", Component: CK_stp_integ_fld_notes },
];

const CK_setup_integrations_viewOne = ({ states, handlers }) => (
  <CK_setup_entity_viewOne
    states={{
      draft: states.integrationDraft,
      detailMode: states.detailMode,
      editingField: states.editingField,
      confirmUpdateModalOpen: states.confirmUpdateModalOpen,
      confirmUpdateFieldKeys: states.confirmUpdateFieldKeys,
      isSaving: states.isSaving,
    }}
    handlers={{
      onBackToList: handlers.onBackToList,
      onGlobalUpdate: handlers.onGlobalUpdate,
      onGlobalCancel: handlers.onGlobalCancel,
      onGlobalConfirm: handlers.onGlobalConfirm,
      onFieldUpdate: handlers.onFieldUpdate,
      onFieldConfirm: handlers.onFieldConfirm,
      onFieldCancel: handlers.onFieldCancel,
      onDraftChange: handlers.onDraftChange,
      onConfirmUpdateCancel: handlers.onConfirmUpdateCancel,
      onConfirmUpdateConfirm: handlers.onConfirmUpdateConfirm,
      itemDisplayName: handlers.itemDisplayName,
    }}
    fieldLabels={INTEGRATION_DETAIL_FIELD_LABELS}
    detailSections={DETAIL_SECTIONS}
    titleFallback="Integration"
  />
);

export default CK_setup_integrations_viewOne;
