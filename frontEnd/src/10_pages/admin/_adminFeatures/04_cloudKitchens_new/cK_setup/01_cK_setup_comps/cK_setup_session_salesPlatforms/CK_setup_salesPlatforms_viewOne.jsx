import CK_setup_entity_viewOne from "../cK_setup_shared/CK_setup_entity_viewOne.jsx";
import { SALES_PLATFORM_DETAIL_FIELD_LABELS } from "../../02_cK_setup_hlpr/salesPlatformDetail_helpers.js";
import {
  CK_stp_slsPltf_fld_basic,
  CK_stp_slsPltf_fld_links,
  CK_stp_slsPltf_fld_kam,
  CK_stp_slsPltf_fld_loginCredentials,
  CK_stp_slsPltf_fld_support,
} from "./ck_setup_salesPlatform_fields/_ck_setup_salesPlatform_fields.index.js";

const DETAIL_SECTIONS = [
  { key: "basic", Component: CK_stp_slsPltf_fld_basic },
  { key: "links", Component: CK_stp_slsPltf_fld_links },
  { key: "kam", Component: CK_stp_slsPltf_fld_kam },
  { key: "loginCredentials", Component: CK_stp_slsPltf_fld_loginCredentials },
  { key: "support", Component: CK_stp_slsPltf_fld_support },
];

const CK_setup_salesPlatforms_viewOne = ({ states, handlers }) => (
  <CK_setup_entity_viewOne
    states={{
      draft: states.salesPlatformDraft,
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
    fieldLabels={SALES_PLATFORM_DETAIL_FIELD_LABELS}
    detailSections={DETAIL_SECTIONS}
    titleFallback="Sales platform"
  />
);

export default CK_setup_salesPlatforms_viewOne;
