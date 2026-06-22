const CK_stp_integ_fld_loginCredentials = ({ states }) => (
  <section className="cK_setup_form_section">
    <p className="cK_setup_form_muted">
      {(states.values?.loginCredentials ?? []).length} credential(s). Full editor coming soon.
    </p>
  </section>
);

export default CK_stp_integ_fld_loginCredentials;
