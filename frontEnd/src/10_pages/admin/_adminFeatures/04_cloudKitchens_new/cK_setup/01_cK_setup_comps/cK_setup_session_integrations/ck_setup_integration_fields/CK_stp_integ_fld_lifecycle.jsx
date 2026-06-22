const CK_stp_integ_fld_lifecycle = ({ states }) => (
  <section className="cK_setup_form_section">
    <p className="cK_setup_form_muted">
      Lifecycle data: {Object.keys(states.values?.lifecycle ?? {}).length} field(s). Detailed lifecycle editor coming soon.
    </p>
  </section>
);

export default CK_stp_integ_fld_lifecycle;
