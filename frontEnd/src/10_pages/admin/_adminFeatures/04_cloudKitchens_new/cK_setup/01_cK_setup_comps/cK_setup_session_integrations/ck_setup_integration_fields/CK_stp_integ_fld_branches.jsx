const CK_stp_integ_fld_branches = ({ states, handlers }) => {
  const ids = (states.values?.branches ?? []).join(", ");
  return (
    <section className="cK_setup_form_section">
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Branch IDs (comma-separated)</span>
        <input
          className="cK_setup_form_input"
          type="text"
          value={ids}
          onChange={(e) =>
            handlers.onChange?.(
              "branches",
              e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
            )
          }
        />
      </label>
    </section>
  );
};

export default CK_stp_integ_fld_branches;
