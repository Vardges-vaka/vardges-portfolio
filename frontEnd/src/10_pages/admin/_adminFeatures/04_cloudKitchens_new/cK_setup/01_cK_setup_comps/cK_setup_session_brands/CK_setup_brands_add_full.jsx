import "../../_styles/cK_setup_forms/cK_setup_addForm.css";
import {
  CK_stp_brand_fld_basic,
  CK_stp_brand_fld_socials,
  CK_stp_brand_fld_registeredIn,
  CK_stp_brand_fld_cuisineTags,
  CK_stp_brand_fld_contracts,
  CK_stp_brand_fld_integrations,
  CK_stp_brand_fld_siblings,
  CK_stp_brand_fld_employees,
  CK_stp_brand_fld_equipments,
  CK_stp_brand_fld_branches,
  CK_stp_brand_fld_menus,
  CK_stp_brand_fld_competitors,
} from "./ck_setup_brand_fields/_ck_setup_brand_fields.index.js";

const CK_setup_brands_add_full = ({ states, handlers, t }) => {
  return (
    <div className="cK_setup_form">
      {/* */}
      <div className="cK_setup_form_row">
        <CK_stp_brand_fld_basic states={states} handlers={handlers} t={t} />
        <CK_stp_brand_fld_registeredIn
          states={states}
          handlers={handlers}
          t={t}
        />
      </div>

      {/* ── Socials ──────────────────────────────── */}
      <CK_stp_brand_fld_socials states={states} handlers={handlers} t={t} />

      {/* // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
      {/* ── Cuisine Tags ──────────────────────────────── */}
      <CK_stp_brand_fld_cuisineTags states={states} handlers={handlers} t={t} />

      {/* ── Contracts ──────────────────────────────── */}
      <CK_stp_brand_fld_contracts states={states} handlers={handlers} t={t} />

      {/* ── Integrations ──────────────────────────────── */}
      <CK_stp_brand_fld_integrations
        states={states}
        handlers={handlers}
        t={t}
      />

      {/* ── Siblings ──────────────────────────────── */}
      <CK_stp_brand_fld_siblings states={states} handlers={handlers} t={t} />

      {/* ── Employees ──────────────────────────────── */}
      <CK_stp_brand_fld_employees states={states} handlers={handlers} t={t} />

      {/* ── Equipments ──────────────────────────────── */}
      <CK_stp_brand_fld_equipments states={states} handlers={handlers} t={t} />

      {/* ── Branches ──────────────────────────────── */}
      <CK_stp_brand_fld_branches states={states} handlers={handlers} t={t} />

      {/* ── Menus ──────────────────────────────── */}
      <CK_stp_brand_fld_menus states={states} handlers={handlers} t={t} />

      {/* ── Competitors ──────────────────────────────── */}
      <CK_stp_brand_fld_competitors states={states} handlers={handlers} t={t} />
    </div>
  );
};

export default CK_setup_brands_add_full;
