const CK_stp_integ_fld_notes = ({ states, handlers }) => {
  const set = (e) => handlers.onChange?.("notes", e.target.value);
  return (
    <section className="cK_setup_form_section">
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Notes</span>
        <textarea
          className="cK_setup_form_input cK_setup_form_textarea"
          rows={4}
          value={states.values?.notes ?? ""}
          onChange={set}
        />
      </label>
    </section>
  );
};

export default CK_stp_integ_fld_notes;
