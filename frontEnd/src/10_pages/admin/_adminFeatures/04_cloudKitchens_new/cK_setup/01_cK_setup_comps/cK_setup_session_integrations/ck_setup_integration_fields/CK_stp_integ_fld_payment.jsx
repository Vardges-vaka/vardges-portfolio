const CK_stp_integ_fld_payment = ({ states, handlers }) => {
  const payment = states.values?.payment ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);
  return (
    <section className="cK_setup_form_section">
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Cycle</span>
        <input className="cK_setup_form_input" type="text" value={payment.cycle ?? ""} onChange={set("payment.cycle")} />
      </label>
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Amount</span>
        <input className="cK_setup_form_input" type="number" value={payment.amount ?? ""} onChange={set("payment.amount")} />
      </label>
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Currency</span>
        <input className="cK_setup_form_input" type="text" value={payment.currency ?? ""} onChange={set("payment.currency")} />
      </label>
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Method</span>
        <input className="cK_setup_form_input" type="text" value={payment.method ?? ""} onChange={set("payment.method")} />
      </label>
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Payment status</span>
        <input className="cK_setup_form_input" type="text" value={payment.status ?? ""} onChange={set("payment.status")} />
      </label>
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Notes</span>
        <textarea className="cK_setup_form_input cK_setup_form_textarea" rows={2} value={payment.notes ?? ""} onChange={set("payment.notes")} />
      </label>
    </section>
  );
};

export default CK_stp_integ_fld_payment;
