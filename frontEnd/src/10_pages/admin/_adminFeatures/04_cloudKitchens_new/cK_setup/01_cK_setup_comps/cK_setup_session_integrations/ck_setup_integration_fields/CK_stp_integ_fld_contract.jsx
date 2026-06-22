const CK_stp_integ_fld_contract = ({ states, handlers }) => {
  const set = (e) => handlers.onChange?.("contract", e.target.value || null);
  return (
    <section className="cK_setup_form_section">
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Contract ID</span>
        <input
          className="cK_setup_form_input"
          type="text"
          value={states.values?.contract ?? ""}
          onChange={set}
        />
      </label>
    </section>
  );
};

export default CK_stp_integ_fld_contract;
