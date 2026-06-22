import "../../_styles/cK_setup_forms/cK_setup_addForm.css";
import {
  CK_stp_cuisineTag_fld_basic,
  CK_stp_cuisineTag_fld_meta,
} from "./ck_setup_cuisineTag_fields/_ck_setup_cuisineTag_fields.index.js";

const CK_stp_cuisineTag_editFields = ({ states, handlers, t, readOnly = false }) => (
  <div className="cK_setup_form">
    <CK_stp_cuisineTag_fld_basic
      states={states}
      handlers={handlers}
      t={t}
      readOnly={readOnly}
    />
    <CK_stp_cuisineTag_fld_meta
      states={states}
      handlers={handlers}
      t={t}
      readOnly={readOnly}
    />
  </div>
);

export default CK_stp_cuisineTag_editFields;
