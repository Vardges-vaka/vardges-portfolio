const CK_stp_integ_fld_files = ({ states }) => (
  <section className="cK_setup_form_section">
    <p className="cK_setup_form_muted">
      Files storage configured: {states.values?.files?.cloudStorage?.value ? "yes" : "no"}. Full files editor coming soon.
    </p>
  </section>
);

export default CK_stp_integ_fld_files;
