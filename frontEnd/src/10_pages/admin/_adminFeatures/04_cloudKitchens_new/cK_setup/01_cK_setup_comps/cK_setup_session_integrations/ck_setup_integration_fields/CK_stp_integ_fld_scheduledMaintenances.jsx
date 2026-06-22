const CK_stp_integ_fld_scheduledMaintenances = ({ states }) => (
  <section className="cK_setup_form_section">
    <p className="cK_setup_form_muted">
      {(states.values?.scheduledMaintenances ?? []).length} maintenance window(s). Full editor coming soon.
    </p>
  </section>
);

export default CK_stp_integ_fld_scheduledMaintenances;
