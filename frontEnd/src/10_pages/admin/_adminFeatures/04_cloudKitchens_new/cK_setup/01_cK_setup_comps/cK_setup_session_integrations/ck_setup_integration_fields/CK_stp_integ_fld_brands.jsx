const CK_stp_integ_fld_brands = ({ states, handlers }) => {
  const ids = (states.values?.brands ?? []).join(", ");
  return (
    <section className="cK_setup_form_section">
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Brand IDs (comma-separated)</span>
        <input
          className="cK_setup_form_input"
          type="text"
          value={ids}
          onChange={(e) =>
            handlers.onChange?.(
              "brands",
              e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
            )
          }
        />
      </label>
    </section>
  );
};

export default CK_stp_integ_fld_brands;
